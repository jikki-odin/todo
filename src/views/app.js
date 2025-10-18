import { ProjectController, TodoController } from "../controllers";
import {
  ProjectListView,
  ProjectDetailView,
  TodoDetailView,
  NewProjectView,
} from ".";

export class AppView {
  constructor(appContainer) {
    this.projectController = new ProjectController();
    this.todoController = new TodoController();

    this.projectController.addProject(
      "Test 1",
      "The first placeholder project"
    );
    this.projectController.addProject(
      "Test 2",
      "The second placeholder project"
    );

    // TODO: add views for new project/new todo modals
    this.projectList = new ProjectListView(
      appContainer,
      this.projectController
    );
    this.projectDetails = new ProjectDetailView(
      appContainer,
      this.projectController,
      this.todoController
    );
    this.todoDetails = new TodoDetailView(appContainer, this.todoController);
    this.newProjectModal = new NewProjectView(
      appContainer,
      this.projectController
    );
    this.registerEventHandlers();
  }

  render() {
    // TODO: handle static content here (e.g. nav bar)
    this.projectList.render();
    // this.projectDetails.render();
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
      this.projectController.addProject(title, description);
      this.render();
    });
  }
}
