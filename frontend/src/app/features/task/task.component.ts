import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subject, takeUntil } from "rxjs";
import { TaskHeaderComponent } from "./components/task-header/task-header.component";
import { TaskTableComponent } from "./components/task-table/task-table.component";
import { TaskDialogComponent } from "./components/task-dialog/task-dialog.component";
import { Task, CreateTaskRequest, AppError } from "../../shared/types";
import { TaskService } from "../../core/services/task.service";
import { NotificationService } from "../../core/services/notification.service";
import { MESSAGES } from "../../shared/constants";

@Component({
  selector: "app-task",
  standalone: true,
  imports: [
    CommonModule,
    TaskHeaderComponent,
    TaskTableComponent,
    TaskDialogComponent,
  ],
  template: `
    <div class="task-container">
      <app-task-header (addTask)="showAddTaskDialog()"></app-task-header>

      <app-task-table
        [tasks]="tasks"
        [loading]="loading"
        (toggleStatus)="toggleTaskStatus($event)"
        (deleteTask)="deleteTask($event)"
      >
      </app-task-table>

      <app-task-dialog
        [(visible)]="dialogVisible"
        [loading]="dialogLoading"
        (taskSubmit)="createTask($event)"
      >
      </app-task-dialog>
    </div>
  `,
  styles: [
    `
      .task-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }
    `,
  ],
})
export class TaskComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  loading: boolean = false;
  dialogVisible: boolean = false;
  dialogLoading: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(
    private taskService: TaskService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTasks(): void {
    this.loading = true;
    this.taskService
      .getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (tasks) => {
          this.tasks = tasks;
          this.loading = false;
        },
        error: (error: AppError) => {
          this.loading = false;
          this.notificationService.showError(
            "Error",
            error.message || MESSAGES.ERROR.LOAD_TASKS
          );
        },
      });
  }

  showAddTaskDialog(): void {
    this.dialogVisible = true;
  }

  createTask(taskData: CreateTaskRequest): void {
    this.dialogLoading = true;
    this.taskService
      .createTask(taskData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (newTask) => {
          this.tasks.push(newTask);
          this.dialogVisible = false;
          this.dialogLoading = false;
          this.notificationService.showSuccess(
            "Success",
            MESSAGES.SUCCESS.TASK_CREATED
          );
        },
        error: (error: AppError) => {
          this.dialogLoading = false;
          this.notificationService.showError(
            "Error",
            error.message || MESSAGES.ERROR.CREATE_TASK
          );
        },
      });
  }

  toggleTaskStatus(task: Task): void {
    const updatedTask = { ...task, completed: !task.completed };

    this.taskService
      .updateTask(task.id, { completed: updatedTask.completed })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          const index = this.tasks.findIndex((t) => t.id === task.id);
          if (index !== -1) {
            this.tasks[index] = result;
          }
          this.notificationService.showSuccess(
            "Success",
            MESSAGES.SUCCESS.TASK_UPDATED
          );
        },
        error: (error: AppError) => {
          // Revert the checkbox state on error
          task.completed = !task.completed;
          this.notificationService.showError(
            "Error",
            error.message || MESSAGES.ERROR.UPDATE_TASK
          );
        },
      });
  }

  deleteTask(taskId: string): void {
    if (confirm(MESSAGES.CONFIRM.DELETE_TASK)) {
      this.taskService
        .deleteTask(taskId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.tasks = this.tasks.filter((task) => task.id !== taskId);
            this.notificationService.showSuccess(
              "Success",
              MESSAGES.SUCCESS.TASK_DELETED
            );
          },
          error: (error: AppError) => {
            this.notificationService.showError(
              "Error",
              error.message || MESSAGES.ERROR.DELETE_TASK
            );
          },
        });
    }
  }
}
