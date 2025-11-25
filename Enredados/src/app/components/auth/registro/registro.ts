import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NavbarComponent } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class RegistroComponent {
  formData = {
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: ''
  };

  error: string = '';
  success: boolean = false;
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

    // Validaciones
    if (!this.formData.username || !this.formData.password) {
      this.error = 'Usuario y contraseña son obligatorios';
      return;
    }

    if (this.formData.password !== this.formData.password2) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    if (this.formData.password.length < 6) {
      this.error = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    this.loading = true;

    // Preparar datos para enviar
    const userData = {
      username: this.formData.username,
      password: this.formData.password,
      email: this.formData.email,
      first_name: this.formData.first_name,
      last_name: this.formData.last_name
    };

    this.authService.register(userData).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.loading = false;
        this.success = true;

        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error en registro:', error);
        this.loading = false;
        this.error = error.error?.error || 'Error al crear la cuenta. Por favor, intenta de nuevo.';
      }
    });
  }
}