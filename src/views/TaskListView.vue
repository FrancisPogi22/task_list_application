<template>
  <section id="task-list">
    <div class="wrapper">
      <div class="task-list-con">
        <div class="task-list-header">
          <h1>Task List</h1>
          <div class="header-btn-con">
            <button @click="addTask">Add Task</button>
            <button @click="emptyTask">Empty Task</button>
          </div>
        </div>
        <div class="task-list">
          <div
            class="task"
            v-for="(task, index) in sortedTaskList"
            :key="index"
          >
            <span class="view-task" @click="viewTask(index)"
              >View Task Details >>
            </span>
            <div class="task-status">
              <p class="date">{{ task.createdAt }}</p>
              <p v-if="task.isPriority == 1" class="priority">prioritized</p>
              <p v-if="task.status == 1" class="done-task">completed</p>
            </div>
            <div class="task-desc-con">
              <input
                title="Mark As Complete"
                type="checkbox"
                :checked="task.status == 1"
                @change="manageTask('status', index)"
              />
              <p>{{ task.title }}</p>
            </div>
            <div class="btn-con">
              <button
                title="Prioritize Task"
                @click="manageTask('priority', index)"
              >
                <i class="bi bi-card-checklist"></i>
              </button>
              <button title="Edit Task" @click="editTask(task, index)">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button title="Remove Task" @click="manageTask('remove', index)">
                <i class="bi bi-trash3"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <TaskStatus :taskList="taskList" />
  <div v-if="showForm" class="backdrop">
    <AddTaskForm
      :taskList="taskList"
      :isEditing="isEditing"
      :taskToEdit="taskToEdit"
      @close-form="closeForm"
    />
  </div>
</template>

<script>
import AddTaskForm from "../components/TaskForm.vue";
import TaskStatus from "../components/TaskStatus.vue";

export default {
  // Before the to create the component it will be setting the taskList in local storage
  beforeCreate() {
    if (!localStorage.getItem("taskList"))
      localStorage.setItem("taskList", JSON.stringify([]));
  },
  // If the component created storing the taskList array in local storage into vue task list storage
  created() {
    this.taskList = JSON.parse(localStorage.getItem("taskList"));
  },
  data() {
    return {
      taskList: [],
      showForm: false,
      taskToEdit: null,
      isEditing: false,
    };
  },
  // Injecting all component that needs in this view
  components: {
    AddTaskForm,
    TaskStatus,
  },
  methods: {
    // This method is for adding task and setting the task form parameters
    addTask() {
      this.taskToEdit = null;
      this.showForm = true;
      this.isEditing = false;
    },
    // This method is for editing specific task and passing the task, index into task form
    editTask(task, index) {
      this.taskToEdit = { task, index };
      this.showForm = true;
      this.isEditing = true;
    },
    // This is a dynamic and reusable methods that requires an action and task index for changing status, set into priority, and remove task
    manageTask(action, index) {
      switch (action) {
        case "status":
          this.taskList[index].status ^= 1;
          showSuccessMessage("Task successfully changed status.");
          break;
        case "priority":
          this.taskList[index].isPriority =
            this.taskList[index].isPriority == 0 ? 1 : 0;

          if (this.taskList[index].isPriority == 1)
            showSuccessMessage("Task successfully prioritized.");
          else showSuccessMessage("Priority removed from task.");
          break;

        case "remove":
          confirmMessage("remove this", "Remove").then((result) => {
            if (!result.isConfirmed) return;

            this.taskList.splice(index, 1);
            localStorage.setItem("taskList", JSON.stringify(this.taskList));
            showSuccessMessage("Task successfully removed.");
          });
          break;
      }

      localStorage.setItem("taskList", JSON.stringify(this.taskList));
    },
    // Resetting all task list storage
    emptyTask() {
      let taskList = JSON.parse(localStorage.getItem("taskList"));

      if (taskList.length == 0) return showInfoMessage("No tasks listed.");

      confirmMessage("remove all", "Remove").then((result) => {
        if (!result.isConfirmed) return;

        this.taskList = [];
        localStorage.setItem("taskList", JSON.stringify([]));
        showSuccessMessage("All task successfully removed.");
      });
    },
    // Redirect to the task details page and pass the index of the specific task.
    viewTask(index) {
      this.$router.push({ name: "task-details", params: { id: index } });
    },
    // Resetting task form parameters
    closeForm() {
      this.taskToEdit = null;
      this.showForm = false;
      this.isEditing = false;
    },
  },
  computed: {
    // Sorting the task list array by priority, with priority tasks first followed by non-priority tasks.
    sortedTaskList() {
      return this.taskList.sort((a, b) => b.isPriority - a.isPriority);
    },
  },
};
</script>

<style scoped>
.backdrop {
  overflow: auto;
  top: 71px;
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

.done-task {
  background: #16a34a;
  color: #ffffff;
  padding: 4px 10px;
  border-radius: 10px;
}

#task-list .task .view-task {
  display: flex;
  opacity: 0;
  justify-content: center;
  width: 100%;
  top: 0;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  height: 0;
  left: 0;
  position: absolute;
  cursor: pointer;
  transition: height 0.3s;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
}

#task-list .task:hover .view-task {
  opacity: 1;
  height: 100%;
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
  border-radius: 5px;
  position: relative;
}

#task-list .task-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #88888854;
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
  z-index: 2;
}

#task-list .btn-con {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  z-index: 2;
}

button {
  border: none;
  padding: 12px 16px;
  border-radius: 5px;
  transition: 0.2s;
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.16);
  color: #ffffff;
}

#task-list .header-btn-con {
  display: flex;
  gap: 10px;
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

#task-list .task-list .btn-con button:last-child:hover,
#task-list .header-btn-con button:last-child:hover {
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

#task-list .task-list .btn-con button:last-child,
#task-list .header-btn-con button:last-child {
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
  z-index: 2;
  height: 21px;
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
  z-index: 2;
}

@media screen and (max-width: 1920px) {
  #task-list .task-list-con {
    padding-left: 30px;
    padding-right: 30px;
  }
}
</style>