import { ProjectController } from "./project";

export class AppController {
  constructor() {
    this.projects = new Map();
  }

  // TODO: reconsider the API here
  addProject(project) {
    this.projects.set(project.id, {
      project,
      controller: new ProjectController(project),
    });
  }

  renderProjectList() {
    const sidebar = document.querySelector(".sidebar");

    const projectList = document.createElement("ul");
    projectList.classList.add("project-list");

    for (const { _, controller } of this.projects.values()) {
      projectList.appendChild(controller.renderSummary());
    }

    sidebar.appendChild(projectList);
  }

  renderProjectDetails() {}
}
