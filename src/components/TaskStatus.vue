<template>
  <div id="task-status">
    <p>Remaining Task: {{ remainingTask }}</p>
    <p>Completed Task:</p>
    <p>Total Task:</p>
  </div>
</template>

<script>
export default {
  props: ["taskList"],
  computed: {
    remainingTask() {
      return this.taskList.filter((task) => !task.completed).length;
    },
  },
};
</script>

<style>
#task-status {
  position: absolute;
  bottom: 0;
  padding: 20px;
  margin: 20px;
  background: #5025d1c4;
  border-radius: 4px;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
}

#task-status p {
  color: #ffffff;
  font-size: 15px;
  font-style: italic;
  font-weight: 500;
}

#task-status p:not(:last-child) {
  margin-bottom: 20px;
}
</style>
