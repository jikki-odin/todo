import { Todo } from "../models";

export class TodoController {
  constructor() {
    // TODO: figure out the integration with projects
    this.todos = new Map();
    this.currentId = 1;
    this.selectedTodo = null;
  }

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

  get(id) {
    return this.todos.get(id);
  }

  // TODO: add documentation
  addTodo(title, description, dueDate, priority) {
    this.todos.set(
      this.currentId,
      new Todo(this.currentId, title, description, dueDate, priority)
    );

    const createdTodo = this.todos.get(this.currentId);
    this.currentId += 1;

    return createdTodo;
  }

  updateTodo(id, title, description, dueDate, priority) {
    const todo = this.todos.get(id);
    todo.update(title, description, dueDate, priority);
  }

  removeTodo(id) {
    this.todos.delete(id);
  }

  selectTodo(id) {
    this.selectedTodo = this.todos.get(id);
  }

  toggleCompletion(id) {
    const todo = this.todos.get(id);
    todo.toggleCompletion();
  }
}
