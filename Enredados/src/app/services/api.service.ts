import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  // ========== SERVICIOS ==========
  getCategorias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categorias/`);
  }

  getProveedores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/proveedores/`);
  }

  getServicios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/servicios/`);
  }

  getServicio(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/servicios/${id}/`);
  }

  // ========== VESTIDOS DE NOVIA ==========
  getVestidosNovia(params?: any): Observable<any> {
    let url = `${this.apiUrl}/vestidos-novia/`;
    if (params) {
      const queryParams = new URLSearchParams(params).toString();
      url += `?${queryParams}`;
    }
    return this.http.get(url);
  }

  getVestidoNovia(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/vestidos-novia/${id}/`);
  }

  // ========== TRAJES DE NOVIO ==========
  getTrajesNovio(params?: any): Observable<any> {
    let url = `${this.apiUrl}/trajes-novio/`;
    if (params) {
      const queryParams = new URLSearchParams(params).toString();
      url += `?${queryParams}`;
    }
    return this.http.get(url);
  }

  getTrajeNovio(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/trajes-novio/${id}/`);
  }

  // ========== COMPLEMENTOS NOVIA ==========
  getComplementosNovia(params?: any): Observable<any> {
    let url = `${this.apiUrl}/complementos-novia/`;
    if (params) {
      const queryParams = new URLSearchParams(params).toString();
      url += `?${queryParams}`;
    }
    return this.http.get(url);
  }

  getComplementoNovia(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/complementos-novia/${id}/`);
  }

  // ========== COMPLEMENTOS NOVIO ==========
  getComplementosNovio(params?: any): Observable<any> {
    let url = `${this.apiUrl}/complementos-novio/`;
    if (params) {
      const queryParams = new URLSearchParams(params).toString();
      url += `?${queryParams}`;
    }
    return this.http.get(url);
  }

  getComplementoNovio(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/complementos-novio/${id}/`);
  }

  // ========== TAREAS AGENDA ==========
  getTareasAgenda(usuarioId?: number): Observable<any> {
    let url = `${this.apiUrl}/tareas-agenda/`;
    if (usuarioId) {
      url += `?usuario=${usuarioId}`;
    }
    return this.http.get(url);
  }

  getTareaAgenda(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/tareas-agenda/${id}/`);
  }

  crearTareaAgenda(tareaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tareas-agenda/`, tareaData);
  }

  actualizarTareaAgenda(id: number, tareaData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/tareas-agenda/${id}/`, tareaData);
  }

  eliminarTareaAgenda(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tareas-agenda/${id}/`);
  }

  // ========== PRESUPUESTO ==========
  getPresupuesto(usuarioId?: number): Observable<any> {
    let url = `${this.apiUrl}/presupuesto/`;
    if (usuarioId) {
      url += `?usuario=${usuarioId}`;
    }
    return this.http.get(url);
  }

  getItemPresupuesto(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/presupuesto/${id}/`);
  }

  crearItemPresupuesto(itemData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/presupuesto/`, itemData);
  }

  actualizarItemPresupuesto(id: number, itemData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/presupuesto/${id}/`, itemData);
  }

  eliminarItemPresupuesto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/presupuesto/${id}/`);
  }

  // ========== VALORACIONES ==========
  getValoraciones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/valoraciones/`);
  }

  crearValoracion(valoracionData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/valoraciones/`, valoracionData);
  }

  getValoracionesUsuario(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/valoraciones/?usuario=${usuarioId}`);
  }

  eliminarValoracion(valoracionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/valoraciones/${valoracionId}/`);
  }

  // ========== RESERVAS ==========
  crearReserva(reservaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservas/`, reservaData);
  }

  getReservasUsuario(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/reservas/?usuario=${usuarioId}`);
  }

  cancelarReserva(reservaId: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/reservas/${reservaId}/`, { estado: 'cancelada' });
  }

  // ========== AUTENTICACIÓN ==========
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register/`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login/`, credentials);
  }

  // ========== NUEVO: RESERVA CON PRESUPUESTO AUTOMÁTICO ==========
crearReservaConPresupuesto(reservaData: any, productoData: any, usuarioId: number): Observable<any> {
  return new Observable(observer => {
    this.crearReserva(reservaData).subscribe({
      next: (reserva: any) => {
        // Crear el item de presupuesto con tipo flexible
        const itemPresupuesto: any = {
          usuario: usuarioId,
          concepto: productoData.nombre,
          categoria: this.mapearCategoriaProducto(reservaData),
          tipo_item: this.obtenerTipoItem(reservaData),
          presupuestado: productoData.precio,
          gastado: 0,
          pagado: false
        };

        // Asignar la referencia correcta según lo que tenga reservaData
        if (reservaData.vestido) {
          itemPresupuesto.vestido = reservaData.vestido;
        }
        if (reservaData.traje) {
          itemPresupuesto.traje = reservaData.traje;
        }
        if (reservaData.complemento_novia) {
          itemPresupuesto.complemento_novia = reservaData.complemento_novia;
        }
        if (reservaData.complemento_novio) {
          itemPresupuesto.complemento_novio = reservaData.complemento_novio;
        }
        if (reservaData.servicio) {
          itemPresupuesto.servicio = reservaData.servicio;
        }

        console.log('Item presupuesto a crear:', itemPresupuesto);

        this.crearItemPresupuesto(itemPresupuesto).subscribe({
          next: (presupuesto: any) => {
            console.log('Presupuesto creado:', presupuesto);
            observer.next({ reserva, presupuesto });
            observer.complete();
          },
          error: (error: any) => {
            console.error('Error al crear presupuesto:', error);
            // Aunque falle el presupuesto, la reserva ya se creó
            observer.next({ reserva, presupuesto: null });
            observer.complete();
          }
        });
      },
      error: (error: any) => {
        console.error('Error al crear reserva:', error);
        observer.error(error);
      }
    });
  });
}

private obtenerTipoItem(reservaData: any): string {
  if (reservaData.vestido) return 'vestido';
  if (reservaData.traje) return 'traje';
  if (reservaData.complemento_novia) return 'complemento_novia';
  if (reservaData.complemento_novio) return 'complemento_novio';
  if (reservaData.servicio) return 'servicio';
  return 'personalizado';
}

private mapearCategoriaProducto(reservaData: any): string {
  if (reservaData.vestido || reservaData.traje || reservaData.complemento_novia || reservaData.complemento_novio) {
    return 'vestuario';
  }
  if (reservaData.servicio) {
    return 'otros';
  }
  return 'otros';
}
}