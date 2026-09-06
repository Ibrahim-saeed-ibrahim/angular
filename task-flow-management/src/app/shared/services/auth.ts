import { Injectable, signal } from '@angular/core';
import { User, Roles, LoginCredentials } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  
  currentUser = signal<User | null>(null);

 
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

    
    if (credentials.username === 'user' && credentials.password === '123') {
      this.currentUser.set({
        id: 2,
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

 
  isAdmin(): boolean {
    return this.currentUser()?.role === Roles.ADMIN;
  }
}