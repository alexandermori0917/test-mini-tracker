import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { CreateTaskRequest, DialogConfig } from "../../../../shared/types";
import { UI_CONSTANTS, MESSAGES, CSS_CLASSES } from "../../../../shared/constants";
import { ValidationUtil } from "../../../../shared/utils/validation.util";

@Component({
  selector: "app-task-dialog",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
  ],
  template: `
    <p-dialog
      [header]="config.header"
      [(visible)]="visible"
      [modal]="config.modal"
      [style]="{ width: config.width }"
      [closable]="config.closable"
      [draggable]="false"
      [resizable]="false"
      (onHide)="onDialogHide()"
    >
      <form [formGroup]="taskForm" (ngSubmit)="onSubmit()">
        <div class="p-fluid">
          <div class="p-field">
            <label for="taskTitle">Task Title *</label>
            <input
              id="taskTitle"
              type="text"
              pInputText
              formControlName="title"
              [placeholder]="MESSAGES.PLACEHOLDERS.TASK_TITLE"
              [class.ng-invalid]="
                taskForm.get('title')?.invalid && taskForm.get('title')?.touched
              "
              autocomplete="off"
            />

            <small
              *ngIf="
                taskForm.get('title')?.invalid && taskForm.get('title')?.touched
              "
              class="p-error"
            >
              {{ getTitleErrorMessage() }}
            </small>
          </div>
        </div>
      </form>

      <ng-template pTemplate="footer">
        <div class="dialog-footer">
          <p-button
            label="Cancel"
            icon="pi pi-times"
            (onClick)="onCancel()"
            [styleClass]="CSS_CLASSES.BUTTONS.TEXT"
            [disabled]="loading"
          >
          </p-button>
          <p-button
            label="Create"
            icon="pi pi-check"
            (onClick)="onSubmit()"
            [styleClass]="CSS_CLASSES.BUTTONS.SUCCESS"
            [loading]="loading"
            [disabled]="taskForm.invalid"
          >
          </p-button>
        </div>
      </ng-template>
    </p-dialog>
  `,
  styles: [
    `
      .p-field {
        margin-bottom: 1rem;
      }

      .p-field label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }

      .dialog-footer {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
      }

      .p-error {
        color: #e24c4c;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
      }
    `,
  ],
})
export class TaskDialogComponent implements OnInit, OnDestroy {
  @Input() visible: boolean = false;
  @Input() loading: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() taskSubmit = new EventEmitter<CreateTaskRequest>();

  readonly MESSAGES = MESSAGES;
  readonly CSS_CLASSES = CSS_CLASSES;

  taskForm: FormGroup;
  config: DialogConfig = {
    header: "Add New Task",
    width: UI_CONSTANTS.DIALOG_WIDTH,
    modal: true,
    closable: true,
  };

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: [
        "",
        [
          Validators.required,
          Validators.minLength(UI_CONSTANTS.MIN_TITLE_LENGTH),
          Validators.maxLength(UI_CONSTANTS.MAX_TITLE_LENGTH),
        ],
      ],
    });
  }

  ngOnInit(): void {
    // Reset form when dialog opens
    if (this.visible) {
      this.resetForm();
    }
  }

  ngOnDestroy(): void {
    this.taskForm.reset();
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const sanitizedTitle = ValidationUtil.sanitizeTaskTitle(formValue.title);

      const taskData: CreateTaskRequest = {
        title: sanitizedTitle,
        completed: false,
      };

      this.taskSubmit.emit(taskData);
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.closeDialog();
  }

  onDialogHide(): void {
    this.closeDialog();
  }

  private closeDialog(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.resetForm();
  }

  private resetForm(): void {
    this.taskForm.reset();
    this.taskForm.patchValue({
      title: "",
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.taskForm.controls).forEach((key) => {
      const control = this.taskForm.get(key);
      control?.markAsTouched();
    });
  }

  getTitleErrorMessage(): string {
    const control = this.taskForm.get("title");
    if (control?.errors?.["required"]) {
      return "Title is required";
    }
    if (control?.errors?.["minlength"]) {
      return `Title must be at least ${UI_CONSTANTS.MIN_TITLE_LENGTH} character long`;
    }
    if (control?.errors?.["maxlength"]) {
      return `Title cannot exceed ${UI_CONSTANTS.MAX_TITLE_LENGTH} characters`;
    }
    return "";
  }
}
