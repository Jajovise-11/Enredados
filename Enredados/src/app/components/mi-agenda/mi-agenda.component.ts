import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../shared/navbar/navbar';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  categoria: string;
  completada: boolean;
  prioridad: 'alta' | 'media' | 'baja';
}

@Component({
  selector: 'app-mi-agenda',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './mi-agenda.component.html',
  styleUrl: './mi-agenda.component.css'
})
export class MiAgendaComponent {
  tareas: Tarea[] = [
    {
      id: 1,
      titulo: 'Reservar lugar de la ceremonia',
      descripcion: 'Visitar y confirmar el lugar para la ceremonia',
      fecha: '2025-12-15',
      categoria: 'Lugar',
      completada: false,
      prioridad: 'alta'
    },
    {
      id: 2,
      titulo: 'Elegir menú de boda',
      descripcion: 'Reunión con el catering para decidir el menú',
      fecha: '2025-12-20',
      categoria: 'Catering',
      completada: false,
      prioridad: 'alta'
    },
    {
      id: 3,
      titulo: 'Enviar invitaciones',
      descripcion: 'Diseñar y enviar las invitaciones a los invitados',
      fecha: '2026-01-10',
      categoria: 'Invitaciones',
      completada: false,
      prioridad: 'media'
    },
    {
      id: 4,
      titulo: 'Prueba del vestido',
      descripcion: 'Segunda prueba del vestido de novia',
      fecha: '2026-02-15',
      categoria: 'Vestuario',
      completada: true,
      prioridad: 'alta'
    },
    {
      id: 5,
      titulo: 'Reservar fotógrafo',
      descripcion: 'Confirmar fotógrafo y videógrafo',
      fecha: '2025-12-10',
      categoria: 'Fotografía',
      completada: true,
      prioridad: 'alta'
    },
    {
      id: 6,
      titulo: 'Elegir flores',
      descripcion: 'Seleccionar arreglos florales para la decoración',
      fecha: '2026-03-01',
      categoria: 'Decoración',
      completada: false,
      prioridad: 'media'
    }
  ];

  nuevaTarea: Tarea = {
    id: 0,
    titulo: '',
    descripcion: '',
    fecha: '',
    categoria: '',
    completada: false,
    prioridad: 'media'
  };

  mostrarFormulario: boolean = false;
  filtroCategoria: string = '';
  filtroPrioridad: string = '';

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
      this.nuevaTarea = {
        id: 0,
        titulo: '',
        descripcion: '',
        fecha: '',
        categoria: '',
        completada: false,
        prioridad: 'media'
      };
    }
  }

  agregarTarea(): void {
    if (this.nuevaTarea.titulo && this.nuevaTarea.fecha) {
      this.nuevaTarea.id = Math.max(...this.tareas.map(t => t.id), 0) + 1;
      this.tareas.push({ ...this.nuevaTarea });
      this.toggleFormulario();
    }
  }

  toggleCompletada(tarea: Tarea): void {
    tarea.completada = !tarea.completada;
  }

  eliminarTarea(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
      this.tareas = this.tareas.filter(t => t.id !== id);
    }
  }
}