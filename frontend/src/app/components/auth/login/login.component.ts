import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginForm: any;

  constructor(private router: Router, private authService: AuthService) {}

  onLogin() {
    if (this.email.trim() && this.password.trim()) {
      this.authService.login({ email: this.email, password: this.password }).subscribe({
        next: () => {
          console.log('Logged in successfully');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Login error:', error);
        }
      });
    }
  }
}
