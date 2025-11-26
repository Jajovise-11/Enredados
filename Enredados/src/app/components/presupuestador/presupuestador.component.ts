import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

interface ItemGasto {
  id?: number;
  concepto: string;
  categoria: string;
  tipo_item: string;
  presupuestado: number;
  gastado: number;
  pagado: boolean;
  servicio?: number;
  vestido?: number;
  traje?: number;
  complemento_novia?: number;
  complemento_novio?: number;
  usuario?: number;
}

@Component({
  selector: 'app-presupuestador',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './presupuestador.component.html',
  styleUrl: './presupuestador.component.css'
})
export class PresupuestadorComponent implements OnInit {
  presupuestoTotal: number = 25000;
  gastos: ItemGasto[] = [];
  cargando: boolean = true;

  nuevoGasto: ItemGasto = {
    concepto: '',
    categoria: 'lugar',
    tipo_item: 'personalizado',
    presupuestado: 0,
    gastado: 0,
    pagado: false
  };

  mostrarFormulario: boolean = false;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      alert('Debes iniciar sesión para acceder al presupuestador');
      this.router.navigate(['/login']);
      return;
    }
    this.cargarPresupuesto();
  }

  cargarPresupuesto(): void {
    this.cargando = true;
    const usuarioId = this.authService.getUserId();
    
    if (!usuarioId) {
      this.router.navigate(['/login']);
      return;
    }

    this.apiService.getPresupuesto(usuarioId).subscribe({
      next: (data: any) => {
        this.gastos = data;
        this.cargando = false;
      },
      error: (error: any) => {
        console.error('Error al cargar presupuesto:', error);
        this.cargando = false;
      }
    });
  }

  get totalPresupuestado(): number {
    return this.gastos.reduce((sum, g) => sum + Number(g.presupuestado), 0);
  }

  get totalGastado(): number {
    return this.gastos.reduce((sum, g) => sum + Number(g.gastado), 0);
  }

  get restante(): number {
    return this.presupuestoTotal - this.totalGastado;
  }

  get porcentajeGastado(): number {
    if (this.presupuestoTotal === 0) return 0;
    return (this.totalGastado / this.presupuestoTotal) * 100;
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.limpiarFormulario();
    }
  }

  agregarGasto(): void {
    if (!this.nuevoGasto.concepto || this.nuevoGasto.presupuestado <= 0) {
      alert('Por favor completa el concepto y el presupuesto');
      return;
    }

    const usuarioId = this.authService.getUserId();
    if (!usuarioId) {
      alert('Error: Usuario no autenticado');
      return;
    }

    const gastoData = {
      ...this.nuevoGasto,
      usuario: usuarioId
    };

    this.apiService.crearItemPresupuesto(gastoData).subscribe({
      next: (response: any) => {
        console.log('Gasto creado:', response);
        this.cargarPresupuesto();
        this.toggleFormulario();
        alert('Gasto añadido exitosamente');
      },
      error: (error: any) => {
        console.error('Error al crear gasto:', error);
        alert('Error al crear el gasto');
      }
    });
  }

  eliminarGasto(id: number | undefined): void {
    if (!id) return;

    if (!confirm('¿Eliminar este gasto?')) {
      return;
    }

    this.apiService.eliminarItemPresupuesto(id).subscribe({
      next: () => {
        console.log('Gasto eliminado');
        this.cargarPresupuesto();
      },
      error: (error: any) => {
        console.error('Error al eliminar gasto:', error);
        alert('Error al eliminar el gasto');
      }
    });
  }

  togglePagado(gasto: ItemGasto): void {
    if (!gasto.id) return;

    const gastoActualizado = {
      ...gasto,
      pagado: !gasto.pagado
    };

    this.apiService.actualizarItemPresupuesto(gasto.id, gastoActualizado).subscribe({
      next: (response: any) => {
        console.log('Gasto actualizado:', response);
        this.cargarPresupuesto();
      },
      error: (error: any) => {
        console.error('Error al actualizar gasto:', error);
        alert('Error al actualizar el gasto');
      }
    });
  }

  limpiarFormulario(): void {
    this.nuevoGasto = {
      concepto: '',
      categoria: 'lugar',
      tipo_item: 'personalizado',
      presupuestado: 0,
      gastado: 0,
      pagado: false
    };
  }
}