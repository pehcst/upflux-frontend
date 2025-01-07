import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../types/user.type';
import { NgZorroModule } from '../../../../shared/ng-zorro/ng-zorro.module';
import { SharedModule } from '../../../../shared/shared/shared.module';

@Component({
  selector: 'app-user-list-update',
  templateUrl: './user-list-update.component.html',
  styleUrls: ['./user-list-update.component.scss'],
  imports: [NgZorroModule, SharedModule],
})
export class UserListUpdateComponent implements OnInit, OnChanges {
  @Input() user!: User;
  @Input() isVisible: boolean = false;
  @Input() isLoading: boolean = false;

  @Output() onCancel = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<void>();

  editForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(): void {
    if (this.user) {
      this.editForm.patchValue(this.user);
    }
  }

  initForm() {
    this.editForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  handleCancel() {
    this.onCancel.emit();
    this.resetForm();
  }

  async handleUpdate() {
    if (this.editForm.valid) {
      this.onSave.emit(this.editForm.value);
    }
  }

  resetForm() {
    this.editForm.reset();
  }
}
