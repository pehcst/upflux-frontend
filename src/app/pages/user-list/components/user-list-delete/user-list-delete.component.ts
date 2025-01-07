import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { NgZorroModule } from '../../../../shared/ng-zorro/ng-zorro.module';
import { SharedModule } from '../../../../shared/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-user-list-delete',
  templateUrl: './user-list-delete.component.html',
  styleUrls: ['./user-list-delete.component.scss'],
  imports: [NgZorroModule, SharedModule, ReactiveFormsModule, NzModalModule],
})
export class UserListDeleteComponent {
  @Input() user: any;
  @Input() isLoading: boolean = false;
  @Input() isVisible: boolean = false;
  @Output() onCancel = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<void>();

  constructor() {}

  async handleDeleteUser() {
    this.onConfirm.emit();
  }

  handleCancel() {
    this.onCancel.emit();
  }
}
