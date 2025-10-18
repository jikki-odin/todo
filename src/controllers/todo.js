import { Todo } from "../models";

export class TodoController {
  constructor() {
    // TODO: figure out the integration with projects
    this.todos = new Map();
    this.currentId = 1;
    this.selectedTodo = null;
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
