import { ProjectController, TodoController } from "../controllers";
import {
  ProjectListView,
  ProjectDetailView,
  TodoDetailView,
  NewProjectView,
  NewTodoView,
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

    this.todoController.addTodo(
      "Beep",
      "Gotta beep",
      new Date("10-18-2025"),
      "High"
    );
    let todo = this.todoController.get(1);
    this.projectController.addTodo(1, todo);

    this.todoController.addTodo(
      "Beep again",
      "Gotta beep again",
      new Date("10-19-2025"),
      "High"
    );
    todo = this.todoController.get(2);
    this.projectController.addTodo(1, todo);

    this.todoController.addTodo(
      "Beep once more",
      "Never enough beep",
      new Date("10-20-2025"),
      "High"
    );
    todo = this.todoController.get(3);
    this.projectController.addTodo(2, todo);

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

    this.newTodoModal = new NewTodoView(appContainer, this.projectController);
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
  }
}
