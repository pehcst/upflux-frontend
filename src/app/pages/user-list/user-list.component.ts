import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgZorroModule } from '../../shared/ng-zorro/ng-zorro.module';
import { SharedModule } from '../../shared/shared/shared.module';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { UserListDeleteComponent } from './components/user-list-delete/user-list-delete.component';
import { UserListUpdateComponent } from './components/user-list-update/user-list-update.component';
import { User } from '../../types/user.type';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [
    NgZorroModule,
    SharedModule,
    UserListUpdateComponent,
    UserListDeleteComponent,
  ],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchText: string = '';

  isEditModalVisible = false;
  isDeleteModalVisible = false;
  isUpdating: boolean = false;
  isDeleting: boolean = false;

  public selectedUser!: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      const data = await this.userService.getAllUsers();
      this.users = data.data;
      this.filteredUsers = this.users;
    } catch (error) {
      this.message.error(
        'Erro ao carregar usuários. Por favor, tente novamente.'
      );
      console.error('Erro ao carregar usuários:', error);
    }
  }

  filterUsers() {
    const lowerSearchText = this.searchText.toLowerCase();
    this.filteredUsers = this.users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(lowerSearchText) ||
        user.last_name.toLowerCase().includes(lowerSearchText) ||
        user.email.toLowerCase().includes(lowerSearchText)
    );
  }

  viewDetails(userId: number) {
    this.router.navigate(['/user', userId]);
  }

  openEditModal(user: User) {
    this.selectedUser = { ...user };
    this.isEditModalVisible = true;
  }

  handleEditCancel() {
    this.isEditModalVisible = false;
  }

  async handleEditOk() {
    this.isUpdating = true;
    try {
      if (this.selectedUser) {
        await this.userService.updateUser(
          this.selectedUser.id,
          this.selectedUser
        );

        this.message.success('Usuário atualizado com sucesso.');
        this.isEditModalVisible = false;
        this.loadUsers();
      }
    } catch (error) {
      this.message.error(
        'Erro ao atualizar usuário. Por favor, tente novamente.'
      );
      console.error('Erro ao atualizar usuário:', error);
    } finally {
      this.isUpdating = false;
    }
  }

  openDeleteModal(userId: number) {
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      this.selectedUser = user;
      this.isDeleteModalVisible = true;
    }
  }

  handleDeleteCancel() {
    this.isDeleteModalVisible = false;
  }

  async handleDeleteOk() {
    try {
      this.isDeleting = true;
      if (this.selectedUser) {
        await this.userService.deleteUser(this.selectedUser.id);
        this.message.success('Usuário excluído com sucesso.');
        this.isDeleteModalVisible = false;
        this.loadUsers();
      }
    } catch (error) {
      this.message.error(
        'Erro ao excluir usuário. Por favor, tente novamente.'
      );
      console.error('Erro ao excluir usuário:', error);
    } finally {
      this.isDeleting = false;
    }
  }

  exportToPDF() {
    const doc = new jsPDF();

    const tableData = this.filteredUsers.map((user) => [
      user.id,
      `${user.first_name} ${user.last_name}`,
      user.email,
    ]);

    doc.text('Lista de Usuários', 14, 10);
    (doc as any).autoTable({
      head: [['ID', 'Nome Completo', 'E-mail']],
      body: tableData,
      startY: 20,
    });

    doc.save('usuarios.pdf');
    this.message.success('Exportação para PDF concluída com sucesso!');
  }

  exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.filteredUsers);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuários');
    XLSX.writeFile(workbook, 'lista_usuarios.xlsx');
    this.message.success('Exportação para Excel concluída com sucesso!');
  }
}
