<template>
  <div v-if="taskList.length > 0" id="task-status">
    <p>
      Prioritize<span>{{ prioritizeTask }}</span>
    </p>
    <p>
      Completed<span>{{ completedTask }}</span>
    </p>
    <p>
      Remaining<span>{{ remainingTask }}</span>
    </p>
    <p>
      Total <span>{{ totalTask }}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: ["taskList"],
  computed: {
    prioritizeTask() {
      return this.taskList.filter((task) => task.isPriority == 1).length;
    },
    remainingTask() {
      return this.taskList.filter((task) => task.status == 0).length;
    },
    completedTask() {
      return this.taskList.filter((task) => task.status == 1).length;
    },
    totalTask() {
      return this.taskList.filter((task) => !task.completed).length;
    },
  },
};
</script>

<style>
#task-status {
  position: fixed;
  bottom: 10px;
  left: 10px;
  width: 180px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: #5025d1c4;
  border-radius: 5px;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
}

#task-status p {
  color: var(--color-white);
  font-size: 14px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
}
</style>
