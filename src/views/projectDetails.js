import { TodoListView } from "./todoList.js";

export class ProjectDetailView {
  constructor(appContainer, projectController, todoController) {
    this.parentContainer = appContainer;
    this.container = document.createElement("div");
    this.container.classList.add("project");

    this.projectController = projectController;
    this.todoController = todoController;

    this.todoList = new TodoListView(
      this.container,
      this.projectController,
      this.todoController
    );
  }

  render() {
    this.parentContainer.appendChild(this.container);
    this.container.replaceChildren();
    const project = this.projectController.selectedProject;

    const projectMetadata = document.createElement("div");
    projectMetadata.classList.add("project-metadata");

    const projectTitleHeading = document.createElement("h2");
    projectTitleHeading.textContent = project.title;
    projectMetadata.appendChild(projectTitleHeading);

    const projectDescriptionBlurb = document.createElement("p");
    projectDescriptionBlurb.textContent = project.description;
    projectMetadata.appendChild(projectDescriptionBlurb);

    this.container.appendChild(projectMetadata);
    this.todoList.render();
  }
}
