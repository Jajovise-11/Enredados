import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Si ya está autenticado, redirigir
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    this.error = '';

    if (!this.username || !this.password) {
      this.error = 'Por favor, completa todos los campos';
      return;
    }

    this.loading = true;

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.loading = false;
        // Redirigir a la página principal
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.loading = false;
        this.error = error.error?.error || 'Credenciales inválidas. Por favor, intenta de nuevo.';
      }
    });
  }
}