import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../tasks/services/task.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar {
  private taskservice = inject(TaskService);
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days = Array.from({ length: 30 }, (_, i) => i + 1);
  tasks = computed(() => this.taskservice.tasksSignal());
}
