import { TodoListView } from "./todoList.js";

export class ProjectDetailView {
  constructor(appContainer, projectController, todoController) {
    this.container = document.createElement("div");
    this.container.classList.add("project");
    appContainer.appendChild(this.container);

    this.projectController = projectController;
    this.todoController = todoController;

    this.todoList = new TodoListView(this.container, this.todoController);
  }

  render() {
    const project = this.projectController.selectedProject;
    this.container.replaceChildren();

    const projectMetadata = document.createElement("div");
    projectMetadata.classList.add("project-metadata");

    const projectTitleHeading = document.createElement("h2");
    projectTitleHeading.textContent = project.title;
    projectMetadata.appendChild(projectTitleHeading);

    const projectDescriptionBlurb = document.createElement("p");
    projectDescriptionBlurb.textContent = project.description;
    projectMetadata.appendChild(projectDescriptionBlurb);

    this.container.appendChild(projectMetadata);
    // this.todoList.render();
  }
}
