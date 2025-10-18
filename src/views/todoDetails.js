import { formatRelative } from "date-fns";

export class TodoDetailView {
  constructor(appContainer, todoController) {
    this.container = document.createElement("div");
    this.container.classList.add("todo-details");
    appContainer.appendChild(this.container);

    this.todoController = todoController;
  }

  render() {
    // this also needs to know about a specific todo and
  }

  // displaySummary() {
  //   // TODO: wrap in li here?
  //   const todoCard = document.createElement("div");
  //   todoCard.classList.add("project-todo");
  //   todoCard.dataset.id = this.todo.id;

  //   const todoComplete = document.createElement("input");
  //   todoComplete.type = "checkbox";
  //   todoComplete.classList.add("todo-complete");
  //   // TODO: add handler for checking off
  //   todoComplete.addEventListener("click", (event) => {
  //     // TODO: add identifier for whole todo
  //     const checkbox = event.target;
  //     if (checkbox.checked) {
  //       console.log("Checked!");
  //     } else {
  //       console.log("Unchecked!");
  //     }
  //   });
  //   todoCard.appendChild(todoComplete);

  //   const todoTitle = document.createElement("h3");
  //   todoTitle.classList.add("todo-title");
  //   todoTitle.textContent = this.todo.title;
  //   todoCard.appendChild(todoTitle);

  //   const todoDueDate = document.createElement("div");
  //   todoDueDate.classList.add("todo-due-date");
  //   todoDueDate.textContent = formatRelative(this.todo.dueDate, new Date());
  //   todoCard.appendChild(todoDueDate);

  //   const todoDeleteButton = document.createElement("button");
  //   todoDeleteButton.classList.add("todo-delete");
  //   todoDeleteButton.textContent = "x";
  //   // TODO: add handler for deletion
  //   todoCard.appendChild(todoDeleteButton);

  //   return todoCard;
  // }
}
