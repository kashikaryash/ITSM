import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fullName = '';
  username = '';
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  register(): void {
    if (!this.fullName || !this.username || !this.email || !this.password) {
      this.snackBar.open('Please fill in all fields', 'Close', { duration: 3000 });
      return;
    }

    const user = {
      fullName: this.fullName,
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.register(user).subscribe({
      next: () => {
        this.snackBar.open('Registered successfully! Please login.', 'Close', { duration: 3000 });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.snackBar.open('Registration failed: ' + err.error.message || 'Try again', 'Close', { duration: 4000 });
      }
    });
  }
}
