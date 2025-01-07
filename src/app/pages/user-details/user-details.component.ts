import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgZorroModule } from '../../shared/ng-zorro/ng-zorro.module';
import { SharedModule } from '../../shared/shared/shared.module';
import { User } from '../../types/user.type';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  standalone: true,
  imports: [NgZorroModule, SharedModule],
})
export class UserDetailsComponent implements OnInit {
  user!: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    this.loadUser(userId);
  }

  async loadUser(userId: number) {
    try {
      const data = await this.userService.getUserById(userId);
      this.user = data.data;
    } catch (error) {
      console.error('Erro ao carregar detalhes do usuário:', error);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
