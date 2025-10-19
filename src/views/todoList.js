import { formatRelative } from "date-fns";

import kebabMenu from "../public/icons/kebab-menu.svg";

export class TodoListView {
  constructor(projectContainer, projectController, todoController) {
    this.parentContainer = projectContainer;
    this.container = document.createElement("div");
    // TODO: consider consolidating/hoisting controller logic via event arch
    this.projectController = projectController;
    this.todoController = todoController;
  }

  render() {
    this.parentContainer.appendChild(this.container);
    this.container.replaceChildren();

    const todoList = document.createElement("ul");
    todoList.classList.add("project-todos");
    this.container.appendChild(todoList);

    for (const [id, todo] of this.projectController.selectedProject.todos) {
      const todoListItem = document.createElement("li");
      todoList.appendChild(todoListItem);
      const todoCard = document.createElement("div");
      todoCard.classList.add("todo-summary-item");
      todoListItem.appendChild(todoCard);
      todoCard.dataset.id = id;

      const todoComplete = document.createElement("input");
      todoCard.appendChild(todoComplete);
      todoComplete.type = "checkbox";

      todoComplete.addEventListener("click", () => {
        this.todoController.toggleCompletion(id);
      });

      const todoTitle = document.createElement("h3");
      todoCard.appendChild(todoTitle);
      todoTitle.textContent = todo.title;

      const todoDueDate = document.createElement("div");
      todoCard.appendChild(todoDueDate);
      todoDueDate.textContent = formatRelative(todo.dueDate, new Date());

      const todoOptionsButton = document.createElement("img");
      todoOptionsButton.classList.add("todo-details-button");
      todoOptionsButton.src = kebabMenu;
      todoOptionsButton.addEventListener("click", () => {
        const event = new CustomEvent("todoSelected", {
          detail: { id },
        });
        document.dispatchEvent(event);
      });

      todoCard.appendChild(todoOptionsButton);
    }

    const newTodoListItem = document.createElement("li");
    todoList.appendChild(newTodoListItem);
    const newTodoButton = document.createElement("button");
    newTodoListItem.appendChild(newTodoButton);
    newTodoButton.textContent = "+ Add a new task";
    newTodoButton.addEventListener("click", () => {
      console.log("Blue-ski-doo, creating new todo...");
      const event = new CustomEvent("newTodoRequested");
      document.dispatchEvent(event);
    });
  }
}
