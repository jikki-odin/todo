import { Project, Todo } from "../models";

export class ProjectController {
  constructor() {
    this.projects = new Map();
    this.currentId = 1;

    this.loadFromStorage();

    if (this.projects.size === 0) {
      this.addProject("Inbox", "Your default tadoo list!");
    }

    this.selectedProject = this.projects.get(1);
  }

  loadFromStorage() {
    const projectsJSON = localStorage.getItem("projects");

    if (!projectsJSON) {
      return;
    }

    const storedProjects = JSON.parse(projectsJSON);
    let maxId = 0;

    for (const storedProject of storedProjects) {
      const project = new Project(
        storedProject.id,
        storedProject.title,
        storedProject.description
      );

      for (const storedTodo of storedProject.todos) {
        const todo = new Todo(
          storedTodo.id,
          storedTodo.title,
          storedTodo.description,
          storedTodo.dueDate,
          storedTodo.priority,
          storedTodo.isComplete
        );

        project.addTodo(todo);
      }

      this.projects.set(project.id, project);
      maxId = Math.max(maxId, project.id);
    }

    this.currentId = maxId + 1;
  }

  saveToStorage() {
    const storedProjects = [];

    for (const [_, project] of this.projects) {
      const storedProject = {
        ...project,
        todos: [],
      };

      for (const [_, todo] of project.todos) {
        storedProject.todos.push(todo);
      }

      storedProjects.push(storedProject);
    }

    localStorage.setItem("projects", JSON.stringify(storedProjects));
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
    this.saveToStorage();
    return createdProject;
  }

  /**
   * Removes a project from the list
   * @param {number} id - The ID of the project to be deleted
   */
  removeProject(id) {
    // TODO: ensure connected todos get deleted as well
    this.projects.delete(id);
    this.saveToStorage();
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
    this.saveToStorage();
  }

  moveTodo(todoId, oldProjectId, newProjectId) {
    const todos = this.getTodos(oldProjectId);
    const todoToMove = todos.get(todoId);
    this.removeTodo(oldProjectId, todoId);
    this.addTodo(newProjectId, todoToMove);
    this.saveToStorage();
  }

  removeTodo(id, todoId) {
    const project = this.projects.get(id);
    project.removeTodo(todoId);
    this.saveToStorage();
  }
}
