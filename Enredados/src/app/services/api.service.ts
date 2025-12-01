import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  // ========== PROVEEDORES ==========
  getProveedores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/proveedores/`);
  }

  getProveedor(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/proveedores/${id}/`);
  }

  // ========== CATEGORÍAS ==========
  getCategorias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categorias/`);
  }

  // ========== SERVICIOS ==========
  getServicios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/servicios/`);
  }

  getServicio(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/servicios/${id}/`);
  }

  crearServicio(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/servicios/`, data);
  }

  actualizarServicio(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/servicios/${id}/`, data);
  }

  eliminarServicio(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/servicios/${id}/`);
  }

  // ========== VESTIDOS NOVIA ==========
  getVestidosNovia(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vestidos-novia/`);
  }

  getVestidoNovia(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/vestidos-novia/${id}/`);
  }

  crearVestidoNovia(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/vestidos-novia/`, data);
  }

  actualizarVestidoNovia(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/vestidos-novia/${id}/`, data);
  }

  eliminarVestidoNovia(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/vestidos-novia/${id}/`);
  }

  // ========== TRAJES NOVIO ==========
  getTrajesNovio(): Observable<any> {
    return this.http.get(`${this.apiUrl}/trajes-novio/`);
  }

  getTrajeNovio(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/trajes-novio/${id}/`);
  }

  crearTrajeNovio(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/trajes-novio/`, data);
  }

  actualizarTrajeNovio(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/trajes-novio/${id}/`, data);
  }

  eliminarTrajeNovio(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/trajes-novio/${id}/`);
  }

  // ========== COMPLEMENTOS NOVIA ==========
  getComplementosNovia(): Observable<any> {
    return this.http.get(`${this.apiUrl}/complementos-novia/`);
  }

  getComplementoNovia(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/complementos-novia/${id}/`);
  }

  crearComplementoNovia(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/complementos-novia/`, data);
  }

  actualizarComplementoNovia(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/complementos-novia/${id}/`, data);
  }

  eliminarComplementoNovia(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/complementos-novia/${id}/`);
  }

  // ========== COMPLEMENTOS NOVIO ==========
  getComplementosNovio(): Observable<any> {
    return this.http.get(`${this.apiUrl}/complementos-novio/`);
  }

  getComplementoNovio(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/complementos-novio/${id}/`);
  }

  crearComplementoNovio(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/complementos-novio/`, data);
  }

  actualizarComplementoNovio(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/complementos-novio/${id}/`, data);
  }

  eliminarComplementoNovio(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/complementos-novio/${id}/`);
  }

  // ========== RESERVAS ==========
  getReservas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reservas/`);
  }

  getReservasUsuario(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/reservas/?usuario=${usuarioId}`);
  }

  crearReserva(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservas/`, data);
  }

  cancelarReserva(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/reservas/${id}/`, { estado: 'cancelada' });
  }

  // Método especial para crear reserva + presupuesto
  crearReservaConPresupuesto(reservaData: any, producto: any, usuarioId: number): Observable<any> {
    // Primero crear la reserva
    return new Observable(observer => {
      this.crearReserva(reservaData).subscribe({
        next: (reserva: any) => {
          // Determinar tipo de item y concepto
          let tipo_item = 'personalizado';
          let categoria = 'otros';
          let concepto = producto.nombre;

          if (reservaData.servicio) {
            tipo_item = 'servicio';
            categoria = 'entretenimiento';
          } else if (reservaData.vestido) {
            tipo_item = 'vestido';
            categoria = 'vestuario';
          } else if (reservaData.traje) {
            tipo_item = 'traje';
            categoria = 'vestuario';
          } else if (reservaData.complemento_novia || reservaData.complemento_novio) {
            tipo_item = reservaData.complemento_novia ? 'complemento_novia' : 'complemento_novio';
            categoria = 'vestuario';
          }

          // Crear item de presupuesto
          const presupuestoData = {
            usuario: usuarioId,
            concepto: concepto,
            categoria: categoria,
            tipo_item: tipo_item,
            presupuestado: producto.precio,
            gastado: 0,
            pagado: false,
            ...reservaData // Incluir referencias a servicio/vestido/traje/complemento
          };

          this.crearItemPresupuesto(presupuestoData).subscribe({
            next: (presupuesto: any) => {
              observer.next({ reserva, presupuesto });
              observer.complete();
            },
            error: (error: any) => {
              // Si falla el presupuesto, informar pero devolver la reserva
              console.error('Error al crear presupuesto:', error);
              observer.next({ reserva, presupuesto: null });
              observer.complete();
            }
          });
        },
        error: (error: any) => {
          observer.error(error);
        }
      });
    });
  }

  // ========== VALORACIONES ==========
  getValoraciones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/valoraciones/`);
  }

  getValoracionesUsuario(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/valoraciones/?usuario=${usuarioId}`);
  }

  crearValoracion(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/valoraciones/`, data);
  }

  eliminarValoracion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/valoraciones/${id}/`);
  }

  // ========== TAREAS AGENDA ==========
  getTareasAgenda(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/tareas-agenda/?usuario=${usuarioId}`);
  }

  crearTareaAgenda(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tareas-agenda/`, data);
  }

  actualizarTareaAgenda(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/tareas-agenda/${id}/`, data);
  }

  eliminarTareaAgenda(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tareas-agenda/${id}/`);
  }

  // ========== PRESUPUESTO ==========
  getPresupuesto(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/presupuesto/?usuario=${usuarioId}`);
  }

  crearItemPresupuesto(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/presupuesto/`, data);
  }

  actualizarItemPresupuesto(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/presupuesto/${id}/`, data);
  }

  eliminarItemPresupuesto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/presupuesto/${id}/`);
  }
}