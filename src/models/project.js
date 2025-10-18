export class Project {
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  // TODO: is a getter better?
  getTodos() {
    return this.todos;
  }
}
