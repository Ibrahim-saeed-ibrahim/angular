import { Directive, TemplateRef, ViewContainerRef, inject, input, effect } from '@angular/core';
import { AuthService } from '../services/auth';

@Directive({
  selector: '[appRoleAccess]',
})
export class RoleAccess {
  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);
  private authService = inject(AuthService);
  allowedRole=input.required<string>({ alias: 'appRoleAccess' });
constructor() {
  effect(() => {
    const currentRole = this.authService.currentUser()?.role;
    if (currentRole === this.allowedRole()) { 
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  });
}
}
