import trashCan from "../public/icons/trash-can.svg";
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

    const projectHeader = document.createElement("div");
    projectHeader.classList.add("project-header");
    this.container.appendChild(projectHeader);

    const projectMetadata = document.createElement("div");
    projectMetadata.classList.add("project-metadata");
    projectHeader.appendChild(projectMetadata);

    if (project.title !== "Inbox") {
      const deleteIcon = document.createElement("img");
      projectHeader.appendChild(deleteIcon);
      deleteIcon.src = trashCan;

      deleteIcon.addEventListener("click", () => {
        const event = new CustomEvent("projectDeletionRequested", {
          detail: { id: this.projectController.selectedProject.id },
        });
        document.dispatchEvent(event);
      });
    }

    const projectTitleHeading = document.createElement("h2");
    projectTitleHeading.textContent = project.title;
    projectMetadata.appendChild(projectTitleHeading);

    const projectDescriptionBlurb = document.createElement("p");
    projectDescriptionBlurb.textContent = project.description;
    projectMetadata.appendChild(projectDescriptionBlurb);

    this.todoList.render();
  }

  clear() {
    this.parentContainer.appendChild(this.container);
    this.container.replaceChildren();
  }
}
