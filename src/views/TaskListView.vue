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
        <TaskList :taskList="taskList" @editTask="editTask" />
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
  beforeCreate() {
    if (!localStorage.getItem("taskList"))
      localStorage.setItem("taskList", JSON.stringify([]));
  },
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
  components: {
    AddTaskForm,
    TaskStatus,
  },
  methods: {
    addTask() {
      this.taskToEdit = null;
      this.showForm = true;
      this.isEditing = false;
    },
    editTask(task, index) {
      this.taskToEdit = { task, index };
      this.showForm = true;
      this.isEditing = true;
    },
    closeForm() {
      this.taskToEdit = null;
      this.showForm = false;
      this.isEditing = false;
    },
    emptyTask() {
      let taskList = JSON.parse(localStorage.getItem("taskList")),
        selectedFilter = document.getElementById("filter").value;

      if (taskList.length == 0) return showInfoMessage("No tasks listed.");

      confirmMessage("delete all", "Delete").then((result) => {
        if (!result.isConfirmed) return;

        if (selectedFilter == "" || selectedFilter == 0) this.taskList = [];
        else
          switch (selectedFilter) {
            case "1":
              this.taskList = this.taskList.filter((task) => task.status != 1);
              break;
            case "2":
              this.taskList = this.taskList.filter(
                (task) => task.isPriority != 1
              );
              break;
          }

        localStorage.setItem("taskList", JSON.stringify(this.taskList));
        showSuccessMessage("All task successfully removed.");
      });
    },
  },
};
</script>

<style>
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

#task-list .task-list-con {
  padding: 100px 0;
}

#task-list .task-list-con h1 {
  font-size: 30px;
  color: #2f1c6a;
  line-height: 1.6em;
}

#task-list .task-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #8888;
}

button {
  border: none;
  padding: 12px 16px;
  border-radius: 5px;
  transition: 0.2s;
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.16);
  color: var(--color-white);
}

#task-list .header-btn-con {
  display: flex;
  gap: 10px;
}

#task-list .task-list-header button {
  background: var(--color-purple);
  font-weight: 600;
}

#task-list .task-list-header button:hover {
  background: var(--color-hover-purple);
}

#task-list .task-list .btn-con button:nth-child(3):hover,
#task-list .header-btn-con button:last-child:hover {
  background: var(--color-hover-red);
}

#task-list .task-list .btn-con button:nth-child(1) {
  background: var(--color-white);
  color: var(--color-black);
}

#task-list .task-list .btn-con button:nth-child(1):hover {
  background: #efefef;
}

#task-list .task-list .btn-con button:nth-child(2) {
  background: var(--color-purple);
}

#task-list .task-list .btn-con button:nth-child(4) {
  color: var(--color-black);
  box-shadow: none;
  background: transparent;
  font-size: 18px;
  padding: 0 6px;
}

#task-list .task-list .btn-con button:nth-child(3),
#task-list .header-btn-con button:last-child {
  background: var(--color-red);
}

.done-task {
  background: var(--color-green);
  color: var(--color-white);
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

#task-list .task-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
}

#task-list .task-list .task {
  background: var(--color-white);
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
  padding: 20px;
  display: flex;
  max-width: 670px;
  width: 100%;
  justify-content: space-between;
  border-radius: 5px;
  position: relative;
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

#task-list .task .task-status {
  color: var(--color-light-gray);
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
  background: var(--color-red);
  color: var(--color-white);
  padding: 4px 10px;
  border-radius: 10px;
}

#task-list .task-desc-con input {
  width: 15px;
  height: 15px;
  z-index: 2;
}

#task-list .task-list-header-con {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

#task-list .bulk-action-con {
  display: flex;
  gap: 10px;
}

#task-list .bulk-action-con select,
#task-list .task-filter-con select {
  border-radius: 5px;
  font-size: 14px;
  border: 1px solid #8888;
  width: 150px;
}

#task-list .task-filter-con select {
  font-size: 14px;
  padding: 6px 0;
}

#task-list .bulk-action-con button {
  background: var(--color-purple);
  padding: 8px 20px;
}

#task-list .bulk-action-con button:hover {
  background: var(--color-hover-purple);
}

@media screen and (max-width: 1920px) {
  #task-list .task-list-con {
    padding-left: 30px;
    padding-right: 30px;
  }
}

@media screen and (max-width: 1420px) {
  #task-list .task-list {
    flex-direction: column;
  }

  #task-list .task-list .task {
    max-width: unset;
  }
}

@media screen and (max-width: 767px) {
  #task-list .task-list .task {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  #task-list .task .task-status {
    position: relative;
    align-self: baseline;
  }
}
</style>