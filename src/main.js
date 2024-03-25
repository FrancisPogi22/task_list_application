import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import TaskList from "./components/TaskList.vue";

const app = createApp(App);

app.component("TaskList", TaskList);
app.use(router);
app.mount("#app");
