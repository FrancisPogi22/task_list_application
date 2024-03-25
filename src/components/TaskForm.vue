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
      showSuccessMessage("Task successfully added.");
      this.$emit("close-form");
    },
    editTask() {
      if (this.checkInputField()) return;

      let { title, description, isPriority } = this,
        { taskToEdit } = this;

      if (
        taskToEdit.task.title == title &&
        taskToEdit.task.description == description &&
        taskToEdit.task.isPriority == isPriority
      )
        return showInfoMessage("No changes were made.");

      confirmMessage("edit this", "Edit").then((result) => {
        if (!result.isConfirmed) return;

        let taskList = JSON.parse(localStorage.getItem("taskList"));

        taskToEdit.task.title = title;
        taskToEdit.task.description = description;
        taskToEdit.task.isPriority = isPriority;
        taskList[taskToEdit.index] = taskToEdit.task;
        localStorage.setItem("taskList", JSON.stringify(taskList));
        this.title = "";
        this.description = "";
        showSuccessMessage("Task successfully edited.");
        this.$emit("close-form");
      });
    },
    prioritizeTask() {
      this.isPriority ^= 1;
    },
    checkTitle() {
      if (this.title != "") this.titleError = "";
      else this.titleError = "Please Enter Task Title.";
    },
    checkDescription() {
      if (this.description != "") this.descriptionError = "";
      else this.descriptionError = "Please Enter Task Description.";
    },
    checkInputField() {
      if (!this.title != "")
        return (this.titleError = "Please Enter Task Title.");
      else if (!this.description != "")
        return (this.descriptionError = "Please Enter Task Description.");
    },
  },
};
</script>

<style scoped>
.modal {
  padding: 20px;
  background: var(--color-white);
}

.label-btn-con .active {
  background: var(--color-red);
  color: var(--color-white);
}

.label-btn-con .active:hover {
  background: var(--color-hover-red);
}

.label-header {
  display: flex;
  gap: 5px;
  margin-bottom: 5px;
}

.error {
  font-size: 10px;
  color: var(--color-hover-red);
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
  background: var(--color-white);
  cursor: pointer;
  border-radius: 20px;
  padding: 4px 16px;
  max-width: 100px;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
  text-align: center;
  transition: 0.2s;
  color: var(--color-black);
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
  background: var(--color-white);
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
  margin-bottom: 20px;
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
  font-weight: 500;
}

.btn-con button:first-child {
  background: var(--color-white);
  color: var(--color-black);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.16);
}

.btn-con button:first-child:hover {
  background: #efefef;
}

.btn-con button:last-child {
  background: var(--color-purple);
  color: var(--color-white);
}

.btn-con button:last-child:hover {
  background: var(--color-hover-purple);
}

.field-con input {
  border-radius: 5px;
  border: 1px solid var(--color-light-gray);
  padding: 10px;
}
</style>


