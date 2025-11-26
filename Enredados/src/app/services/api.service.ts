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

  // ========== MÉTODO HELPER: Agregar al presupuesto desde cualquier producto ==========
  agregarAlPresupuesto(item: any, usuarioId: number, tipo: 'servicio' | 'vestido' | 'traje' | 'complemento_novia' | 'complemento_novio'): Observable<any> {
    const itemData: any = {
      usuario: usuarioId,
      concepto: item.nombre,
      categoria: this.mapearCategoria(tipo),
      tipo_item: tipo,
      presupuestado: item.precio,
      gastado: 0,
      pagado: false
    };

    // Asignar la referencia correcta según el tipo
    switch (tipo) {
      case 'servicio':
        itemData.servicio = item.id;
        break;
      case 'vestido':
        itemData.vestido = item.id;
        break;
      case 'traje':
        itemData.traje = item.id;
        break;
      case 'complemento_novia':
        itemData.complemento_novia = item.id;
        break;
      case 'complemento_novio':
        itemData.complemento_novio = item.id;
        break;
    }

    return this.crearItemPresupuesto(itemData);
  }

  private mapearCategoria(tipo: string): string {
    const mapeo: any = {
      'servicio': 'otros',
      'vestido': 'vestuario',
      'traje': 'vestuario',
      'complemento_novia': 'vestuario',
      'complemento_novio': 'vestuario'
    };
    return mapeo[tipo] || 'otros';
  }
}