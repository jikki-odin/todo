export class Project {
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.todos = new Map();
  }

  addTodo(todo) {
    this.todos.set(todo.id, todo);
  }

  removeTodo(id) {
    this.todos.delete(id);
  }
}
