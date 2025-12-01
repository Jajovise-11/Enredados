import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NavbarComponent } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-registro-proveedor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './registro-proveedor.component.html',
  styleUrl: './registro-proveedor.component.css'
})
export class RegistroProveedorComponent {
  // Datos del usuario
  formData = {
    username: '',
    email: '',
    password: '',
    password2: '',
    
    // Datos del proveedor
    nombre_empresa: '',
    descripcion: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    cif_nif: ''
  };

  error: string = '';
  success: boolean = false;
  loading: boolean = false;

  // Para mostrar/ocultar contraseña
  mostrarPassword: boolean = false;
  mostrarPassword2: boolean = false;

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

    // Validaciones básicas
    if (!this.formData.username || !this.formData.password || !this.formData.nombre_empresa) {
      this.error = 'Usuario, contraseña y nombre de empresa son obligatorios';
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

    if (this.formData.telefono && !this.validarTelefono(this.formData.telefono)) {
      this.error = 'El teléfono debe tener un formato válido (9 dígitos)';
      return;
    }

    if (this.formData.email && !this.validarEmail(this.formData.email)) {
      this.error = 'El email no tiene un formato válido';
      return;
    }

    this.loading = true;

    // Preparar datos para enviar
    const proveedorData = {
      username: this.formData.username,
      password: this.formData.password,
      email: this.formData.email,
      nombre_empresa: this.formData.nombre_empresa,
      descripcion: this.formData.descripcion,
      telefono: this.formData.telefono,
      direccion: this.formData.direccion,
      ciudad: this.formData.ciudad,
      cif_nif: this.formData.cif_nif
    };

    this.authService.registerProveedor(proveedorData).subscribe({
      next: (response) => {
        console.log('Proveedor registrado exitosamente:', response);
        this.loading = false;
        this.success = true;

        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error en registro de proveedor:', error);
        this.loading = false;
        this.error = error.error?.error || 'Error al crear la cuenta de proveedor. Por favor, intenta de nuevo.';
      }
    });
  }

  toggleMostrarPassword(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

  toggleMostrarPassword2(): void {
    this.mostrarPassword2 = !this.mostrarPassword2;
  }

  validarTelefono(telefono: string): boolean {
    // Validar formato español: 9 dígitos
    const telefonoRegex = /^[6-9]\d{8}$/;
    return telefonoRegex.test(telefono.replace(/\s/g, ''));
  }

  validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}