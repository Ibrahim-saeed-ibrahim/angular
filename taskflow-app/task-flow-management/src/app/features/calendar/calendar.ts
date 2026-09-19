import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../tasks/services/task.service';
import { Task } from '../tasks/models/task.model';

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

    
  getTasksForDay(dayNumber: number): Task[] {
    return this.taskservice.tasksSignal().filter(task => {
      if (!task.dueDate) return false;

      
      const parts = task.dueDate.split('-'); 
      if (parts.length < 3) return false;

      const taskDay = parseInt(parts[2], 10); 
      return taskDay === dayNumber;
    });
  }
}