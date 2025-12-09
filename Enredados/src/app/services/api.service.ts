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
    console.log('🚀 Iniciando cancelación de reserva:', reservaId);
    
    // Primero actualizar la reserva a cancelada
    return this.http.patch(`${this.apiUrl}/reservas/${reservaId}/`, { estado: 'cancelada' }).pipe(
      switchMap((reservaActualizada: any) => {
        console.log('✅ Reserva actualizada:', reservaActualizada);
        
        // Ahora buscar y actualizar el presupuesto relacionado
        return this.http.get(`${this.apiUrl}/presupuesto/?usuario=${reservaActualizada.usuario}`).pipe(
          switchMap((items: any) => {
            console.log('💰 Items de presupuesto encontrados:', items);
            
            // Buscar el item relacionado con esta reserva
            const itemRelacionado = items.find((item: any) => {
              const coincide = (
                (reservaActualizada.servicio && item.servicio === reservaActualizada.servicio) ||
                (reservaActualizada.vestido && item.vestido === reservaActualizada.vestido) ||
                (reservaActualizada.traje && item.traje === reservaActualizada.traje) ||
                (reservaActualizada.complemento_novia && item.complemento_novia === reservaActualizada.complemento_novia) ||
                (reservaActualizada.complemento_novio && item.complemento_novio === reservaActualizada.complemento_novio)
              );
              
              if (coincide) {
                console.log('✅ Item de presupuesto relacionado encontrado:', item);
              }
              
              return coincide;
            });

            if (itemRelacionado) {
              // Actualizar el presupuesto: poner gastado a 0 y pagado a false
              console.log('💵 Actualizando item de presupuesto:', itemRelacionado.id);
              
              return this.http.patch(`${this.apiUrl}/presupuesto/${itemRelacionado.id}/`, {
                gastado: 0,
                pagado: false
              }).pipe(
                map(() => {
                  console.log('✅ Presupuesto actualizado correctamente');
                  return reservaActualizada;
                }),
                catchError((error) => {
                  console.error('⚠️ Error al actualizar presupuesto (pero reserva ya cancelada):', error);
                  // Retornar la reserva aunque falle el presupuesto
                  return of(reservaActualizada);
                })
              );
            } else {
              console.log('ℹ️ No se encontró item de presupuesto relacionado');
              return of(reservaActualizada);
            }
          }),
          catchError((error) => {
            console.error('⚠️ Error al buscar presupuesto (pero reserva ya cancelada):', error);
            // Retornar la reserva aunque falle la búsqueda del presupuesto
            return of(reservaActualizada);
          })
        );
      }),
      catchError((error) => {
        console.error('❌ Error al cancelar reserva:', error);
        throw error;
      })
    );
  }

  // ========== CREAR RESERVA CON PRESUPUESTO AUTOMÁTICO ==========
  crearReservaConPresupuesto(reservaData: any, producto: any, usuarioId: number): Observable<any> {
    console.log('🚀 Iniciando creación de reserva con presupuesto');
    console.log('📝 Datos de reserva:', reservaData);
    console.log('📦 Producto:', producto);
    
    // Primero crear la reserva
    return this.crearReserva(reservaData).pipe(
      switchMap((reserva: any) => {
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

        // Crear item de presupuesto
        const presupuestoData = {
          usuario: usuarioId,
          concepto: concepto,
          categoria: categoria,
          tipo_item: tipo_item,
          presupuestado: producto.precio,
          gastado: producto.precio, // Dinero ya comprometido
          pagado: false,
          servicio: reservaData.servicio || null,
          vestido: reservaData.vestido || null,
          traje: reservaData.traje || null,
          complemento_novia: reservaData.complemento_novia || null,
          complemento_novio: reservaData.complemento_novio || null
        };

        console.log('💰 Creando item de presupuesto:', presupuestoData);

        return this.crearItemPresupuesto(presupuestoData).pipe(
          map((presupuesto: any) => {
            console.log('✅ Presupuesto creado:', presupuesto);
            return { reserva, presupuesto };
          }),
          catchError((error: any) => {
            console.error('⚠️ Error al crear presupuesto:', error);
            // Retornar la reserva aunque falle el presupuesto
            return of({ reserva, presupuesto: null, error: 'presupuesto_failed' });
          })
        );
      }),
      catchError((error: any) => {
        console.error('❌ Error al crear reserva:', error);
        throw error;
      })
    );
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