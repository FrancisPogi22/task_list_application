import { createRouter, createWebHistory } from "vue-router";
import TaskListView from "../views/TaskListView.vue";
import TaskDetails from "../views/TaskDetailsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "task-list",
      component: TaskListView,
    },
    {
      path: "/task-details/:id",
      name: "task-details",
      component: TaskDetails,
      props: true,
    },
  ],
});

export default router;
