export class Todo {
  constructor(id, title, description, dueDate, priority) {
    this.id = id;
    this.title = title;
    this.description = description;
    // TODO: double-check date formatting
    this.dueDate = new Date(dueDate);
    this.priority = priority;
    this.isComplete = false;
  }

  update(title, description, dueDate, priority) {
    if (title != this.title) {
      this.title = title;
    }
    if (description != this.description) {
      this.description = description;
    }
    if (dueDate != this.dueDate) {
      this.dueDate = dueDate;
    }
    if (priority != this.priority) {
      this.priority = priority;
    }
  }

  toggleCompletion() {
    this.isComplete = !this.isComplete;
  }
}
