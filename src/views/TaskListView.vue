<template>
  <section id="task-list">
    <div class="wrapper">
      <div class="task-list-con">
        <div class="task-list-header">
          <h1>Task List</h1>
          <button @click="addTask">Add Task</button>
        </div>
        <div class="task-list">
          <div
            class="task"
            @click="viewTask(index)"
            v-for="(task, index) in sortedTaskList"
            :key="index"
          >
            <div class="task-status">
              <p v-if="task.isPriority == 1" class="priority">prioritize</p>
              <p class="date">{{ task.createdAt }}</p>
            </div>
            <div class="task-desc-con">
              <input type="checkbox" />
              <p>{{ task.title }}</p>
            </div>
            <div class="btn-con">
              <button title="Prioritize Task">
                <i class="bi bi-card-checklist"></i>
              </button>
              <button title="Edit Task">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button title="Remove Task" @click="removeTask(index)">
                <i class="bi bi-trash3"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div v-if="showAddForm" class="backdrop">
    <AddTaskForm :taskList="taskList" @close-form="closeAddForm" />
  </div>
</template>

<script>
import AddTaskForm from "../components/AddTaskForm.vue";

export default {
  data() {
    return {
      taskList: [],
      showAddForm: false,
    };
  },
  components: {
    AddTaskForm,
  },
  methods: {
    addTask() {
      this.showAddForm = true;
    },
    removeTask(index) {
      this.taskList[index].splice(index, 1);
    },
    closeAddForm() {
      this.showAddForm = false;
    },
  },
  computed: {
    sortedTaskList() {
      return this.taskList.sort((a, b) => b.isPriority - a.isPriority);
    },
  },
};
</script>

<style scoped>
.backdrop {
  overflow: auto;
  top: 69px;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}

#task-list .wrapper {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
}

#task-list .task-list-con {
  padding: 100px 0;
}

#task-list .task-list-con h1 {
  font-size: 30px;
  color: #2f1c6a;
  line-height: 1.6em;
}

#task-list .task-list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 20px;
}

#task-list .task-list .task {
  background: #ffffff;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
  padding: 20px;
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
}

#task-list .task-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #888888;
}

#task-list .task-desc-con {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 80%;
  align-items: center;
}

#task-list .task-desc-con p {
  text-transform: uppercase;
  word-break: break-all;
  max-width: 90%;
}

#task-list .btn-con {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

button {
  border: none;
  padding: 12px 16px;
  border-radius: 4px;
  transition: 0.2s;
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.16);
  color: #ffffff;
}

#task-list .task-list-header button {
  background: #673de6;
  font-weight: 600;
  color: #ffffff;
}

#task-list .task-list-header button:hover,
#task-list .task-list .btn-con button:nth-child(2):hover {
  background: #5025d1;
}

#task-list .task-list .btn-con button:last-child:hover {
  background: #dc2626;
}

#task-list .task-list .btn-con button:nth-child(1) {
  background: #ffffff;
  color: #222222;
}

#task-list .task-list .btn-con button:nth-child(1):hover {
  background: #efefef;
}

#task-list .task-list .btn-con button:nth-child(2) {
  background: #673de6;
}

#task-list .task-list .btn-con button:last-child {
  background: #ef4444;
}

#task-list .task .task-status {
  color: #888888;
  font-size: 10px;
  position: absolute;
  left: 10px;
  align-items: center;
  bottom: 5px;
  display: flex;
  gap: 10px;
}

#task-list .task .task-status .priority {
  background: #ef4444;
  color: #ffffff;
  padding: 4px 10px;
  border-radius: 10px;
}

#task-list .task-desc-con input {
  width: 15px;
  height: 15px;
}

@media screen and (max-width: 1920px) {
  #task-list .task-list-con {
    padding-left: 30px;
    padding-right: 30px;
  }
}
</style>