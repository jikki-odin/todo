import { ProjectController, TodoController } from "./controllers";
import "./public/styling/styles.css";
import { AppView } from "./views";

const projectController = new ProjectController();
const todoController = new TodoController();

todoController.loadFromStorage(projectController);

const appContainer = document.querySelector(".main");
const appView = new AppView(appContainer, projectController, todoController);
appView.render();
