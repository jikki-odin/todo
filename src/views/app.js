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
  constructor(appContainer, projectController, todoController) {
    this.container = appContainer;
    this.projectController = projectController;
    this.todoController = todoController;

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
    // TODO: handle static content here (e.g. nav bar) - add a layer higher
    // so modals don't get removed
    this.projectList.render();
    this.projectDetails.render();
  }

  registerEventHandlers() {
    document.addEventListener("projectSelected", (event) => {
      const { projectId: id } = event.detail;
      this.projectController.selectProject(id);
      this.projectDetails.render();
    });

    document.addEventListener("newProjectRequested", () => {
      this.newProjectModal.render();
    });

    document.addEventListener("projectCreated", (event) => {
      const { title, description } = event.detail;
      const project = this.projectController.addProject(title, description);
      this.projectController.selectProject(project.id);
      this.render();
    });

    document.addEventListener("projectDeletionRequested", (event) => {
      const { id } = event.detail;
      const todosToDelete = this.projectController.getTodos(id);

      for (const [todoId, _] of todosToDelete) {
        this.todoController.removeTodo(todoId);
      }

      this.projectController.removeProject(id);
      this.projectController.selectProject(1);
      this.render();
    });

    document.addEventListener("todoSelected", (event) => {
      const { id, button } = event.detail;
      this.todoController.selectTodo(id);
      this.todoOptionsModal.render(button);
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
      this.todoDetails.render();
    });

    document.addEventListener("todoDeletionRequested", () => {
      const projectId = this.projectController.selectedProject.id;
      const todoId = this.todoController.selectedTodo.id;
      this.projectController.removeTodo(projectId, todoId);
      this.todoController.removeTodo(todoId);
      this.render();
    });

    document.addEventListener("todoUpdated", (event) => {
      const { id, title, description, dueDate, priority, projectId } =
        event.detail;
      const oldProjectId = this.projectController.selectedProject.id;
      if (projectId !== oldProjectId) {
        this.projectController.moveTodo(id, oldProjectId, projectId);
      }
      this.todoController.updateTodo(id, title, description, dueDate, priority);
      this.projectController.saveToStorage();
      this.render();
    });
  }
}
