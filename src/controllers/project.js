import { Project } from "../models";

export class ProjectController {
  constructor() {
    this.projects = new Map();
    this.currentId = 1;
    this.selectedProject = null;
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

    const createdProject = this.projects.get(this.currentId);
    this.currentId += 1;
    return createdProject;
  }

  /**
   * Removes a project from the list
   * @param {number} id - The ID of the project to be deleted
   */
  removeProject(id) {
    // TODO: ensure connected todos get deleted as well
    this.projects.delete(id);
  }

  /**
   * Selects a project as the active project to render
   * @param {number} id - The ID of the project to mark as active
   */
  selectProject(id) {
    this.selectedProject = this.projects.get(id);
  }

  getTodos(id) {
    const project = this.projects.get(id);
    return project.todos;
  }

  addTodo(id, todo) {
    const project = this.projects.get(id);
    project.addTodo(todo);
  }

  removeTodo(id, todoId) {
    const project = this.projects.get(id);
    project.removeTodo(todoId);
  }
}
