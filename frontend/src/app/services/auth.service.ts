import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  private hasToken(): boolean {
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  signup(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user).pipe(
      catchError(this.handleError)
    );
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user).pipe(
      tap(response => {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('token', response.token); // Store the token
          localStorage.setItem('user', JSON.stringify(response.user)); // Store user details
        }
        this.loggedInSubject.next(true);
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.loggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  getUserDetails(): any {
    if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('HTTP error:', error);
    return throwError(error);
  }
}
