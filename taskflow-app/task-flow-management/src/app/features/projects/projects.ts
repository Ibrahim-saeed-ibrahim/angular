import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../tasks/services/task.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  private taskService = inject(TaskService);
  projects = [
    { id: 1, name: 'Smart Home Reception System', description: 'Embedded & IoT automation project' },
    { id: 2, name: 'Security Audit', description: 'Network security & firewall setup' },
    { id: 3, name: 'Web Platform', description: 'Angular Standalone dashboard development' }
  ];
  getTaskCount(): number {
    return this.taskService.tasksSignal().length;
  }

}
