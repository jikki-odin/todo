import "./public/styling/styles.css";
import { ProjectController } from "./controllers";
import { Project, Todo } from "./types";

const testTodo1 = new Todo(
  "do the thing",
  "you have to do it, Zhu Li...",
  new Date("2025-10-02"),
  "High"
);

const testTodo2 = new Todo(
  "do the other thing",
  "you have to do this too...",
  new Date("2025-10-03"),
  "Low"
);

const testProject = new Project("The Thing", "This is a big one!");
testProject.addTodo(testTodo1);
testProject.addTodo(testTodo2);

console.log(testProject);
const projectController = new ProjectController(testProject);
projectController.display();
