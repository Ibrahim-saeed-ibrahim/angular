import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
{ path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/pages/login/login').then(m => m.LoginComponent) 
  },
{ 
    path: 'dashboard', 
    loadComponent: () => import('./features/dashboard/dashboard').then(m => m.DashboardComponent), 
    canActivate: [authGuard] 
  },
  {
    path:'tasks',
    loadComponent: ()=> import('./features/tasks/components/task-list.component').then(m=>m.TaskListComponent),
    canActivate:[authGuard]

  },
  {
    path:'projects',
    loadComponent:()=> import('./features/projects/projects').then(m=>m.Projects),
    canActivate:[authGuard]
  },
  {
    path:'calendar',
    loadComponent:()=>import('./features/calendar/calendar').then(m=>m.Calendar),
    canActivate:[authGuard]
  },

  { path: '**', redirectTo: 'login' }

];
