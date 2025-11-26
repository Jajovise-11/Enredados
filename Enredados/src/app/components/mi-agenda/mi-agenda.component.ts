import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

interface Tarea {
  id?: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  categoria: string;
  completada: boolean;
  prioridad: 'alta' | 'media' | 'baja';
  usuario?: number;
}

@Component({
  selector: 'app-mi-agenda',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './mi-agenda.component.html',
  styleUrl: './mi-agenda.component.css'
})
export class MiAgendaComponent implements OnInit {
  tareas: Tarea[] = [];
  cargando: boolean = true;
  
  nuevaTarea: Tarea = {
    titulo: '',
    descripcion: '',
    fecha: '',
    categoria: 'lugar',
    completada: false,
    prioridad: 'media'
  };

  mostrarFormulario: boolean = false;
  filtroCategoria: string = '';
  filtroPrioridad: string = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      alert('Debes iniciar sesión para acceder a tu agenda');
      this.router.navigate(['/login']);
      return;
    }
    this.cargarTareas();
  }

  cargarTareas(): void {
    this.cargando = true;
    const usuarioId = this.authService.getUserId();
    
    if (!usuarioId) {
      this.router.navigate(['/login']);
      return;
    }

    this.apiService.getTareasAgenda(usuarioId).subscribe({
      next: (data: any) => {
        this.tareas = data;
        this.cargando = false;
      },
      error: (error: any) => {
        console.error('Error al cargar tareas:', error);
        this.cargando = false;
        alert('Error al cargar las tareas');
      }
    });
  }

  get tareasFiltradas(): Tarea[] {
    return this.tareas.filter(tarea => {
      const cumpleCategoria = !this.filtroCategoria || tarea.categoria === this.filtroCategoria;
      const cumplePrioridad = !this.filtroPrioridad || tarea.prioridad === this.filtroPrioridad;
      return cumpleCategoria && cumplePrioridad;
    });
  }

  get tareasCompletadas(): number {
    return this.tareas.filter(t => t.completada).length;
  }

  get tareasPendientes(): number {
    return this.tareas.filter(t => !t.completada).length;
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.limpiarFormulario();
    }
  }

  agregarTarea(): void {
    if (!this.nuevaTarea.titulo || !this.nuevaTarea.fecha) {
      alert('Por favor completa el título y la fecha');
      return;
    }

    const usuarioId = this.authService.getUserId();
    if (!usuarioId) {
      alert('Error: Usuario no autenticado');
      return;
    }

    const tareaData = {
      ...this.nuevaTarea,
      usuario: usuarioId
    };

    this.apiService.crearTareaAgenda(tareaData).subscribe({
      next: (response: any) => {
        console.log('Tarea creada:', response);
        this.cargarTareas(); // Recargar tareas
        this.toggleFormulario();
        alert('Tarea añadida exitosamente');
      },
      error: (error: any) => {
        console.error('Error al crear tarea:', error);
        alert('Error al crear la tarea');
      }
    });
  }

  toggleCompletada(tarea: Tarea): void {
    if (!tarea.id) return;

    const tareaActualizada = {
      ...tarea,
      completada: !tarea.completada
    };

    this.apiService.actualizarTareaAgenda(tarea.id, tareaActualizada).subscribe({
      next: (response: any) => {
        console.log('Tarea actualizada:', response);
        this.cargarTareas();
      },
      error: (error: any) => {
        console.error('Error al actualizar tarea:', error);
        alert('Error al actualizar la tarea');
      }
    });
  }

  eliminarTarea(id: number | undefined): void {
    if (!id) return;

    if (!confirm('¿Estás seguro de eliminar esta tarea?')) {
      return;
    }

    this.apiService.eliminarTareaAgenda(id).subscribe({
      next: () => {
        console.log('Tarea eliminada');
        this.cargarTareas();
        alert('Tarea eliminada exitosamente');
      },
      error: (error: any) => {
        console.error('Error al eliminar tarea:', error);
        alert('Error al eliminar la tarea');
      }
    });
  }

  limpiarFormulario(): void {
    this.nuevaTarea = {
      titulo: '',
      descripcion: '',
      fecha: '',
      categoria: 'lugar',
      completada: false,
      prioridad: 'media'
    };
  }
}