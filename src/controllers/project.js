import { TodoController } from "./todo.js";

export class ProjectController {
  constructor(project) {
    this.project = project;
  }

  display() {
    const content = document.querySelector(".content");

    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");

    const projectMetadata = document.createElement("div");
    projectMetadata.classList.add("project-metadata");

    const projectTitleHeading = document.createElement("h2");
    projectTitleHeading.textContent = this.project.title;
    projectMetadata.appendChild(projectTitleHeading);

    const projectDescriptionBlurb = document.createElement("p");
    projectDescriptionBlurb.textContent = this.project.description;
    projectMetadata.appendChild(projectDescriptionBlurb);

    projectDiv.appendChild(projectMetadata);

    const todoList = document.createElement("ul");
    todoList.classList.add("project-todos");

    // add rendered todo items
    this.project.todos.forEach((todo) => {
      const controller = new TodoController(todo);
      const todoItem = document.createElement("li");
      todoItem.appendChild(controller.displaySummary());
      todoList.appendChild(todoItem);
    });

    projectDiv.appendChild(todoList);

    content.appendChild(projectDiv);
  }

  displayList() {
    const sidebar = document.querySelector(".sidebar");

    const projectList = document.createElement("ul");
  }
}
