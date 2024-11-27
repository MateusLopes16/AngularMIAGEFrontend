import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  username!: string;
  password!: string;
  isCreatingAccount: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  toggleForm() {
    this.isCreatingAccount = !this.isCreatingAccount;
  }

  onCreateAccount() {
    if (!this.username || !this.password) {
      alert('Please enter a valid username and password');
      return;
    }
    if (this.authService.createAccount(this.username, this.password)) {
      alert('Account created successfully');
      this.isCreatingAccount = false;
    } else {
      alert('Account creation failed');
    }
  }

  onLogin() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/']);
    } else {
      this.username = '';
      this.password = '';
      alert('Login failed');
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUsername() {
    return this.authService.getUsername();
  }

  isAdmin(): boolean | undefined {
    return this.authService.isUserAdmin();
  }
}