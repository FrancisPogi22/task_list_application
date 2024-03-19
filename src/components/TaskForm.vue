<template>
  <div class="modal-form">
    <div class="modal">
      <div class="label-con">
        <div class="label-header">
          <p>Label</p>
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
      title: this.taskToEdit ? this.taskToEdit["title"] : "",
      titleError: "",
      isPriority: this.taskToEdit ? this.taskToEdit["isPriority"] : 0,
    };
  },
  methods: {
    addTask() {
      if (!this.checkInputField()) {
        this.taskList.push({
          title: this.title,
          status: 0,
          isPriority: this.isPriority,
          createdAt: new Date().toDateString(),
        });
        this.$emit("close-form");
      }
    },
    editTask() {
      if (!this.checkInputField()) {
        this.taskToEdit.title = this.title;
        this.taskToEdit.isPriority = this.isPriority;
        this.title = "";
        this.$emit("close-form");
      }
    },
    prioritizeTask() {
      this.isPriority ^= 1;
    },
    checkTitle() {
      if (this.title != "") {
        this.titleError = "";
      } else {
        this.titleError = "Please Enter Task Title.";
      }
    },
    checkInputField() {
      if (!this.title != "") {
        return (this.titleError = "Please Enter Task Title.");
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
  border-radius: 4px;
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
  border-radius: 4px;
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


