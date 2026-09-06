import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Roles } from '../../../shared/models/user.model';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,DragDropModule,FormsModule], 
  templateUrl: './task-list.component.html', 
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  public authService = inject(AuthService);
  
  private router = inject(Router);
  public taskService = inject(TaskService);
  tasks = this.taskService.filteredTasks;
  public isAdmin = computed(() => this.authService.currentUser()?.role === Roles.ADMIN);
  isModalOpen = signal<boolean>(false);
  newTaskName = signal<string>('');
  newTaskdescription = signal<string>('');
  editingTaskId = signal<number | null>(null);
  newTaskStatus = signal<'To Do' | 'In Progress' | 'Done'>('To Do');
  tasksSignal = this.taskService.tasksSignal;
  filterStatus = signal<'ALL' | 'COMPLETED' | 'PENDING'>('ALL');
  filteredTasks = computed(() => {
    const tasks = this.taskService.tasksSignal();
    const status = this.filterStatus();
    if (status === 'PENDING') { return tasks.filter(t => t.status !== 'Done'); }
    if (status === 'COMPLETED') { return tasks.filter(t => t.status === 'Done'); }
    return tasks;
  });
  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }
  openModal(){
    this.isModalOpen.set(true);
  }
  closeModal(){
    this.isModalOpen.set(false);
    this.newTaskName.set('');
    this.newTaskStatus.set('To Do');
    this.newTaskdescription.set('');
    this.editingTaskId.set(null);
  }
  
submitTask() {
  if (!this.newTaskName().trim()) return;

  const currentId = this.editingTaskId();

  if (currentId !== null) {
    
    this.taskService.updateTask({
      id: currentId,
      name: this.newTaskName(),
      status: this.newTaskStatus(),
      description: this.newTaskdescription()
    });
  } else {
   
    this.taskService.addTask({
      name: this.newTaskName(),
      status: this.newTaskStatus(),
      description: this.newTaskdescription()
    });
  }

  this.closeModal();
}
  openEditModal(task: Task) {
  this.editingTaskId.set(task.id);
  this.newTaskName.set(task.name);
  this.newTaskStatus.set(task.status);
  this.newTaskdescription.set(task.description || '');
  this.isModalOpen.set(true);
}
  onDrop(event: CdkDragDrop<Task[]>, newStatus: 'To Do' | 'In Progress' | 'Done') {
  if (event.previousContainer === event.container) {
    
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    
    const task = event.previousContainer.data[event.previousIndex];
    task.status = newStatus;
    this.tasksSignal.update(tasks => [...tasks]);
  }
}
  onLogout() {
  this.authService.logout();
  this.router.navigate(['/login']);
}
}