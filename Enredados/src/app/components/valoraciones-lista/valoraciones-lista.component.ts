import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-valoraciones-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './valoraciones-lista.component.html',
  styleUrl: './valoraciones-lista.component.css'
})
export class ValoracionesListaComponent implements OnInit {
  @Input() servicioId?: number; // Si se pasa, filtra por servicio
  @Input() usuarioId?: number; // Si se pasa, filtra por usuario
  @Input() limite?: number = 0; // 0 = sin límite
  @Input() mostrarFormulario: boolean = true; // Mostrar formulario para nueva valoración
  @Input() titulo: string = 'Valoraciones';

  valoraciones: any[] = [];
  cargando: boolean = true;
  mostrandoForm: boolean = false;
  enviando: boolean = false;

  nuevaValoracion = {
    puntuacion: 5,
    comentario: ''
  };

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarValoraciones();
  }

  cargarValoraciones(): void {
    this.cargando = true;
    
    this.apiService.getValoraciones().subscribe({
      next: (data: any[]) => {
        // Filtrar según los parámetros
        let valoracionesFiltradas = data;
        
        if (this.servicioId) {
          valoracionesFiltradas = valoracionesFiltradas.filter(
            v => v.servicio === this.servicioId
          );
        }
        
        if (this.usuarioId) {
          valoracionesFiltradas = valoracionesFiltradas.filter(
            v => v.usuario === this.usuarioId
          );
        }
        
        // Ordenar por fecha descendente
        valoracionesFiltradas.sort((a, b) => 
          new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );
        
        // Aplicar límite si existe
        if (this.limite > 0) {
          valoracionesFiltradas = valoracionesFiltradas.slice(0, this.limite);
        }
        
        this.valoraciones = valoracionesFiltradas;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar valoraciones:', error);
        this.cargando = false;
      }
    });
  }

  toggleFormulario(): void {
    if (!this.authService.isLoggedIn()) {
      alert('Debes iniciar sesión para dejar una valoración');
      return;
    }
    
    this.mostrandoForm = !this.mostrandoForm;
  }

  enviarValoracion(): void {
    if (!this.nuevaValoracion.comentario.trim()) {
      alert('Por favor, escribe un comentario');
      return;
    }

    if (!this.servicioId) {
      alert('Error: No se puede crear valoración sin servicio');
      return;
    }

    const valoracionData = {
      usuario: this.authService.getUserId(),
      servicio: this.servicioId,
      puntuacion: this.nuevaValoracion.puntuacion,
      comentario: this.nuevaValoracion.comentario
    };

    this.enviando = true;

    this.apiService.crearValoracion(valoracionData).subscribe({
      next: (response) => {
        console.log('Valoración creada:', response);
        this.enviando = false;
        this.mostrandoForm = false;
        this.nuevaValoracion = { puntuacion: 5, comentario: '' };
        this.cargarValoraciones();
        alert('¡Gracias por tu valoración!');
      },
      error: (error) => {
        console.error('Error al crear valoración:', error);
        this.enviando = false;
        alert('Error al enviar la valoración. Por favor, intenta de nuevo.');
      }
    });
  }

  eliminarValoracion(id: number): void {
    if (!confirm('¿Estás seguro de eliminar esta valoración?')) {
      return;
    }

    this.apiService.eliminarValoracion(id).subscribe({
      next: () => {
        alert('Valoración eliminada');
        this.cargarValoraciones();
      },
      error: (error) => {
        console.error('Error al eliminar:', error);
        alert('Error al eliminar la valoración');
      }
    });
  }

  calcularPromedio(): number {
    if (this.valoraciones.length === 0) return 0;
    const suma = this.valoraciones.reduce((acc, val) => acc + val.puntuacion, 0);
    return Math.round((suma / this.valoraciones.length) * 10) / 10;
  }

  generarEstrellas(puntuacion: number): string[] {
    return Array(5).fill('★').map((star, index) => 
      index < puntuacion ? '★' : '☆'
    );
  }

  esDelUsuario(valoracion: any): boolean {
    const userId = this.authService.getUserId();
    return userId === valoracion.usuario;
  }
}