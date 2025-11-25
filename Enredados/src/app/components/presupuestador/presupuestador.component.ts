import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../shared/navbar/navbar';

interface Gasto {
  id: number;
  concepto: string;
  categoria: string;
  presupuestado: number;
  gastado: number;
  pagado: boolean;
}

@Component({
  selector: 'app-presupuestador',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './presupuestador.component.html',
  styleUrl: './presupuestador.component.css'
})
export class PresupuestadorComponent {
  presupuestoTotal: number = 25000;

  gastos: Gasto[] = [
    { id: 1, concepto: 'Lugar de la ceremonia', categoria: 'Lugar', presupuestado: 3000, gastado: 3000, pagado: true },
    { id: 2, concepto: 'Catering', categoria: 'Comida', presupuestado: 8000, gastado: 7500, pagado: false },
    { id: 3, concepto: 'Fotografía y vídeo', categoria: 'Fotografía', presupuestado: 2500, gastado: 2500, pagado: true },
    { id: 4, concepto: 'Vestido de novia', categoria: 'Vestuario', presupuestado: 2000, gastado: 1800, pagado: true },
    { id: 5, concepto: 'Traje de novio', categoria: 'Vestuario', presupuestado: 800, gastado: 750, pagado: true },
    { id: 6, concepto: 'Flores y decoración', categoria: 'Decoración', presupuestado: 1500, gastado: 0, pagado: false },
    { id: 7, concepto: 'Música y DJ', categoria: 'Entretenimiento', presupuestado: 1200, gastado: 0, pagado: false },
    { id: 8, concepto: 'Invitaciones', categoria: 'Papelería', presupuestado: 400, gastado: 380, pagado: true },
    { id: 9, concepto: 'Pastel de bodas', categoria: 'Comida', presupuestado: 600, gastado: 0, pagado: false }
  ];

  nuevoGasto: Gasto = {
    id: 0,
    concepto: '',
    categoria: '',
    presupuestado: 0,
    gastado: 0,
    pagado: false
  };

  mostrarFormulario: boolean = false;

  get totalPresupuestado(): number {
    return this.gastos.reduce((sum, g) => sum + g.presupuestado, 0);
  }

  get totalGastado(): number {
    return this.gastos.reduce((sum, g) => sum + g.gastado, 0);
  }

  get restante(): number {
    return this.presupuestoTotal - this.totalGastado;
  }

  get porcentajeGastado(): number {
    return (this.totalGastado / this.presupuestoTotal) * 100;
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  agregarGasto(): void {
    if (this.nuevoGasto.concepto && this.nuevoGasto.presupuestado > 0) {
      this.nuevoGasto.id = Math.max(...this.gastos.map(g => g.id), 0) + 1;
      this.gastos.push({ ...this.nuevoGasto });
      this.nuevoGasto = { id: 0, concepto: '', categoria: '', presupuestado: 0, gastado: 0, pagado: false };
      this.toggleFormulario();
    }
  }

  eliminarGasto(id: number): void {
    if (confirm('¿Eliminar este gasto?')) {
      this.gastos = this.gastos.filter(g => g.id !== id);
    }
  }

  togglePagado(gasto: Gasto): void {
    gasto.pagado = !gasto.pagado;
  }
}