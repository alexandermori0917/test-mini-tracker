import { Component, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { CSS_CLASSES } from "../../../../shared/constants";

@Component({
  selector: "app-task-header",
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="task-header">
      <div class="header-content">
        <h1 class="header-title">Task Tracker</h1>
        <p class="header-subtitle">Manage your tasks efficiently</p>
      </div>

      <div class="header-actions">
        <p-button
          label="Add New Task"
          icon="pi pi-plus"
          (onClick)="onAddTask()"
          [styleClass]="CSS_CLASSES.BUTTONS.SUCCESS"
          size="large"
        >
        </p-button>
      </div>
    </div>
  `,
  styles: [
    `
      .task-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding: 1.5rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
        color: white;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      }

      .header-content {
        flex: 1;
      }

      .header-title {
        margin: 0 0 0.5rem 0;
        font-size: 2rem;
        font-weight: 700;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .header-subtitle {
        margin: 0;
        font-size: 1rem;
        opacity: 0.9;
        font-weight: 300;
      }

      .header-actions {
        flex-shrink: 0;
      }

      @media (max-width: 768px) {
        .task-header {
          flex-direction: column;
          text-align: center;
          gap: 1rem;
        }

        .header-title {
          font-size: 1.5rem;
        }
      }
    `,
  ],
})
export class TaskHeaderComponent {
  @Output() addTask = new EventEmitter<void>();

  readonly CSS_CLASSES = CSS_CLASSES;

  onAddTask(): void {
    this.addTask.emit();
  }
}
