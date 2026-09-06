import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { Roles } from '../../shared/models/user.model';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  
  const currentUser = authService.currentUser();

  if (currentUser) {
    return true;
  }

 
  const roleType = window.prompt('Enter role (ADMIN / REQUESTER_REGULAR):');

  if (roleType === Roles.ADMIN || roleType === Roles.REQUESTER_REGULAR) {
    
    authService.login({ username: roleType.toLowerCase(), password: '123' });
    return true;
  }


  return false;
};