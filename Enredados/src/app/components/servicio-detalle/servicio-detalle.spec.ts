import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicioDetalleComponent } from './servicio-detalle';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';

describe('ServicioDetalleComponent', () => {
  let component: ServicioDetalleComponent;
  let fixture: ComponentFixture<ServicioDetalleComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  const mockServicio = {
    id: 1,
    nombre: 'DJ Profesional para Bodas',
    proveedor_nombre: 'Eventos Audio Premium',
    categoria_nombre: 'DJ y Música',
    precio: 850,
    descripcion: 'Servicio completo de DJ con equipo de sonido profesional',
    disponible: true,
    imagen: 'https://example.com/dj.jpg'
  };

  const mockValoraciones = [
    {
      id: 1,
      usuario_nombre: 'Juan Pérez',
      servicio: 1,
      puntuacion: 5,
      comentario: 'Excelente servicio, muy profesional',
      fecha: '2024-01-15'
    },
    {
      id: 2,
      usuario_nombre: 'María García',
      servicio: 1,
      puntuacion: 4,
      comentario: 'Muy buen DJ, recomendado',
      fecha: '2024-02-20'
    }
  ];

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getServicio',
      'getValoraciones',
      'crearReserva',
      'crearValoracion'
    ]);
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'isLoggedIn',
      'getUserId',
      'getUsername'
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ServicioDetalleComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicioDetalleComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST 1: Cargar servicio correctamente
  it('debe cargar el servicio al inicializar', () => {
    apiService.getServicio.and.returnValue(of(mockServicio));
    apiService.getValoraciones.and.returnValue(of(mockValoraciones));

    component.ngOnInit();

    expect(apiService.getServicio).toHaveBeenCalledWith(1);
    expect(component.servicio).toEqual(mockServicio);
    expect(component.cargando).toBe(false);
  });

  // TEST 2: Cargar valoraciones del servicio
  it('debe cargar las valoraciones del servicio', () => {
    apiService.getServicio.and.returnValue(of(mockServicio));
    apiService.getValoraciones.and.returnValue(of(mockValoraciones));

    component.ngOnInit();

    expect(apiService.getValoraciones).toHaveBeenCalled();
    expect(component.valoraciones.length).toBe(2);
  });

  // TEST 3: Filtrar valoraciones del servicio actual
  it('debe filtrar solo las valoraciones del servicio actual', () => {
    const todasValoraciones = [
      ...mockValoraciones,
      {
        id: 3,
        usuario_nombre: 'Pedro López',
        servicio: 2, // Servicio diferente
        puntuacion: 5,
        comentario: 'Otro servicio',
        fecha: '2024-03-10'
      }
    ];

    apiService.getServicio.and.returnValue(of(mockServicio));
    apiService.getValoraciones.and.returnValue(of(todasValoraciones));

    component.ngOnInit();

    expect(component.valoraciones.length).toBe(2);
    expect(component.valoraciones.every(v => v.servicio === 1)).toBe(true);
  });

  // TEST 4: Manejar error al cargar servicio
  it('debe manejar error al cargar el servicio', () => {
    apiService.getServicio.and.returnValue(throwError(() => new Error('Error de red')));
    apiService.getValoraciones.and.returnValue(of([]));
    
    spyOn(window, 'alert');
    component.ngOnInit();

    expect(component.cargando).toBe(false);
    expect(window.alert).toHaveBeenCalledWith('Error al cargar el servicio');
    expect(router.navigate).toHaveBeenCalledWith(['/servicios']);
  });

  // TEST 5: Toggle formulario de reserva
  it('debe mostrar/ocultar formulario de reserva', () => {
    expect(component.mostrarFormularioReserva).toBe(false);
    
    component.toggleFormularioReserva();
    expect(component.mostrarFormularioReserva).toBe(true);
    
    component.toggleFormularioReserva();
    expect(component.mostrarFormularioReserva).toBe(false);
  });

  // TEST 6: Validar fecha en reserva
  it('debe validar que se ingrese una fecha para la reserva', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getUserId.and.returnValue(1);
    
    component.servicio = mockServicio;
    component.fechaEvento = '';
    
    spyOn(window, 'alert');
    component.realizarReserva();

    expect(window.alert).toHaveBeenCalledWith('Por favor, selecciona una fecha para el evento');
    expect(apiService.crearReserva).not.toHaveBeenCalled();
  });

  // TEST 7: Crear reserva exitosamente
  it('debe crear una reserva exitosamente', (done) => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getUserId.and.returnValue(1);
    
    const mockRespuesta = {
      id: 1,
      usuario: 1,
      servicio: 1,
      fecha_evento: '2024-12-31',
      estado: 'pendiente'
    };
    
    apiService.crearReserva.and.returnValue(of(mockRespuesta));
    
    component.servicio = mockServicio;
    component.fechaEvento = '2024-12-31';
    component.comentarios = 'Boda especial';
    component.realizarReserva();

    expect(component.reservaEnviando).toBe(false);
    expect(component.reservaExitosa).toBe(true);
    expect(apiService.crearReserva).toHaveBeenCalledWith({
      usuario: 1,
      servicio: 1,
      fecha_evento: '2024-12-31',
      estado: 'pendiente',
      comentarios: 'Boda especial'
    });

    // Verificar que se limpia después de 3 segundos
    setTimeout(() => {
      expect(component.mostrarFormularioReserva).toBe(false);
      expect(component.reservaExitosa).toBe(false);
      done();
    }, 3100);
  });

  // TEST 8: Redirigir a login si no está autenticado
  it('debe redirigir a login si intenta reservar sin autenticarse', () => {
    authService.isLoggedIn.and.returnValue(false);
    spyOn(window, 'alert');
    
    component.realizarReserva();

    expect(window.alert).toHaveBeenCalledWith('Debes iniciar sesión para hacer una reserva');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  // TEST 9: Toggle formulario de valoración
  it('debe mostrar/ocultar formulario de valoración', () => {
    expect(component.mostrarFormularioValoracion).toBe(false);
    
    component.toggleFormularioValoracion();
    expect(component.mostrarFormularioValoracion).toBe(true);
    
    component.toggleFormularioValoracion();
    expect(component.mostrarFormularioValoracion).toBe(false);
  });

  // TEST 10: Validar comentario en valoración
  it('debe validar que se ingrese un comentario para la valoración', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getUserId.and.returnValue(1);
    
    component.nuevaValoracion.comentario = '';
    
    spyOn(window, 'alert');
    component.enviarValoracion();

    expect(window.alert).toHaveBeenCalledWith('Por favor, escribe un comentario');
    expect(apiService.crearValoracion).not.toHaveBeenCalled();
  });

  // TEST 11: Crear valoración exitosamente
  it('debe crear una valoración exitosamente', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getUserId.and.returnValue(1);
    apiService.getServicio.and.returnValue(of(mockServicio));
    apiService.getValoraciones.and.returnValue(of(mockValoraciones));
    
    const mockRespuesta = {
      id: 3,
      usuario: 1,
      servicio: 1,
      puntuacion: 5,
      comentario: 'Excelente servicio'
    };
    
    apiService.crearValoracion.and.returnValue(of(mockRespuesta));
    
    component.servicio = mockServicio;
    component.nuevaValoracion.puntuacion = 5;
    component.nuevaValoracion.comentario = 'Excelente servicio';
    
    spyOn(window, 'alert');
    component.enviarValoracion();

    expect(component.valoracionEnviando).toBe(false);
    expect(component.mostrarFormularioValoracion).toBe(false);
    expect(window.alert).toHaveBeenCalledWith('¡Gracias por tu valoración!');
    expect(apiService.crearValoracion).toHaveBeenCalledWith({
      usuario: 1,
      servicio: 1,
      puntuacion: 5,
      comentario: 'Excelente servicio'
    });
  });

  // TEST 12: Calcular promedio de valoraciones
  it('debe calcular correctamente el promedio de valoraciones', () => {
    component.valoraciones = mockValoraciones;
    
    const promedio = component.calcularPromedioValoraciones();
    
    expect(promedio).toBe(4.5); // (5 + 4) / 2 = 4.5
  });

  // TEST 13: Promedio con valoraciones vacías
  it('debe retornar 0 si no hay valoraciones', () => {
    component.valoraciones = [];
    
    const promedio = component.calcularPromedioValoraciones();
    
    expect(promedio).toBe(0);
  });

  // TEST 14: Generar estrellas correctamente
  it('debe generar array de estrellas correctamente', () => {
    const estrellas = component.generarEstrellas(3);
    
    expect(estrellas).toEqual(['★', '★', '★', '☆', '☆']);
  });

  // TEST 15: Generar estrellas con puntuación máxima
  it('debe generar 5 estrellas llenas con puntuación 5', () => {
    const estrellas = component.generarEstrellas(5);
    
    expect(estrellas).toEqual(['★', '★', '★', '★', '★']);
  });

  // TEST 16: Generar estrellas con puntuación mínima
  it('debe generar 5 estrellas vacías con puntuación 0', () => {
    const estrellas = component.generarEstrellas(0);
    
    expect(estrellas).toEqual(['☆', '☆', '☆', '☆', '☆']);
  });

  // TEST 17: Manejar error al crear reserva
  it('debe manejar error al crear reserva', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getUserId.and.returnValue(1);
    apiService.crearReserva.and.returnValue(throwError(() => new Error('Error de red')));
    
    component.servicio = mockServicio;
    component.fechaEvento = '2024-12-31';
    
    spyOn(window, 'alert');
    component.realizarReserva();

    expect(component.reservaEnviando).toBe(false);
    expect(window.alert).toHaveBeenCalledWith('Error al crear la reserva. Por favor, intenta de nuevo.');
  });

  // TEST 18: Manejar error al crear valoración
  it('debe manejar error al crear valoración', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getUserId.and.returnValue(1);
    apiService.crearValoracion.and.returnValue(throwError(() => new Error('Error de red')));
    
    component.servicio = mockServicio;
    component.nuevaValoracion.comentario = 'Test';
    
    spyOn(window, 'alert');
    component.enviarValoracion();

    expect(component.valoracionEnviando).toBe(false);
    expect(window.alert).toHaveBeenCalledWith('Error al enviar la valoración. Por favor, intenta de nuevo.');
  });

  // TEST 19: Verificar renderizado de título del servicio
  it('debe renderizar el nombre del servicio', () => {
    apiService.getServicio.and.returnValue(of(mockServicio));
    apiService.getValoraciones.and.returnValue(of([]));
    
    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('DJ Profesional para Bodas');
  });

  // TEST 20: Verificar que muestra precio del servicio
  it('debe mostrar el precio del servicio', () => {
    apiService.getServicio.and.returnValue(of(mockServicio));
    apiService.getValoraciones.and.returnValue(of([]));
    
    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const precioElement = compiled.querySelector('.precio-valor');
    expect(precioElement?.textContent).toContain('850€');
  });
});