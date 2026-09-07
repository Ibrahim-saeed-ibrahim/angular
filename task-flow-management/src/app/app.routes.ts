import { Routes } from '@angular/router';
import { TaskListComponent } from './features/tasks/components/task-list.component';
import { AuthService } from './shared/services/auth';
import { authGuard } from './shared/guards/auth-guard';
import {LoginComponent} from './features/tasks/components/login';
import { DashboardComponent } from './features/dashboard/dashboard';
import { Projects } from './features/projects/projects';
import { Calendar } from './features/calendar/calendar';



export const routes: Routes = [
{ path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  
  
{ path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'tasks', component: TaskListComponent, canActivate: [authGuard] },
  { path: 'projects', component: Projects, canActivate: [authGuard] },
  { path: 'calendar', component: Calendar, canActivate: [authGuard] },

  { path: '**', redirectTo: 'login' }

];
