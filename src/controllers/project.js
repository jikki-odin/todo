import { TodoController } from "./todo.js";

export class ProjectController {
  constructor(project) {
    this.project = project;
  }

  render() {
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

    this.project.todos.forEach((todo) => {
      const controller = new TodoController(todo);
      const todoItem = document.createElement("li");
      todoItem.appendChild(controller.displaySummary());
      todoList.appendChild(todoItem);
    });

    projectDiv.appendChild(todoList);

    return projectDiv;
  }

  renderSummary() {
    const projectListItem = document.createElement("li");
    const projectButton = document.createElement("button");
    projectButton.dataset.id = this.project.id;
    projectButton.textContent = this.project.title;

    projectButton.addEventListener("click", () => {
      const content = document.querySelector(".content");
      content.replaceChildren();
      content.appendChild(this.render());
    });

    projectListItem.appendChild(projectButton);
    return projectListItem;
  }
}
