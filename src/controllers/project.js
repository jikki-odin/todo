import { Project } from "../types";

export class ProjectController {
  constructor() {
    this.projects = new Map();
    this.currentId = 1;
    this.selectedProject = null;
  }

  // TODO: reconsider whether this is necessary
  get projectList() {
    // inefficient to recreate this each time, but we're not scaling here
    const projectList = [];

    for (const [_, project] of this.projects) {
      projectList.push(project);
    }

    return projectList;
  }

  /**
   * Adds a new project to the list
   * @param {string} title - Project title
   * @param {string} description - Project description
   * @returns void
   */
  addProject(title, description) {
    this.projects.set(
      this.currentId,
      new Project(this.currentId, title, description)
    );

    this.currentId += 1;
  }

  /**
   * Removes a project from the list
   * @param {number} id - The ID of the project to be deleted
   */
  removeProject(id) {
    this.projects.delete(id);
  }

  /**
   * Selects a project as the active project to render
   * @param {number} id - The ID of the project to mark as active
   */
  selectProject(id) {
    this.selectedProject = this.projects.get(id);
  }

  addTodo(id, todo) {
    const project = this.projects.get(id);
    project.addTodo(todo);
  }
}
