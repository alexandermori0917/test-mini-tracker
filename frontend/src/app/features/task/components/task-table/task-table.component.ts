import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { TooltipModule } from "primeng/tooltip";
import { Task, TableColumn } from "../../../../shared/types";
import { CSS_CLASSES, TASK_STATUS } from "../../../../shared/constants";

@Component({
  selector: "app-task-table",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    CheckboxModule,
    TooltipModule,
  ],
  template: `
    <div class="task-table">
      <p-table
        [value]="tasks"
        [tableStyle]="{ 'min-width': '50rem' }"
        [loading]="loading"
        [paginator]="false"
        [scrollable]="false"
      >
        <ng-template pTemplate="header">
          <tr>
            <th *ngFor="let col of columns" [style.width]="col.width">
              {{ col.header }}
            </th>
          </tr>
        </ng-template>

        <ng-template pTemplate="body" let-task>
          <tr>
            <td>{{ task.id }}</td>
            <td>{{ task.title }}</td>
            <td>
              <span [class]="getStatusClass(task.completed)">
                {{ getStatusText(task.completed) }}
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <p-checkbox
                  [ngModel]="task.completed"
                  (onChange)="onToggleStatus(task)"
                  [binary]="true"
                  [disabled]="loading"
                >
                </p-checkbox>
                <p-button
                  icon="pi pi-trash"
                  [styleClass]="
                    CSS_CLASSES.BUTTONS.DANGER + ' ' + CSS_CLASSES.BUTTONS.TEXT
                  "
                  (onClick)="onDeleteTask(task.id)"
                  [disabled]="loading"
                  pTooltip="Delete task"
                  tooltipPosition="top"
                >
                </p-button>
              </div>
            </td>
          </tr>
        </ng-template>

        <ng-template pTemplate="emptymessage">
          <tr>
            <td [attr.colspan]="columns.length" class="text-center">
              No tasks found
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
  styles: [
    `
      .task-table {
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }

      .action-buttons {
        display: flex;
        gap: 10px;
        align-items: center;
      }

      .status-completed {
        color: #28a745;
        font-weight: bold;
      }

      .status-pending {
        color: #ffc107;
        font-weight: bold;
      }

      .text-center {
        text-align: center;
        padding: 2rem;
        color: #6c757d;
      }
    `,
  ],
})
export class TaskTableComponent {
  @Input() tasks: Task[] = [];
  @Input() loading: boolean = false;
  @Output() toggleStatus = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<string>();

  readonly CSS_CLASSES = CSS_CLASSES;

  columns: TableColumn[] = [
    { field: "id", header: "ID", width: "200px" },
    { field: "title", header: "Title", width: "auto" },
    { field: "status", header: "Status", width: "120px" },
    { field: "actions", header: "Actions", width: "150px" },
  ];

  getStatusClass(completed: boolean): string {
    return completed
      ? CSS_CLASSES.STATUS.COMPLETED
      : CSS_CLASSES.STATUS.PENDING;
  }

  getStatusText(completed: boolean): string {
    return completed ? TASK_STATUS.COMPLETED : TASK_STATUS.PENDING;
  }

  onToggleStatus(task: Task): void {
    this.toggleStatus.emit(task);
  }

  onDeleteTask(taskId: string): void {
    this.deleteTask.emit(taskId);
  }
}
