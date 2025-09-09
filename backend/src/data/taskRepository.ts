import { Task } from "../models/Task";
import { Task as ITask, CreateTaskRequest, UpdateTaskRequest } from "../types";

export class TaskRepository {
  private tasks: Task[];

  constructor() {
    // In-memory storage (in production, this would be a database)
    this.tasks = [
      new Task("Sample Task 1", false),
      new Task("Sample Task 2", true),
    ];
  }

  public async findAll(): Promise<ITask[]> {
    return this.tasks.map((task) => task.toJSON());
  }

  public async findById(id: string): Promise<ITask | null> {
    const task = this.tasks.find((task) => task.id === id);
    return task ? task.toJSON() : null;
  }

  public async create(taskData: CreateTaskRequest): Promise<ITask> {
    const task = new Task(taskData.title, taskData.completed);
    this.tasks.push(task);
    return task.toJSON();
  }

  public async update(
    id: string,
    updates: UpdateTaskRequest
  ): Promise<ITask | null> {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return null;
    }

    const updatedTask = this.tasks[taskIndex]?.update(updates);
    if (!updatedTask) {
      return null;
    }
    return updatedTask.toJSON();
  }

  public async delete(id: string): Promise<boolean> {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return false;
    }

    this.tasks.splice(taskIndex, 1);
    return true;
  }

  public async exists(id: string): Promise<boolean> {
    return this.tasks.some((task) => task.id === id);
  }
}

export const taskRepository = new TaskRepository();
