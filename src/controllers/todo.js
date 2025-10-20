import { Todo } from "../models";
import { ProjectController } from "./project";

export class TodoController {
  constructor() {
    this.todos = new Map();
    this.currentId = 1;
    this.selectedTodo = null;
  }

  /**
   * Takes in todos from each project and populates the TodoController
   * @param {ProjectController} projectController
   */
  loadFromStorage(projectController) {
    let maxId = 0;

    for (const [_, project] of projectController.projects) {
      for (const [todoId, todo] of project.todos) {
        this.todos.set(todoId, todo);
        maxId = Math.max(maxId, todoId);
      }
    }

    this.currentId = maxId + 1;
  }

  /**
   * Get a todo item by ID
   * @param {number} id
   * @returns Todo
   */
  get(id) {
    return this.todos.get(id);
  }

  /**
   * Takes in todo parameters and creates a new Todo item
   * @param {string} title
   * @param {string} description
   * @param {string} dueDate
   * @param {string} priority
   * @returns Todo
   */
  addTodo(title, description, dueDate, priority) {
    this.todos.set(
      this.currentId,
      new Todo(this.currentId, title, description, dueDate, priority)
    );

    const createdTodo = this.todos.get(this.currentId);
    this.currentId += 1;

    return createdTodo;
  }

  /**
   * Takes in a set of todo parameters and passes an update to the model
   * @param {number} id
   * @param {string} title
   * @param {string} description
   * @param {Date} dueDate
   * @param {string} priority
   */
  updateTodo(id, title, description, dueDate, priority) {
    const todo = this.todos.get(id);
    todo.update(title, description, dueDate, priority);
  }

  /**
   * Deletes a todo by ID
   * @param {number} id
   */
  removeTodo(id) {
    this.todos.delete(id);
  }

  /**
   * Selects todo by ID as the active todo for editing
   * @param {number} id
   */
  selectTodo(id) {
    this.selectedTodo = this.todos.get(id);
  }

  /**
   * Marks whether the todo by ID is complete or not
   * @param {number} id
   */
  toggleCompletion(id) {
    const todo = this.todos.get(id);
    todo.toggleCompletion();
  }
}
