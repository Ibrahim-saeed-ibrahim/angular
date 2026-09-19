import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../tasks/services/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  private taskservive = inject(TaskService);
  totaltasks = computed(()=>this.taskservive.tasksSignal().length);
  todocount = computed(()=>this.taskservive.tasksSignal().filter(t=>t.status==='To Do').length);
  inprogcount = computed(()=>this.taskservive.tasksSignal().filter(t=>t.status==='In Progress').length);
  donecount = computed(()=>this.taskservive.tasksSignal().filter(t=>t.status==='Done').length);


}
