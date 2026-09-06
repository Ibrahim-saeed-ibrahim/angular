import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, Router ,RouterLinkActive } from '@angular/router';
import { AuthService } from './shared/services/auth';
import { TaskService } from './features/tasks/services/task.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink,RouterLinkActive,FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public authService = inject(AuthService);
  private router = inject(Router);
  taskService = inject(TaskService);
  searchQuery = signal('');
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  onSearch(query: string) {
    this.searchQuery.set(query);
    this.taskService.setSearchQuery(query);
  }
  protected readonly title = signal('task-flow-management');
}
