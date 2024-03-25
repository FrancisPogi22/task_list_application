<template>
  <div class="task-list">
    <div class="task-list-header-con">
      <div class="bulk-action-con">
        <select id="action">
          <option value="">Select Action</option>
          <option value="Delete">Delete</option>
          <option value="Complete">Complete</option>
        </select>
        <button @click="applyBulkAction" title="Apply">Apply</button>
      </div>
      <div class="task-filter-con">
        <select id="filter" v-model="selectedFilter" @change="applyFilter">
          <option value="">Select Filter</option>
          <option value="0">All</option>
          <option value="1">Completed</option>
          <option value="2">Prioritized</option>
        </select>
      </div>
    </div>
    <div class="task" v-for="(task, index) in filteredTaskList" :key="index">
      <span class="view-task" @click="viewTask(index)"
        >View Task Details >>
      </span>
      <div class="task-status">
        <p class="date">Created On: {{ task.createdAt }}</p>
        <p v-if="task.isPriority == 1" class="priority">prioritized</p>
        <p v-if="task.status == 1" class="done-task">completed</p>
      </div>
      <div class="task-desc-con">
        <input
          title="Mark As Complete"
          type="checkbox"
          :checked="selectedTasks.includes(index)"
          @change="toggleTaskSelection(index)"
        />
        <p>{{ task.title }}</p>
      </div>
      <div class="btn-con">
        <button title="Prioritize Task" @click="manageTask('priority', index)">
          <i class="bi bi-card-checklist"></i>
        </button>
        <button title="Edit Task" @click="$emit('editTask', task, index)">
          <i class="bi bi-pencil-square"></i>
        </button>
        <button title="Delete Task" @click="manageTask('delete', index)">
          <i class="bi bi-trash3"></i>
        </button>
        <button
          v-if="task.status == 0"
          title="Complete Task"
          @click="manageTask('complete', index)"
        >
          <i class="bi bi-check-lg"></i>
        </button>
        <button
          v-if="task.status == 1"
          title="Revert To Incomplete"
          @click="manageTask('revert', index)"
        >
          <i class="bi bi-arrow-repeat"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["taskList"],
  data() {
    return {
      selectedTasks: [],
      selectedFilter: "",
    };
  },
  methods: {
    manageTask(action, index) {
      switch (action) {
        case "priority":
          this.taskList[index].isPriority =
            this.taskList[index].isPriority == 0 ? 1 : 0;

          if (this.taskList[index].isPriority == 1)
            showSuccessMessage("Task successfully prioritized.");
          else showSuccessMessage("Priority removed from task.");
          this.selectedTasks = [];
          break;
        case "delete":
          confirmMessage("delete this", "Delete").then((result) => {
            if (!result.isConfirmed) return;

            this.taskList.splice(index, 1);
            localStorage.setItem("taskList", JSON.stringify(this.taskList));
            showSuccessMessage("Task successfully deleted.");
            this.selectedTasks = [];
          });
          break;
        case "complete":
          confirmMessage("mark as complete this", "Complete").then((result) => {
            if (!result.isConfirmed) return;

            this.taskList[index].status = 1;
            localStorage.setItem("taskList", JSON.stringify(this.taskList));
            showSuccessMessage("Task successfully completed.");
            this.selectedTasks = [];
          });
          break;
        case "revert":
          confirmMessage("revert to incomplete this", "Revert").then(
            (result) => {
              if (!result.isConfirmed) return;

              this.taskList[index].status = 0;
              localStorage.setItem("taskList", JSON.stringify(this.taskList));
              showSuccessMessage("Task successfully reverted.");
              this.selectedTasks = [];
            }
          );
          break;
      }

      localStorage.setItem("taskList", JSON.stringify(this.taskList));
    },
    toggleTaskSelection(index) {
      if (this.selectedTasks.includes(index))
        this.selectedTasks = this.selectedTasks.filter((i) => i != index);
      else this.selectedTasks.push(index);
    },
    applyBulkAction() {
      let action = document.getElementById("action").value;

      if (action == "Delete") this.deleteSelectedTasks();
      else if (action == "Complete") this.completeSelectedTasks();
    },
    deleteSelectedTasks() {
      if (this.selectedTasks.length == 0) return;

      confirmMessage("delete these", "Delete").then((result) => {
        if (!result.isConfirmed) return;

        this.selectedTasks
          .sort((a, b) => b - a)
          .forEach((index) => {
            this.taskList.splice(index, 1);
          });
        this.resetBulkAction();
        showSuccessMessage("Selected tasks successfully deleted.");
      });
    },
    completeSelectedTasks() {
      if (this.selectedTasks.length == 0) return;

      let allCompleted = this.selectedTasks.every(
        (index) => this.taskList[index].status == 1
      );
      if (allCompleted) {
        showInfoMessage("All selected tasks are already completed.");
        return;
      }

      this.selectedTasks.forEach((index) => {
        if (this.taskList[index].status != 1) this.taskList[index].status = 1;
      });
      this.resetBulkAction();
      showSuccessMessage("Selected tasks successfully marked as completed.");
    },
    resetBulkAction() {
      localStorage.setItem("taskList", JSON.stringify(this.taskList));
      document.getElementById("action").selectedIndex = 0;
      this.selectedTasks = [];
    },
    viewTask(index) {
      this.$router.push({ name: "task-details", params: { id: index } });
    },
    applyFilter() {
      this.filteredTaskList;
    },
  },
  computed: {
    sortedTaskList() {
      return this.taskList.sort((a, b) => b.isPriority - a.isPriority);
    },
    filteredTaskList() {
      if (!this.selectedFilter) return this.sortedTaskList;

      return this.sortedTaskList.filter((task) => {
        if (this.selectedFilter == "0") {
          return true;
        } else if (this.selectedFilter == "1") {
          return task.status == 1;
        } else if (this.selectedFilter == "2") {
          return task.isPriority == 1;
        }

        return false;
      });
    },
  },
};
</script>