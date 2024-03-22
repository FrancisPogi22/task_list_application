<template>
  <section id="task-details">
    <div class="wrapper">
      <div class="task-details-con">
        <div class="task-details-header-con">
          <h1>{{ task.title }}</h1>
          <div class="task-details-othetr">
            <div class="created-date">
              <p>Created On</p>
              <p>{{ task.createdAt }}</p>
            </div>
          </div>
        </div>
        <div class="task-details">
          <div class="task-status-con">
            <p class="task-status-header">Tags</p>
            <div class="task-status">
              <p
                :class="[
                  task.isPriority == 1 ? 'prioritized' : 'not-prioritized',
                ]"
              >
                {{ task.isPriority == 1 ? "Prioritized" : "Not Prioritize" }}
              </p>
              <p :class="[task.status == 1 ? 'completed' : 'not-completed']">
                {{ task.status == 1 ? "Completed" : "Not Completed" }}
              </p>
            </div>
          </div>
          <div class="task-desc-con">
            <p>Description</p>
            <p>{{ task.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  props: ["id"],
  // If the component is created the task list in local storage will pass the specific task that have this.id in this.task
  created() {
    this.task = JSON.parse(localStorage.getItem("taskList"))[this.id];
  },
};
</script>

<style scoped>
#task-details .task-details-con {
  padding: 100px 0;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

#task-details .wrapper {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
}

#task-details .task-details {
  display: flex;
  gap: 20px;
  width: 100%;
}

#task-details .task-details-header-con {
  width: 100%;
}

#task-details .task-details-header-con h1 {
  text-transform: capitalize;
  margin-bottom: 20px;
}

#task-details .task-desc-con p:last-child,
#task-details .task-status-con .task-status,
#task-details .task-details-header-con {
  background: #ffffff;
  padding: 20px;
  border-radius: 5px;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
}

#task-details .task-desc-con,
#task-details .task-status-con {
  flex-basis: 50%;
}

#task-details .task-desc-con p:first-of-type,
#task-details .task-status-con .task-status-header,
#task-details .task-details-header-con p {
  margin-bottom: 10px;
  font-size: 14px;
  color: #666666;
}

#task-details .task-status {
  display: flex;
}

#task-details .task-status {
  display: flex;
  gap: 10px;
}

#task-details .completed {
  background: #16a34a;
}

#task-details .not-completed,
#task-details .not-prioritized {
  background: #bfbfbf;
}

#task-details .prioritized {
  background: #ef4444;
}

#task-details .task-status p {
  color: #ffffff;
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 20px;
}

#task-details .task-status-con {
  max-height: 100px;
  height: 100%;
}

#task-details .task-desc-con p:last-of-type {
  line-height: 2em;
  font-size: 14px;
  letter-spacing: 0.5px;
}

#task-details .created-date p:first-of-type {
  margin: 0;
  line-height: 2em;
}

#task-details .created-date p:last-of-type {
  font-size: 14px;
  color: #000000;
  font-weight: 500;
}

@media screen and (max-width: 1920px) {
  #task-details .task-details-con {
    padding-left: 30px;
    padding-right: 30px;
  }
}
</style>