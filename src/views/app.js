import { ProjectController, TodoController } from "../controllers";
import {
  ProjectListView,
  ProjectDetailView,
  TodoDetailView,
  TodoOptionsView,
  NewProjectView,
  NewTodoView,
} from ".";

export class AppView {
  constructor(appContainer) {
    this.container = appContainer;
    this.projectController = new ProjectController();
    this.todoController = new TodoController();

    // TODO: seed the Inbox project

    this.projectList = new ProjectListView(
      appContainer,
      this.projectController
    );
    this.projectDetails = new ProjectDetailView(
      appContainer,
      this.projectController,
      this.todoController
    );
    this.todoDetails = new TodoDetailView(
      appContainer,
      this.todoController,
      this.projectController
    );
    this.newProjectModal = new NewProjectView(
      appContainer,
      this.projectController
    );

    this.newTodoModal = new NewTodoView(appContainer, this.projectController);
    this.todoOptionsModal = new TodoOptionsView(appContainer);
    this.registerEventHandlers();
  }

  render() {
    // TODO: handle static content here (e.g. nav bar)
    this.projectList.render();
    this.projectDetails.render();
    // this.todoDetails.render();
  }

  registerEventHandlers() {
    document.addEventListener("projectSelected", (event) => {
      const { projectId: id } = event.detail;
      console.log(`Project ${id} selected`);
      this.projectController.selectProject(id);
      this.projectDetails.render();
    });

    document.addEventListener("newProjectRequested", () => {
      this.newProjectModal.render();
    });

    document.addEventListener("projectCreated", (event) => {
      const { title, description } = event.detail;
      console.log(`Creating new project: ${title} (${description})...`);
      const project = this.projectController.addProject(title, description);
      this.projectController.selectProject(project.id);
      this.render();
    });

    document.addEventListener("todoSelected", (event) => {
      const { id } = event.detail;
      console.log(`Todo ${id} selected`);
      this.todoController.selectTodo(id);
      this.todoOptionsModal.render();
    });

    document.addEventListener("newTodoRequested", () => {
      this.newTodoModal.render();
    });

    document.addEventListener("todoCreated", (event) => {
      const { title, description, dueDate, priority, projectId } = event.detail;
      const todo = this.todoController.addTodo(
        title,
        description,
        dueDate,
        priority
      );
      this.projectController.addTodo(projectId, todo);
      this.projectDetails.render();
    });

    document.addEventListener("todoDetailsRequested", () => {
      console.log(
        `Details requested for todo ${this.todoController.selectedTodo.id}...`
      );
      this.todoDetails.render();
    });

    document.addEventListener("todoDeletionRequested", () => {
      console.log(
        `Deletion requested for todo ${this.todoController.selectedTodo.id}...`
      );
      // this.todoDetails.render();
    });

    document.addEventListener("todoUpdated", (event) => {
      const { id, title, description, dueDate, priority, projectId } =
        event.detail;
      this.todoController.updateTodo(id, title, description, dueDate, priority);
      this.render();
    });
  }
}
