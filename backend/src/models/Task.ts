import { v4 as uuidv4 } from "uuid";
import { Task as ITask, UpdateTaskRequest } from "../types";

export class Task implements ITask {
  public readonly id: string;
  public title: string;
  public completed: boolean;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(title: string, completed: boolean = false) {
    this.id = uuidv4();
    this.title = title;
    this.completed = completed;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  public update(updates: UpdateTaskRequest): Task {
    if (updates.title !== undefined) {
      this.title = updates.title;
    }
    if (updates.completed !== undefined) {
      this.completed = updates.completed;
    }
    this.updatedAt = new Date();
    return this;
  }

  public toJSON(): ITask {
    return {
      id: this.id,
      title: this.title,
      completed: this.completed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
