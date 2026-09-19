import { Injectable, signal, computed, inject } from '@angular/core';
import { Task } from '../models/task.model';
import { AuthService } from '../../../core/services/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:3000/api/tasks';

 
  selectedUserId = signal<number | null>(null);
  searchQuery = signal<string>('');
  tasksSignal = signal<Task[]>([]);

  constructor() {
    this.loadTasks(); 
  }

 
  loadTasks(): void {
    this.http.get<Task[]>(this.apiUrl).subscribe({
      next: (tasks) => this.tasksSignal.set(tasks),
      error: (err) => console.error('Error loading tasks:', err)
    });
  }

  
  addTask(newTaskData: Omit<Task, 'id'>): void {
    this.http.post<Task>(this.apiUrl, newTaskData).subscribe({
      next: (createdTask) => {
        this.tasksSignal.update(tasks => [...tasks, createdTask]);
      },
      error: (err) => console.error('Error adding task:', err)
    });
  }

  
  updateTask(updatedTask: Task): void {
    if (!this.authService.isAdmin()) return;

    this.http.put<Task>(`${this.apiUrl}/${updatedTask.id}`, updatedTask).subscribe({
      next: (res) => {
        this.tasksSignal.update(tasks =>
          tasks.map(t => (t.id === res.id ? res : t))
        );
      },
      error: (err) => console.error('Error updating task:', err)
    });
  }

  
  deleteTask(id: number): void {
    if (!this.authService.isAdmin()) return;

    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.tasksSignal.update(tasks => tasks.filter(task => task.id !== id));
      },
      error: (err) => console.error('Error deleting task:', err)
    });
  }

  setSelectedUser(userId: number | null): void {
    this.selectedUserId.set(userId);
  }

  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  filteredTasks = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const selectedUser = this.selectedUserId();

    return this.tasksSignal().filter(task => {
      const matchesQuery = !query || 
        task.name?.toLowerCase().includes(query) || 
        task.description?.toLowerCase().includes(query);

      const matchesUser = selectedUser === null || task.assignedUserId === selectedUser;

      return matchesQuery && matchesUser;
    });
  });
}