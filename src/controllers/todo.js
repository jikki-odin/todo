export class TodoController {
  constructor(todo) {
    this.todo = todo;
  }

  displaySummary() {
    // TODO: wrap in li here?
    const todoCard = document.createElement("div");
    todoCard.classList.add("project-todo");

    const todoTitle = document.createElement("h3");
    todoTitle.classList.add("todo-title");
    todoTitle.textContent = this.todo.title;
    todoCard.appendChild(todoTitle);

    const todoDueDate = document.createElement("div");
    todoDueDate.classList.add("todo-due-date");
    // TODO: format date
    todoDueDate.textContent = this.todo.dueDate;
    todoCard.appendChild(todoDueDate);

    return todoCard;
  }
}
