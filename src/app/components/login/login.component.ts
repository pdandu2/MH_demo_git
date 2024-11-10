import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  showLoginForm = false;
  selectedRole = '';
  email = '';
  password = '';
  error = '';

  constructor(private router: Router) {}

  selectRole(role: string) {
    this.selectedRole = role;
    this.showLoginForm = true;
    // Set demo credentials based on role
    if (role === 'patient') {
      this.email = 'patient@demo.com';
      this.password = 'demo';
    } else {
      this.email = 'provider@demo.com';
      this.password = 'demo';
    }
  }

  back() {
    this.showLoginForm = false;
    this.selectedRole = '';
    this.email = '';
    this.password = '';
    this.error = '';
  }

  login() {
    // For demo purposes, we'll accept both sets of credentials
    const validProviderCredentials = this.email === 'provider@demo.com' && this.password === 'demo';
    const validPatientCredentials = this.email === 'patient@demo.com' && this.password === 'demo';

    if (this.selectedRole === 'provider' && validProviderCredentials) {
      this.router.navigate(['/dashboard']);
    } else if (this.selectedRole === 'patient' && validPatientCredentials) {
      this.router.navigate(['/patient-dashboard']);
    } else {
      this.error = `Invalid credentials. Use ${this.selectedRole}@demo.com / demo`;
    }
  }
}