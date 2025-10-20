export class ProjectListView {
  constructor(appContainer, projectController) {
    this.parentContainer = appContainer;
    this.container = document.createElement("div");
    this.container.classList.add("sidebar");

    this.projectController = projectController;
  }

  render() {
    this.parentContainer.appendChild(this.container);
    this.container.replaceChildren();

    const projectList = document.createElement("ul");
    projectList.classList.add("project-list");
    this.container.appendChild(projectList);

    for (const [id, project] of this.projectController.projects) {
      const projectListItem = document.createElement("li");
      const projectButton = document.createElement("button");

      projectButton.dataset.id = id;
      projectButton.textContent = project.title;

      projectButton.addEventListener("click", () => {
        const event = new CustomEvent("projectSelected", {
          detail: { projectId: id },
        });
        document.dispatchEvent(event);
      });

      projectListItem.appendChild(projectButton);
      projectList.appendChild(projectListItem);
    }

    const newProjectListItem = document.createElement("li");
    const newProjectButton = document.createElement("button");
    newProjectButton.textContent = "+";
    newProjectButton.addEventListener("click", () => {
      console.log("Creating new project...");
      const event = new CustomEvent("newProjectRequested");
      document.dispatchEvent(event);
    });

    newProjectListItem.appendChild(newProjectButton);
    projectList.appendChild(newProjectListItem);
  }
}
