<template>
  <div class="modal-form">
    <div class="modal">
      <div class="label-con">
        <div class="label-header">
          <p>Tags</p>
          <span>(optional)</span>
        </div>
        <div class="label-btn-con">
          <div class="label">
            <button
              :class="[isPriority == 1 ? 'active' : 'not-active']"
              @click="prioritizeTask"
            >
              prioritize
            </button>
          </div>
        </div>
      </div>
      <div class="field-con">
        <label for="title">Task Title</label>
        <input
          type="text"
          v-model="title"
          @input="checkTitle"
          placeholder="Enter Task Title"
        />
        <span class="error">{{ titleError }}</span>
      </div>
      <div class="field-con">
        <label for="title">Task Description</label>
        <input
          type="text"
          v-model="description"
          @input="checkDescription"
          placeholder="Enter Task Description"
        />
        <span class="error">{{ descriptionError }}</span>
      </div>
      <div class="btn-con">
        <button @click="$emit('close-form')">Close</button>
        <button @click="isEditing ? editTask() : addTask()">
          {{ isEditing ? "Edit Task" : "Add Task" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["taskList", "isEditing", "taskToEdit"],
  data() {
    return {
      title: this.taskToEdit ? this.taskToEdit.task.title : "",
      description: this.taskToEdit ? this.taskToEdit.task.description : "",
      isPriority: this.taskToEdit ? this.taskToEdit.task.isPriority : 0,
      titleError: "",
      descriptionError: "",
    };
  },
  methods: {
    // This method is for adding a new task object and store in local storage and in vue task list storage
    addTask() {
      if (this.checkInputField()) return;

      let taskList = JSON.parse(localStorage.getItem("taskList")),
        task = {
          title: this.title,
          description: this.description,
          status: 0,
          isPriority: this.isPriority,
          createdAt: new Date().toDateString(),
        };

      taskList.push(task);
      localStorage.setItem("taskList", JSON.stringify(taskList));
      this.taskList.push(task);
      this.$emit("close-form");
    },
    // This method is for editing a specific task
    editTask() {
      if (this.checkInputField()) return;

      let taskList = JSON.parse(localStorage.getItem("taskList"));

      this.taskToEdit.task.title = this.title;
      this.taskToEdit.task.description = this.description;
      this.taskToEdit.task.isPriority = this.isPriority;
      taskList[this.taskToEdit.index] = this.taskToEdit.task;
      localStorage.setItem("taskList", JSON.stringify(taskList));
      this.title = "";
      this.description = "";
      this.$emit("close-form");
    },
    // this method is for prioritizing the specific task
    prioritizeTask() {
      this.isPriority ^= 1;
    },
    // This method is for the checking the task title
    checkTitle() {
      if (this.title != "") {
        this.titleError = "";
      } else {
        this.titleError = "Please Enter Task Title.";
      }
    },
    // This method is for the checking the task description
    checkDescription() {
      if (this.description != "") {
        this.descriptionError = "";
      } else {
        this.descriptionError = "Please Enter Task Description.";
      }
    },
    // This method is for the checking the all input field
    checkInputField() {
      if (!this.title != "") {
        return (this.titleError = "Please Enter Task Title.");
      } else if (!this.description != "") {
        return (this.descriptionError = "Please Enter Task Description.");
      }
    },
  },
};
</script>

<style scoped>
.modal {
  padding: 20px;
  background: #ffffff;
}

.label-btn-con .active {
  background: #16a34a;
  color: #ffffff;
}

.label-btn-con .active:hover {
  background: #15803d;
}

.label-header {
  display: flex;
  gap: 5px;
  margin-bottom: 5px;
}

.error {
  font-size: 10px;
  color: #dc2626;
  font-style: italic;
}

.label-con {
  margin-bottom: 20px;
}

.label-btn-con {
  display: flex;
}

.label-con button {
  border: none;
  font-size: 12px;
  background: #ffffff;
  cursor: pointer;
  border-radius: 20px;
  padding: 4px 16px;
  max-width: 100px;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
  text-align: center;
  transition: 0.2s;
  color: #222222;
}

.label-con button:hover {
  background: #efefef;
}

.label-con span {
  font-size: 10px;
  font-style: italic;
}

.modal-form {
  position: relative;
  background: #ffffff;
  margin: 40px auto;
  border-radius: 5px;
  width: 800px;
  z-index: 2;
  padding: 20px;
  filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03))
    drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
}

.field-con {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-con {
  padding: 20px 0 0 0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-con button {
  border: none;
  cursor: pointer;
  padding: 12px 16px;
  transition: 0.2s;
  border-radius: 5px;
}

.btn-con button:first-child {
  background: #ffffff;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.16);
}

.btn-con button:first-child:hover {
  background: #efefef;
}

.btn-con button:last-child {
  background: #673de6;
  color: #ffffff;
}

.btn-con button:last-child:hover {
  background: #5025d1;
}

.field-con input {
  border-radius: 5px;
  border: 1px solid #888888;
  padding: 10px;
}
</style>


