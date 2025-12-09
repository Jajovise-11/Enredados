import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

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

  // ========== CANCELAR RESERVA CON ACTUALIZACIÓN DE PRESUPUESTO ==========
  cancelarReserva(reservaId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/reservas/${reservaId}/`).pipe(
      switchMap((reserva: any) => {
        // Marcar reserva como cancelada
        const actualizarReserva$ = this.http.patch(`${this.apiUrl}/reservas/${reservaId}/`, { 
          estado: 'cancelada' 
        });

        // Buscar y actualizar el item de presupuesto relacionado
        const buscarPresupuesto$ = this.http.get(`${this.apiUrl}/presupuesto/?usuario=${reserva.usuario}`).pipe(
          switchMap((items: any) => {
            // Encontrar el item relacionado con esta reserva
            const itemRelacionado = items.find((item: any) => {
              if (reserva.servicio && item.servicio === reserva.servicio) return true;
              if (reserva.vestido && item.vestido === reserva.vestido) return true;
              if (reserva.traje && item.traje === reserva.traje) return true;
              if (reserva.complemento_novia && item.complemento_novia === reserva.complemento_novia) return true;
              if (reserva.complemento_novio && item.complemento_novio === reserva.complemento_novio) return true;
              return false;
            });

            if (itemRelacionado) {
              // Actualizar el item de presupuesto: poner gastado a 0
              return this.http.put(`${this.apiUrl}/presupuesto/${itemRelacionado.id}/`, {
                ...itemRelacionado,
                gastado: 0,
                pagado: false
              });
            }
            return of(null);
          }),
          catchError(() => of(null)) // Si no hay presupuesto, continuar
        );

        // Ejecutar ambas operaciones
        return forkJoin({
          reserva: actualizarReserva$,
          presupuesto: buscarPresupuesto$
        }).pipe(
          map(resultado => resultado.reserva)
        );
      })
    );
  }

  // ========== CREAR RESERVA CON PRESUPUESTO AUTOMÁTICO ==========
  crearReservaConPresupuesto(reservaData: any, producto: any, usuarioId: number): Observable<any> {
    return new Observable(observer => {
      // Primero crear la reserva
      this.crearReserva(reservaData).subscribe({
        next: (reserva: any) => {
          console.log('✅ Reserva creada:', reserva);

          // Determinar tipo de item y categoría
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

          // Crear item de presupuesto con GASTADO = PRECIO (dinero ya comprometido)
          const presupuestoData = {
            usuario: usuarioId,
            concepto: concepto,
            categoria: categoria,
            tipo_item: tipo_item,
            presupuestado: producto.precio,
            gastado: producto.precio, // ⚠️ IMPORTANTE: El dinero ya está comprometido
            pagado: false, // Todavía no se ha pagado
            // Incluir referencias al producto específico
            servicio: reservaData.servicio || null,
            vestido: reservaData.vestido || null,
            traje: reservaData.traje || null,
            complemento_novia: reservaData.complemento_novia || null,
            complemento_novio: reservaData.complemento_novio || null
          };

          console.log('💰 Creando item de presupuesto:', presupuestoData);

          this.crearItemPresupuesto(presupuestoData).subscribe({
            next: (presupuesto: any) => {
              console.log('✅ Presupuesto creado:', presupuesto);
              observer.next({ reserva, presupuesto });
              observer.complete();
            },
            error: (error: any) => {
              console.error('❌ Error al crear presupuesto:', error);
              // Si falla el presupuesto, informar pero devolver la reserva
              observer.next({ reserva, presupuesto: null, error: 'presupuesto_failed' });
              observer.complete();
            }
          });
        },
        error: (error: any) => {
          console.error('❌ Error al crear reserva:', error);
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