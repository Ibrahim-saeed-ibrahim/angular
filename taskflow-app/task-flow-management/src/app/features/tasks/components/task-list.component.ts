import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { User, Roles } from '../../../core/models/user.model';
import { CommonModule } from '@angular/common';
import { TaskFilterService } from '../../../core/services/task-filter.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, DragDropModule, FormsModule], 
  templateUrl: './task-list.component.html', 
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  public authService = inject(AuthService);
  private router = inject(Router);
  public taskService = inject(TaskService);
  private filterService = inject(TaskFilterService);

  
  isModalOpen = signal<boolean>(false);
  newTaskName = signal<string>('');
  newTaskdescription = signal<string>('');
  newTaskStatus = signal<'To Do' | 'In Progress' | 'Done'>('To Do');
  dueDate = signal<string>(''); 
  editingTaskId = signal<number | null>(null);

  public isAdmin = computed(() => this.authService.currentUser()?.role === Roles.ADMIN);
  filterStatus = signal<'ALL' | 'COMPLETED' | 'PENDING'>('ALL');
  
  isUserFilterOpen = false;
  users: User[] = [
    { id: 1, username: 'admin', email: 'admin@taskflow.com', role: Roles.ADMIN },
    { id: 2, username: 'ibrahim', email: 'ibrahim@taskflow.com', role: Roles.ADMIN },
    { id: 3, username: 'ahmed', email: 'ahmed@taskflow.com', role: Roles.REQUESTER_REGULAR },
    { id: 4, username: 'user', email: 'user@taskflow.com', role: Roles.REQUESTER_REGULAR }
  ];

  toggleUserFilter() {
    this.isUserFilterOpen = !this.isUserFilterOpen;
  }

  selectUser(userId: number | null) {
    this.taskService.setSelectedUser(userId);
    this.isUserFilterOpen = false; 
  }

  filteredTasks = computed(() => {
    const tasks = this.taskService.tasksSignal();
    const status = this.filterStatus();
    const query = this.filterService.searchQuery().toLowerCase().trim();

    return tasks.filter(task => {
      const matchesStatus = 
        status === 'ALL' ? true :
        status === 'COMPLETED' ? task.status === 'Done' :
        task.status !== 'Done'; 

      const matchesQuery = !query || 
        task.name.toLowerCase().includes(query) || 
        (task.description && task.description.toLowerCase().includes(query));

      return matchesStatus && matchesQuery;
    });
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
    this.dueDate.set('');
    this.editingTaskId.set(null);
  }

  submitTask() {
    if (!this.newTaskName().trim()) return;
    const currentId = this.editingTaskId();
    const currentUserId = this.authService.currentUser()?.id ?? null;

    if (currentId !== null) {
      this.taskService.updateTask({
        id: currentId,
        name: this.newTaskName(),
        status: this.newTaskStatus(),
        description: this.newTaskdescription(),
        dueDate: this.dueDate(), 
        assignedUserId: currentUserId
      });
    } else {
      this.taskService.addTask({
        name: this.newTaskName(),
        status: this.newTaskStatus(),
        description: this.newTaskdescription(),
        dueDate: this.dueDate(), 
        assignedUserId: currentUserId
      });
    }

    this.closeModal();
  }

  openEditModal(task: Task) {
    this.editingTaskId.set(task.id);
    this.newTaskName.set(task.name);
    this.newTaskStatus.set(task.status);
    this.newTaskdescription.set(task.description || '');
    this.dueDate.set(task.dueDate || ''); 
    this.isModalOpen.set(true);
  }

  onDrop(event: CdkDragDrop<Task[]>, newStatus: 'To Do' | 'In Progress' | 'Done') {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      task.status = newStatus;
      this.taskService.updateTask(task); 
    }
  }
}