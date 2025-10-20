export class Todo {
  constructor(id, title, description, dueDate, priority, isComplete = false) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = Todo.createDateOnly(dueDate);
    this.priority = priority;
    this.isComplete = isComplete;
  }

  static createDateOnly(dateInput) {
    if (typeof dateInput === "string") {
      const [year, month, day] = dateInput.split("-").map(Number);
      return new Date(year, month - 1, day);
    }

    const date = new Date(dateInput);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  update(title, description, dueDate, priority) {
    if (title != this.title) {
      this.title = title;
    }
    if (description != this.description) {
      this.description = description;
    }
    if (dueDate != this.dueDate) {
      this.dueDate = Todo.createDateOnly(dueDate);
    }
    if (priority != this.priority) {
      this.priority = priority;
    }
  }

  toggleCompletion() {
    this.isComplete = !this.isComplete;
  }
}
