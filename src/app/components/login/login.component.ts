import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login(): void {
    if (!this.username || !this.password) {
      this.snackBar.open('Please enter username and password', 'Close', {
        duration: 3000
      });
      return;
    }

    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: (response) => {
        localStorage.setItem('user', JSON.stringify(response));
        this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
        this.router.navigate(['/incidents']);
      },
      error: () => {
        this.snackBar.open('Login failed. Check your credentials.', 'Close', {
          duration: 3000
        });
      }
    });
  }
}
