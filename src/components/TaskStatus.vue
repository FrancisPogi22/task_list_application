<template>
  <div v-if="taskList.length > 0" id="task-status">
    <p>Prioritize Task: {{ prioritizeTask }}</p>
    <p>Remaining Task: {{ remainingTask }}</p>
    <p>Completed Task: {{ completedTask }}</p>
    <p>Total Task: {{ totalTask }}</p>
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
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  margin: 10px;
  background: #5025d1c4;
  border-radius: 4px;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
}

#task-status p {
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
}
</style>
