export class TodoOptionsView {
  constructor(appContainer) {
    this.parentContainer = appContainer;
    this.container = document.createElement("dialog");
    this.container.classList.add("todo-options");
    this.isOpen = false;

    this.container.addEventListener("close", () => {
      this.isOpen = false;
    });

    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  render(button) {
    this.parentContainer.appendChild(this.container);
    this.container.replaceChildren();

    this.positionNearButton(button);

    const viewDetailsButton = document.createElement("button");
    this.container.appendChild(viewDetailsButton);
    viewDetailsButton.textContent = "Edit";
    viewDetailsButton.addEventListener("click", () => {
      const event = new CustomEvent("todoEditRequested");
      document.dispatchEvent(event);
      this.container.close();
    });

    const deleteTodoButton = document.createElement("button");
    this.container.appendChild(deleteTodoButton);
    deleteTodoButton.textContent = "Delete";
    deleteTodoButton.addEventListener("click", () => {
      const event = new CustomEvent("todoDeletionRequested");
      document.dispatchEvent(event);
      this.container.close();
    });

    this.container.showModal();
    this.isOpen = true;

    setTimeout(() => {
      document.addEventListener("click", this.handleOutsideClick);
    }, 0);
  }

  positionNearButton(button) {
    const buttonRect = button.getBoundingClientRect();
    this.container.style.position = "fixed";
    this.container.style.margin = "0";

    this.container.style.left = `${buttonRect.left - 120}px`;
    this.container.style.top = `${buttonRect.top}px`;

    this.adjustForViewport();
  }

  adjustForViewport() {
    const rect = this.container.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (rect.right > viewportWidth) {
      this.container.style.left = `${viewportWidth - rect.width - 10}px`;
    }

    if (rect.bottom > viewportHeight) {
      this.container.style.top = `${viewportHeight - rect.height - 10}px`;
    }
  }

  handleOutsideClick(event) {
    event.stopPropagation();
    if (!this.isOpen) {
      return;
    }

    if (event.target === this.container) {
      this.close();
    }
  }

  close() {
    if (!this.isOpen) {
      return;
    }

    this.container.close();
    this.isOpen = false;
    document.removeEventListener("click", this.handleOutsideClick);
  }
}
