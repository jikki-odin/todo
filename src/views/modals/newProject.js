import closeCircle from "../../public/icons/close-circle.svg";

export class NewProjectView {
  constructor(appContainer, projectController) {
    this.container = document.createElement("dialog");
    this.container.classList.add("modal");
    appContainer.appendChild(this.container);
    this.projectController = projectController;
  }

  render() {
    const modal = this.container;
    modal.replaceChildren();
    const header = document.createElement("div");
    header.classList.add("modal-header");
    modal.appendChild(header);

    const headerText = document.createElement("h2");
    header.appendChild(headerText);
    headerText.textContent = "New Project";

    const closeButton = document.createElement("img");
    header.appendChild(closeButton);
    closeButton.src = closeCircle;
    closeButton.addEventListener("click", () => {
      newProjectForm.reset();
      modal.close();
    });

    const newProjectForm = document.createElement("form");
    modal.appendChild(newProjectForm);
    newProjectForm.setAttribute("method", "post");

    const titleElement = document.createElement("div");
    titleElement.classList.add("form-element");
    newProjectForm.appendChild(titleElement);

    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title");
    titleElement.appendChild(titleLabel);

    const titleInput = document.createElement("input");
    titleElement.appendChild(titleInput);
    titleInput.id = "title";
    titleInput.name = "title";
    titleInput.placeholder = "My New Project";
    titleInput.required = true;
    titleInput.type = "text";

    const descriptionElement = document.createElement("div");
    descriptionElement.classList.add("form-element");
    newProjectForm.appendChild(descriptionElement);

    const descriptionLabel = document.createElement("label");
    descriptionLabel.setAttribute("for", "description");
    descriptionElement.appendChild(descriptionLabel);

    const descriptionInput = document.createElement("input");
    descriptionElement.appendChild(descriptionInput);
    descriptionInput.id = "description";
    descriptionInput.name = "description";
    descriptionInput.placeholder = "An engaging, succinct description...";
    descriptionInput.required = true;
    descriptionInput.type = "text";

    const buttonElement = document.createElement("div");
    buttonElement.classList.add("form-buttons");
    newProjectForm.appendChild(buttonElement);

    const cancelButton = document.createElement("button");
    buttonElement.appendChild(cancelButton);
    cancelButton.type = "reset";
    cancelButton.textContent = "Cancel";

    cancelButton.addEventListener("click", () => {
      newProjectForm.reset();
      modal.close();
    });

    const submitButton = document.createElement("button");
    buttonElement.appendChild(submitButton);
    submitButton.type = "submit";
    submitButton.formMethod = "dialog";
    submitButton.textContent = "Create";

    newProjectForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(newProjectForm);
      const projectData = Object.fromEntries(formData.entries());

      const createdEvent = new CustomEvent("projectCreated", {
        detail: {
          ...projectData,
        },
      });
      document.dispatchEvent(createdEvent);

      newProjectForm.reset();
      modal.close();
    });

    modal.showModal();
  }
}
