import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class PerfilComponent implements OnInit {
  usuario: any = null;
  reservas: any[] = [];
  valoraciones: any[] = [];
  cargando: boolean = true;
  pestanaActiva: string = 'reservas'; // 'reservas' o 'valoraciones'

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verificar que el usuario está autenticado
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.usuario = this.authService.currentUserValue;
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    const usuarioId = this.authService.getUserId();

    if (!usuarioId) {
      this.router.navigate(['/login']);
      return;
    }

    // Cargar reservas
    this.apiService.getReservasUsuario(usuarioId).subscribe({
      next: (data: any) => {
        this.reservas = data.sort((a: any, b: any) => 
          new Date(b.fecha_reserva).getTime() - new Date(a.fecha_reserva).getTime()
        );
      },
      error: (error: any) => {
        console.error('Error al cargar reservas:', error);
      }
    });

    // Cargar valoraciones
    this.apiService.getValoracionesUsuario(usuarioId).subscribe({
      next: (data: any) => {
        this.valoraciones = data.sort((a: any, b: any) => 
          new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );
        this.cargando = false;
      },
      error: (error: any) => {
        console.error('Error al cargar valoraciones:', error);
        this.cargando = false;
      }
    });
  }

  cambiarPestana(pestana: string): void {
    this.pestanaActiva = pestana;
  }

  cancelarReserva(reservaId: number): void {
    if (!confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      return;
    }

    this.apiService.cancelarReserva(reservaId).subscribe({
      next: (response: any) => {
        console.log('Reserva cancelada:', response);
        alert('Reserva cancelada exitosamente');
        this.cargarDatos(); // Recargar datos
      },
      error: (error: any) => {
        console.error('Error al cancelar reserva:', error);
        alert('Error al cancelar la reserva');
      }
    });
  }

  eliminarValoracion(valoracionId: number): void {
    if (!confirm('¿Estás seguro de que quieres eliminar esta valoración?')) {
      return;
    }

    this.apiService.eliminarValoracion(valoracionId).subscribe({
      next: () => {
        console.log('Valoración eliminada');
        alert('Valoración eliminada exitosamente');
        this.cargarDatos(); // Recargar datos
      },
      error: (error: any) => {
        console.error('Error al eliminar valoración:', error);
        alert('Error al eliminar la valoración');
      }
    });
  }

  getEstadoBadgeClass(estado: string): string {
    const classes: any = {
      'pendiente': 'badge-pendiente',
      'confirmada': 'badge-confirmada',
      'cancelada': 'badge-cancelada',
      'completada': 'badge-completada'
    };
    return classes[estado] || 'badge-default';
  }

  generarEstrellas(puntuacion: number): string[] {
    return Array(5).fill('★').map((star, index) => index < puntuacion ? '★' : '☆');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}