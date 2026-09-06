import { Injectable , signal, effect, computed } from '@angular/core';
import { Task } from '../models/task.model';
@Injectable({
  providedIn: 'root' ,
})
export class TaskService {

    searchQuery = signal('');
    tasksSignal = signal<Task[]>(
        localStorage.getItem('tasks') 
        ? JSON.parse(localStorage.getItem('tasks')!) 
        :[]
);
  addTask(newTaskData: Omit<Task, 'id'>): void {
    const newTask: Task = {
      id: Date.now(),
      ...newTaskData
    };
    this.tasksSignal.update(tasks => [...tasks, newTask]);
  }
  setSearchQuery(query: string) {
         this.searchQuery.set(query);
      }
  filteredTasks = computed(() => {
      const query = this.searchQuery().toLowerCase().trim();
      if (!query) {
        return this.tasksSignal(); 
      }
      return this.tasksSignal().filter(task =>
        task.name?.toLowerCase().includes(query) || 
        task.description?.toLowerCase().includes(query)
      );
    });
  deleteTask(id: number): void {
    this.tasksSignal.update(tasks => tasks.filter(task => task.id !== id));
  }
    updateTask(updatedTask: Task) {
      this.tasksSignal.update((tasks) =>
        tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
    }
  constructor() {
  effect(() => {localStorage.setItem('tasks', JSON.stringify(this.tasksSignal() ));
  });
 }
}