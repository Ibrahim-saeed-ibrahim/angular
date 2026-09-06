import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './login.html', 
  styleUrl: './login.css',
})

export class LoginComponent{

  private authService = inject(AuthService);
  private router = inject(Router);
  username = signal('');
  password = signal('');
  errorMessage = signal('');
  onSubmit() {
    const isSuccess = this.authService.login({
      username: this.username(),
      password: this.password()
    });

    if (isSuccess) {
      this.router.navigate(['/tasks']);
    } else {
      this.errorMessage.set('Invalid credentials');
    }
  }

}