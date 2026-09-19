import { Injectable, signal } from '@angular/core';
import { User,Roles, LoginCredentials } from '../models/user.model';
import { computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  currentUser = signal<User | null>(null);
  isAdmin = computed(() => this.currentUser()?.role === Roles.ADMIN); 
  login(credentials: LoginCredentials): boolean {
    
    if (credentials.username === 'admin' && credentials.password === '123') {
      this.currentUser.set({
        id: 1,
        username: 'admin',
        email: 'admin@taskflow.com',
        role: Roles.ADMIN,
      });
      return true;
    }
    if (credentials.username === 'ibrahim' && credentials.password === '123') {
      this.currentUser.set({
        id: 2,
        username: 'ibrahim',
        email: 'ibrahim@taskflow.com',
        role: Roles.ADMIN,
      });
      return true;
    }
    if (credentials.username === 'ahmed' && credentials.password === '123') {
      this.currentUser.set({
        id: 3,
        username: 'ahmed',
        email: 'ahmed@taskflow.com',
        role: Roles.REQUESTER_REGULAR,
      });
      return true;
    }

    
    if (credentials.username === 'user' && credentials.password === '123') {
      this.currentUser.set({
        id: 4,
        username: 'user',
        email: 'user@taskflow.com',
        role: Roles.REQUESTER_REGULAR,
      });
      return true;
    }

    return false;
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }


}