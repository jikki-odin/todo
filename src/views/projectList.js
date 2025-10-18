export class ProjectListView {
  constructor(appContainer, projectController) {
    this.parentContainer = appContainer;
    this.container = document.createElement("ul");
    this.container.classList.add("project-list");

    this.projectController = projectController;
  }

  render() {
    this.parentContainer.appendChild(this.container);
    this.container.replaceChildren();

    for (const project of this.projectController.projectList) {
      const projectListItem = document.createElement("li");
      const projectButton = document.createElement("button");

      projectButton.dataset.id = project.id;
      projectButton.textContent = project.title;

      projectButton.addEventListener("click", () => {
        const event = new CustomEvent("projectSelected", {
          detail: { projectId: project.id },
        });
        document.dispatchEvent(event);
      });

      projectListItem.appendChild(projectButton);
      this.container.appendChild(projectListItem);
    }

    const newProjectListItem = document.createElement("li");
    const newProjectButton = document.createElement("button");
    newProjectButton.textContent = "+ Add a new project";
    newProjectButton.addEventListener("click", () => {
      console.log("Creating new project...");
      // TODO: add logic for a custom event to render the new project modal
      const event = new CustomEvent("newProjectRequested");
      document.dispatchEvent(event);
    });

    newProjectListItem.appendChild(newProjectButton);
    this.container.appendChild(newProjectListItem);
  }
}
