export class TodoOptionsView {
  constructor(appContainer) {
    this.parentContainer = appContainer;
    this.container = document.createElement("dialog");
  }

  render() {
    this.parentContainer.appendChild(this.container);
    this.container.replaceChildren();

    // TODO: figure out the show/hide functionality

    const viewDetailsButton = document.createElement("button");
    this.container.appendChild(viewDetailsButton);
    viewDetailsButton.textContent = "Details";
    viewDetailsButton.addEventListener("click", () => {
      const event = new CustomEvent("todoDetailsRequested");
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
  }
}
