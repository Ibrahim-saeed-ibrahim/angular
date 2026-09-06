import { Injectable, signal } from '@angular/core';
import { Signal } from '@angular/core'; 


export interface Task{
    id: number;
    name: string;
    description: string;
    status: 'To Do' | 'In Progress' | 'Done';
    
  }


@Injectable({
  providedIn: 'root',
})


export class TaskService {
  

}
