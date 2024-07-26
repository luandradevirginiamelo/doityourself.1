import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSignup(event: Event) {
    event.preventDefault(); // Prevent default form submission

    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'All fields are required.';
      return;
    }
    
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:5000/api/auth/signup', user)
  .subscribe({
    next: (response: any) => {
      console.log('User registered successfully:', response);
      this.successMessage = 'Registration successful! Redirecting to login...';
      this.errorMessage = ''; // Clear previous error message
      setTimeout(() => {
        this.router.navigate(['/login']); // Redirect after success
      }, 2000); // 2-second delay
    },
    error: (error) => {
      console.error('Error during signup:', error);
      this.errorMessage = 'An error occurred during registration. Please try again.';
      this.successMessage = ''; // Clear previous success message
    }
  });
  }
}
