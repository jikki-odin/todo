import { formatDistanceToNow } from "date-fns";

import kebabMenu from "../public/icons/kebab-menu.svg";
import { getDayDiff } from "../utils.js";

export class TodoEditView {
  constructor(projectContainer, projectController, todoController) {
    this.parentContainer = projectContainer;
    this.container = document.createElement("div");
    this.container.classList.add("todo-list");
    this.projectController = projectController;
    this.todoController = todoController;
  }

  render() {
    this.parentContainer.appendChild(this.container);
    this.container.replaceChildren();

    const todoList = document.createElement("ul");
    todoList.classList.add("project-todos");
    this.container.appendChild(todoList);

    const sortedTodos = [...this.projectController.selectedProject.todos];
    sortedTodos.sort((todoEntryA, todoEntryB) => {
      const todoA = todoEntryA[1];
      const todoB = todoEntryB[1];
      return todoA.dueDate - todoB.dueDate;
    });

    for (const [id, todo] of sortedTodos) {
      const todoListItem = document.createElement("li");
      todoList.appendChild(todoListItem);
      const todoCard = document.createElement("div");
      todoCard.classList.add("todo-summary-item");
      todoListItem.appendChild(todoCard);
      todoCard.dataset.id = id;

      const todoCardContent = document.createElement("div");
      todoCardContent.classList.add("todo-summary-content");
      todoCard.appendChild(todoCardContent);
      todoCardContent.style.color = this.colorByDueDate(todo.dueDate);

      const todoComplete = document.createElement("input");
      todoCardContent.appendChild(todoComplete);
      todoComplete.type = "checkbox";

      if (todo.isComplete) {
        todoComplete.checked = true;
      }

      todoComplete.addEventListener("click", () => {
        this.todoController.toggleCompletion(id);
        this.projectController.saveToStorage();
      });

      const todoTitle = document.createElement("h3");
      todoCardContent.appendChild(todoTitle);
      todoTitle.textContent = todo.title;

      const todoDueDate = document.createElement("div");
      todoCardContent.appendChild(todoDueDate);
      todoDueDate.textContent = this.formatDueDate(todo.dueDate);

      const todoOptionsButton = document.createElement("img");
      todoOptionsButton.classList.add("todo-details-button");
      todoOptionsButton.src = kebabMenu;
      todoOptionsButton.addEventListener("click", (event) => {
        const newEvent = new CustomEvent("todoSelected", {
          detail: { id, button: event.target },
        });
        document.dispatchEvent(newEvent);
      });

      todoCard.appendChild(todoOptionsButton);
    }

    const newTodoListItem = document.createElement("li");
    todoList.appendChild(newTodoListItem);
    const newTodoButton = document.createElement("button");
    newTodoButton.classList.add("add-button");
    newTodoListItem.appendChild(newTodoButton);
    newTodoButton.textContent = "+ Add a new task";
    newTodoButton.addEventListener("click", () => {
      console.log("Blue-ski-doo, creating new todo...");
      const event = new CustomEvent("newTodoRequested");
      document.dispatchEvent(event);
    });
  }

  formatDueDate(dueDate) {
    const daysDifference = getDayDiff(new Date(), dueDate);

    if (daysDifference === 0) {
      return "today";
    } else if (daysDifference === -1) {
      return "yesterday";
    } else if (daysDifference === 1) {
      return "tomorrow";
    } else if (daysDifference === 2) {
      return "in 2 days";
    }

    return formatDistanceToNow(dueDate, { addSuffix: true });
  }

  colorByDueDate(dueDate) {
    const daysDifference = getDayDiff(new Date(), dueDate);

    if (daysDifference < 0) {
      return "rgb(220, 50, 47)";
    } else if (daysDifference < 2) {
      return "rgb(181, 137, 0)";
    }

    return "inherit";
  }
}
