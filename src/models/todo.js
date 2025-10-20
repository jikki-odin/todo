export class Todo {
  constructor(id, title, description, dueDate, priority, isComplete = false) {
    this.id = id;
    this.title = title;
    this.description = description;
    // TODO: check localization handling
    this.dueDate = new Date(dueDate);
    this.priority = priority;
    this.isComplete = isComplete;
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
