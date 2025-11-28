import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://127.0.0.1:8000/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no hay peticiones HTTP pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ========== TESTS DE SERVICIOS ==========
  
  // TEST 1: getCategorias
  it('debe obtener lista de categorías', () => {
    const mockCategorias = [
      { id: 1, nombre: 'DJ y Música' },
      { id: 2, nombre: 'Fotografía' }
    ];

    service.getCategorias().subscribe(categorias => {
      expect(categorias.length).toBe(2);
      expect(categorias).toEqual(mockCategorias);
    });

    const req = httpMock.expectOne(`${apiUrl}/categorias/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategorias);
  });

  // TEST 2: getProveedores
  it('debe obtener lista de proveedores', () => {
    const mockProveedores = [
      { id: 1, nombre: 'Eventos Audio' },
      { id: 2, nombre: 'FotoArte Studio' }
    ];

    service.getProveedores().subscribe(proveedores => {
      expect(proveedores.length).toBe(2);
      expect(proveedores).toEqual(mockProveedores);
    });

    const req = httpMock.expectOne(`${apiUrl}/proveedores/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProveedores);
  });

  // TEST 3: getServicios
  it('debe obtener lista de servicios', () => {
    const mockServicios = [
      { id: 1, nombre: 'DJ Profesional', precio: 500 },
      { id: 2, nombre: 'Fotógrafo Premium', precio: 1200 }
    ];

    service.getServicios().subscribe(servicios => {
      expect(servicios.length).toBe(2);
      expect(servicios).toEqual(mockServicios);
    });

    const req = httpMock.expectOne(`${apiUrl}/servicios/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockServicios);
  });

  // TEST 4: getServicio por ID
  it('debe obtener un servicio específico por ID', () => {
    const mockServicio = { id: 1, nombre: 'DJ Profesional', precio: 500 };

    service.getServicio(1).subscribe(servicio => {
      expect(servicio).toEqual(mockServicio);
      expect(servicio.id).toBe(1);
    });

    const req = httpMock.expectOne(`${apiUrl}/servicios/1/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockServicio);
  });

  // ========== TESTS DE VESTIDOS DE NOVIA ==========

  // TEST 5: getVestidosNovia
  it('debe obtener lista de vestidos de novia', () => {
    const mockVestidos = [
      { id: 1, nombre: 'Vestido Princesa', precio: 2500 },
      { id: 2, nombre: 'Vestido Sirena', precio: 3000 }
    ];

    service.getVestidosNovia().subscribe(vestidos => {
      expect(vestidos.length).toBe(2);
      expect(vestidos).toEqual(mockVestidos);
    });

    const req = httpMock.expectOne(`${apiUrl}/vestidos-novia/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockVestidos);
  });

  // TEST 6: getVestidosNovia con parámetros
  it('debe obtener vestidos con filtros de búsqueda', () => {
    const mockVestidos = [{ id: 1, nombre: 'Vestido Princesa', precio: 2500 }];
    const params = { estilo: 'princesa', precio_max: '3000' };

    service.getVestidosNovia(params).subscribe(vestidos => {
      expect(vestidos.length).toBe(1);
    });

    const req = httpMock.expectOne((request) => {
      return request.url === `${apiUrl}/vestidos-novia/` && 
             request.params.has('estilo') &&
             request.params.has('precio_max');
    });
    expect(req.request.method).toBe('GET');
    req.flush(mockVestidos);
  });

  // TEST 7: getVestidoNovia por ID
  it('debe obtener un vestido específico por ID', () => {
    const mockVestido = { id: 1, nombre: 'Vestido Princesa', precio: 2500 };

    service.getVestidoNovia(1).subscribe(vestido => {
      expect(vestido).toEqual(mockVestido);
    });

    const req = httpMock.expectOne(`${apiUrl}/vestidos-novia/1/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockVestido);
  });

  // ========== TESTS DE TRAJES DE NOVIO ==========

  // TEST 8: getTrajesNovio
  it('debe obtener lista de trajes de novio', () => {
    const mockTrajes = [
      { id: 1, nombre: 'Esmoquin Clásico', precio: 850 },
      { id: 2, nombre: 'Traje Azul Marino', precio: 950 }
    ];

    service.getTrajesNovio().subscribe(trajes => {
      expect(trajes.length).toBe(2);
      expect(trajes).toEqual(mockTrajes);
    });

    const req = httpMock.expectOne(`${apiUrl}/trajes-novio/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTrajes);
  });

  // TEST 9: getTrajeNovio por ID
  it('debe obtener un traje específico por ID', () => {
    const mockTraje = { id: 1, nombre: 'Esmoquin Clásico', precio: 850 };

    service.getTrajeNovio(1).subscribe(traje => {
      expect(traje).toEqual(mockTraje);
    });

    const req = httpMock.expectOne(`${apiUrl}/trajes-novio/1/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTraje);
  });

  // ========== TESTS DE COMPLEMENTOS ==========

  // TEST 10: getComplementosNovia
  it('debe obtener lista de complementos de novia', () => {
    const mockComplementos = [
      { id: 1, nombre: 'Velo Catedral', precio: 180 },
      { id: 2, nombre: 'Diadema Swarovski', precio: 250 }
    ];

    service.getComplementosNovia().subscribe(complementos => {
      expect(complementos.length).toBe(2);
      expect(complementos).toEqual(mockComplementos);
    });

    const req = httpMock.expectOne(`${apiUrl}/complementos-novia/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockComplementos);
  });

  // TEST 11: getComplementosNovio
  it('debe obtener lista de complementos de novio', () => {
    const mockComplementos = [
      { id: 1, nombre: 'Corbata Seda', precio: 45 },
      { id: 2, nombre: 'Gemelos Plata', precio: 85 }
    ];

    service.getComplementosNovio().subscribe(complementos => {
      expect(complementos.length).toBe(2);
      expect(complementos).toEqual(mockComplementos);
    });

    const req = httpMock.expectOne(`${apiUrl}/complementos-novio/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockComplementos);
  });

  // ========== TESTS DE TAREAS AGENDA ==========

  // TEST 12: getTareasAgenda
  it('debe obtener lista de tareas de agenda', () => {
    const mockTareas = [
      { id: 1, titulo: 'Reservar salón', completada: false },
      { id: 2, titulo: 'Contratar DJ', completada: true }
    ];

    service.getTareasAgenda().subscribe(tareas => {
      expect(tareas.length).toBe(2);
      expect(tareas).toEqual(mockTareas);
    });

    const req = httpMock.expectOne(`${apiUrl}/tareas-agenda/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTareas);
  });

  // TEST 13: getTareasAgenda con filtro de usuario
  it('debe obtener tareas filtradas por usuario', () => {
    const mockTareas = [{ id: 1, titulo: 'Reservar salón', usuario: 1 }];

    service.getTareasAgenda(1).subscribe(tareas => {
      expect(tareas.length).toBe(1);
    });

    const req = httpMock.expectOne(`${apiUrl}/tareas-agenda/?usuario=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTareas);
  });

  // TEST 14: crearTareaAgenda
  it('debe crear una nueva tarea en la agenda', () => {
    const nuevaTarea = {
      titulo: 'Probar pastel',
      descripcion: 'Cita en la pastelería',
      fecha: '2024-12-15',
      usuario: 1
    };
    const mockRespuesta = { id: 1, ...nuevaTarea };

    service.crearTareaAgenda(nuevaTarea).subscribe(tarea => {
      expect(tarea).toEqual(mockRespuesta);
      expect(tarea.id).toBe(1);
    });

    const req = httpMock.expectOne(`${apiUrl}/tareas-agenda/`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(nuevaTarea);
    req.flush(mockRespuesta);
  });

  // TEST 15: actualizarTareaAgenda
  it('debe actualizar una tarea existente', () => {
    const tareaActualizada = {
      titulo: 'Reservar salón',
      completada: true
    };
    const mockRespuesta = { id: 1, ...tareaActualizada };

    service.actualizarTareaAgenda(1, tareaActualizada).subscribe(tarea => {
      expect(tarea).toEqual(mockRespuesta);
    });

    const req = httpMock.expectOne(`${apiUrl}/tareas-agenda/1/`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(tareaActualizada);
    req.flush(mockRespuesta);
  });

  // TEST 16: eliminarTareaAgenda
  it('debe eliminar una tarea', () => {
    service.eliminarTareaAgenda(1).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/tareas-agenda/1/`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  // ========== TESTS DE PRESUPUESTO ==========

  // TEST 17: getPresupuesto
  it('debe obtener items de presupuesto', () => {
    const mockItems = [
      { id: 1, concepto: 'Salón', presupuestado: 5000, gastado: 4800 },
      { id: 2, concepto: 'Catering', presupuestado: 3000, gastado: 0 }
    ];

    service.getPresupuesto().subscribe(items => {
      expect(items.length).toBe(2);
      expect(items).toEqual(mockItems);
    });

    const req = httpMock.expectOne(`${apiUrl}/presupuesto/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockItems);
  });

  // TEST 18: crearItemPresupuesto
  it('debe crear un nuevo item de presupuesto', () => {
    const nuevoItem = {
      concepto: 'Flores',
      presupuestado: 800,
      gastado: 0,
      usuario: 1
    };
    const mockRespuesta = { id: 1, ...nuevoItem };

    service.crearItemPresupuesto(nuevoItem).subscribe(item => {
      expect(item).toEqual(mockRespuesta);
    });

    const req = httpMock.expectOne(`${apiUrl}/presupuesto/`);
    expect(req.request.method).toBe('POST');
    req.flush(mockRespuesta);
  });

  // ========== TESTS DE VALORACIONES ==========

  // TEST 19: getValoraciones
  it('debe obtener lista de valoraciones', () => {
    const mockValoraciones = [
      { id: 1, puntuacion: 5, comentario: 'Excelente' },
      { id: 2, puntuacion: 4, comentario: 'Muy bueno' }
    ];

    service.getValoraciones().subscribe(valoraciones => {
      expect(valoraciones.length).toBe(2);
      expect(valoraciones).toEqual(mockValoraciones);
    });

    const req = httpMock.expectOne(`${apiUrl}/valoraciones/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockValoraciones);
  });

  // TEST 20: crearValoracion
  it('debe crear una nueva valoración', () => {
    const nuevaValoracion = {
      usuario: 1,
      servicio: 1,
      puntuacion: 5,
      comentario: 'Excelente servicio'
    };
    const mockRespuesta = { id: 1, ...nuevaValoracion };

    service.crearValoracion(nuevaValoracion).subscribe(valoracion => {
      expect(valoracion).toEqual(mockRespuesta);
    });

    const req = httpMock.expectOne(`${apiUrl}/valoraciones/`);
    expect(req.request.method).toBe('POST');
    req.flush(mockRespuesta);
  });

  // ========== TESTS DE RESERVAS ==========

  // TEST 21: crearReserva
  it('debe crear una nueva reserva', () => {
    const nuevaReserva = {
      usuario: 1,
      servicio: 1,
      fecha_evento: '2024-12-31',
      estado: 'pendiente'
    };
    const mockRespuesta = { id: 1, ...nuevaReserva };

    service.crearReserva(nuevaReserva).subscribe(reserva => {
      expect(reserva).toEqual(mockRespuesta);
    });

    const req = httpMock.expectOne(`${apiUrl}/reservas/`);
    expect(req.request.method).toBe('POST');
    req.flush(mockRespuesta);
  });

  // TEST 22: getReservasUsuario
  it('debe obtener reservas de un usuario específico', () => {
    const mockReservas = [
      { id: 1, usuario: 1, servicio: 1, estado: 'pendiente' },
      { id: 2, usuario: 1, servicio: 2, estado: 'confirmada' }
    ];

    service.getReservasUsuario(1).subscribe(reservas => {
      expect(reservas.length).toBe(2);
    });

    const req = httpMock.expectOne(`${apiUrl}/reservas/?usuario=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockReservas);
  });

  // TEST 23: cancelarReserva
  it('debe cancelar una reserva', () => {
    const mockRespuesta = { id: 1, estado: 'cancelada' };

    service.cancelarReserva(1).subscribe(reserva => {
      expect(reserva.estado).toBe('cancelada');
    });

    const req = httpMock.expectOne(`${apiUrl}/reservas/1/`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ estado: 'cancelada' });
    req.flush(mockRespuesta);
  });

  // TEST 24: Manejo de errores HTTP
  it('debe manejar error 404', () => {
    service.getServicio(999).subscribe(
      () => fail('debería haber fallado con error 404'),
      (error) => {
        expect(error.status).toBe(404);
      }
    );

    const req = httpMock.expectOne(`${apiUrl}/servicios/999/`);
    req.flush('Servicio no encontrado', { status: 404, statusText: 'Not Found' });
  });

  // TEST 25: Manejo de error 500
  it('debe manejar error 500 del servidor', () => {
    service.getServicios().subscribe(
      () => fail('debería haber fallado con error 500'),
      (error) => {
        expect(error.status).toBe(500);
      }
    );

    const req = httpMock.expectOne(`${apiUrl}/servicios/`);
    req.flush('Error interno', { status: 500, statusText: 'Internal Server Error' });
  });
});