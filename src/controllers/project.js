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

  /**
   * Loads projects and their associated todos from localStorage
   * @returns void
   */
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

  /**
   * Saves current project/todo state to localStorage whenever there's a change
   */
  saveToStorage() {
    const storedProjects = [];

    for (const [_, project] of this.projects) {
      const storedProject = {
        ...project,
        todos: [],
      };

      for (const [_, todo] of project.todos) {
        const dueDate = todo.dueDate;
        const storedTodo = {
          ...todo,
          dueDate: `${dueDate.getFullYear()}-${
            dueDate.getMonth() + 1
          }-${dueDate.getDate()}`,
        };

        storedProject.todos.push(storedTodo);
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

  /**
   * Gets todo map associated with project
   * @param {number} id
   * @returns Map(number, Todo)
   */
  getTodos(id) {
    const project = this.projects.get(id);
    return project.todos;
  }

  /**
   * Adds a given todo to project by project ID
   * @param {number} id
   * @param {Todo} todo
   */
  addTodo(id, todo) {
    const project = this.projects.get(id);
    project.addTodo(todo);
    this.saveToStorage();
  }

  /**
   * Moves a specified todo from one project to another
   * @param {number} todoId
   * @param {number} oldProjectId
   * @param {number} newProjectId
   */
  moveTodo(todoId, oldProjectId, newProjectId) {
    const todos = this.getTodos(oldProjectId);
    const todoToMove = todos.get(todoId);
    this.removeTodo(oldProjectId, todoId);
    this.addTodo(newProjectId, todoToMove);
    this.saveToStorage();
  }

  /**
   * Removes a given todo from a project
   * @param {number} id
   * @param {number} todoId
   */
  removeTodo(id, todoId) {
    const project = this.projects.get(id);
    project.removeTodo(todoId);
    this.saveToStorage();
  }
}
