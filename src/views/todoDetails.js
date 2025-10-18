import { formatRelative } from "date-fns";

export class TodoDetailView {
  constructor(appContainer, todoController) {
    this.container = document.createElement("div");
    this.container.classList.add("todo-details");
    appContainer.appendChild(this.container);

    this.todoController = todoController;
  }

  render() {
    // this also needs to know about a specific todo (and project?)
  }
}
