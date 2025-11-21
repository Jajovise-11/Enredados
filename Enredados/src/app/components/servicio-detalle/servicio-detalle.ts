import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-servicio-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './servicio-detalle.html',
  styleUrl: './servicio-detalle.css'
})
export class ServicioDetalleComponent implements OnInit {
  servicio: any = null;
  valoraciones: any[] = [];
  cargando: boolean = true;
  
  // Datos para reserva
  mostrarFormularioReserva: boolean = false;
  fechaEvento: string = '';
  comentarios: string = '';
  reservaEnviando: boolean = false;
  reservaExitosa: boolean = false;
  
  // Datos para valoración
  mostrarFormularioValoracion: boolean = false;
  nuevaValoracion = {
    puntuacion: 5,
    comentario: ''
  };
  valoracionEnviando: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarServicio(parseInt(id));
      this.cargarValoraciones(parseInt(id));
    }
  }

  cargarServicio(id: number): void {
    this.cargando = true;
    this.apiService.getServicio(id).subscribe({
      next: (data: any) => {
        this.servicio = data;
        this.cargando = false;
      },
      error: (error: any) => {
        console.error('Error al cargar servicio:', error);
        this.cargando = false;
        alert('Error al cargar el servicio');
        this.router.navigate(['/servicios']);
      }
    });
  }

  cargarValoraciones(servicioId: number): void {
    // Cargar todas las valoraciones y filtrar por este servicio
    this.apiService.getValoraciones().subscribe({
      next: (data: any) => {
        this.valoraciones = data.filter((v: any) => v.servicio === servicioId);
      },
      error: (error: any) => {
        console.error('Error al cargar valoraciones:', error);
      }
    });
  }

  toggleFormularioReserva(): void {
    this.mostrarFormularioReserva = !this.mostrarFormularioReserva;
  }

  realizarReserva(): void {
    if (!this.fechaEvento) {
      alert('Por favor, selecciona una fecha para el evento');
      return;
    }

    // Nota: En producción necesitarías el ID del usuario autenticado
    // Por ahora usamos un usuario de ejemplo (ID: 1)
    const reservaData = {
      usuario: 1, // TODO: Obtener del usuario autenticado
      servicio: this.servicio.id,
      fecha_evento: this.fechaEvento,
      estado: 'pendiente',
      comentarios: this.comentarios
    };

    this.reservaEnviando = true;

    this.apiService.crearReserva(reservaData).subscribe({
      next: (response: any) => {
        console.log('Reserva creada:', response);
        this.reservaExitosa = true;
        this.reservaEnviando = false;
        
        setTimeout(() => {
          this.mostrarFormularioReserva = false;
          this.reservaExitosa = false;
          this.fechaEvento = '';
          this.comentarios = '';
        }, 3000);
      },
      error: (error: any) => {
        console.error('Error al crear reserva:', error);
        this.reservaEnviando = false;
        alert('Error al crear la reserva. Por favor, intenta de nuevo.');
      }
    });
  }

  toggleFormularioValoracion(): void {
    this.mostrarFormularioValoracion = !this.mostrarFormularioValoracion;
  }

  enviarValoracion(): void {
    if (!this.nuevaValoracion.comentario.trim()) {
      alert('Por favor, escribe un comentario');
      return;
    }

    const valoracionData = {
      usuario: 1, // TODO: Obtener del usuario autenticado
      servicio: this.servicio.id,
      puntuacion: this.nuevaValoracion.puntuacion,
      comentario: this.nuevaValoracion.comentario
    };

    this.valoracionEnviando = true;

    this.apiService.crearValoracion(valoracionData).subscribe({
      next: (response: any) => {
        console.log('Valoración creada:', response);
        this.valoracionEnviando = false;
        this.mostrarFormularioValoracion = false;
        this.nuevaValoracion = { puntuacion: 5, comentario: '' };
        
        // Recargar valoraciones
        this.cargarValoraciones(this.servicio.id);
        
        alert('¡Gracias por tu valoración!');
      },
      error: (error: any) => {
        console.error('Error al crear valoración:', error);
        this.valoracionEnviando = false;
        alert('Error al enviar la valoración. Por favor, intenta de nuevo.');
      }
    });
  }

  calcularPromedioValoraciones(): number {
    if (this.valoraciones.length === 0) return 0;
    const suma = this.valoraciones.reduce((acc, val) => acc + val.puntuacion, 0);
    return Math.round((suma / this.valoraciones.length) * 10) / 10;
  }

  generarEstrellas(puntuacion: number): string[] {
    return Array(5).fill('★').map((star, index) => index < puntuacion ? '★' : '☆');
  }
}