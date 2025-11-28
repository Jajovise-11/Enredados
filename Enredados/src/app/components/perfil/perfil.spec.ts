import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilComponent } from './perfil';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { of, throwError } from 'rxjs';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let apiService: jasmine.SpyObj<ApiService>;
  let router: jasmine.SpyObj<Router>;

  const mockUsuario = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    first_name: 'Test',
    last_name: 'User'
  };

  const mockReservas = [
    {
      id: 1,
      servicio: 1,
      servicio_nombre: 'DJ Profesional',
      fecha_evento: '2024-12-31',
      fecha_reserva: '2024-11-15',
      estado: 'pendiente',
      comentarios: 'Boda especial'
    },
    {
      id: 2,
      servicio: 2,
      servicio_nombre: 'Fotógrafo Premium',
      fecha_evento: '2024-12-31',
      fecha_reserva: '2024-11-16',
      estado: 'confirmada',
      comentarios: ''
    }
  ];

  const mockValoraciones = [
    {
      id: 1,
      servicio: 1,
      servicio_nombre: 'DJ Profesional',
      puntuacion: 5,
      comentario: 'Excelente servicio',
      fecha: '2024-11-10'
    }
  ];

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'isLoggedIn',
      'currentUserValue',
      'getUserId',
      'logout'
    ]);
    const apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getReservasUsuario',
      'getValoracionesUsuario',
      'cancelarReserva',
      'eliminarValoracion'
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        PerfilComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST 1: Redirigir si no está autenticado
  it('debe redirigir a login si no está autenticado', () => {
    authService.isLoggedIn.and.returnValue(false);
    
    component.ngOnInit();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  // TEST 2: Cargar datos del usuario
  it('debe cargar datos del usuario al inicializar', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getUserId.and.returnValue(1);
    Object.defineProperty(authService, 'currentUserValue', { 
      get: () => mockUsuario 
    });
    apiService.getReservasUsuario.and.returnValue(of(mockReservas));
    apiService.getValoracionesUsuario.and.returnValue(of(mockValoraciones));

    component.ngOnInit();

    expect(component.usuario).toEqual(mockUsuario);
  });

  // TEST 3: Cargar reservas del usuario
  it('debe cargar reservas del usuario', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getUserId.and.returnValue(1);
    Object.defineProperty(authService, 'currentUserValue', { 
      get: () => mockUsuario 
    });
    apiService.getReservasUsuario.and.returnValue(of(mockReservas));
    apiService.getValoracionesUsuario.and.returnValue(of(mockValoraciones));

    component.ngOnInit();

    expect(apiService.getReservasUsuario).toHaveBeenCalledWith(1);
    expect(component.reservas.length).toBe(2);
  });

  // TEST 4: Ordenar reservas por fecha
  it('debe ordenar reservas por fecha descendente', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getUserId.and.returnValue(1);
    Object.defineProperty(authService, 'currentUserValue', { 
      get: () => mockUsuario 
    });
    apiService.getReservasUsuario.and.returnValue(of(mockReservas));
    apiService.getValoracionesUsuario.and.returnValue(of(mockValoraciones));

    component.ngOnInit();

    expect(component.reservas[0].fecha_reserva >= component.reservas[1].fecha_reserva).toBe(true);
  });

  // TEST 5: Cargar valoraciones del usuario
  it('debe cargar valoraciones del usuario', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getUserId.and.returnValue(1);
    Object.defineProperty(authService, 'currentUserValue', { 
      get: () => mockUsuario 
    });
    apiService.getReservasUsuario.and.returnValue(of([]));
    apiService.getValoracionesUsuario.and.returnValue(of(mockValoraciones));

    component.ngOnInit();

    expect(apiService.getValoracionesUsuario).toHaveBeenCalledWith(1);
    expect(component.valoraciones.length).toBe(1);
  });

  // TEST 6: Cambiar entre pestañas
  it('debe cambiar entre pestañas correctamente', () => {
    expect(component.pestanaActiva).toBe('reservas');
    
    component.cambiarPestana('valoraciones');
    expect(component.pestanaActiva).toBe('valoraciones');
    
    component.cambiarPestana('reservas');
    expect(component.pestanaActiva).toBe('reservas');
  });

  // TEST 7: Cancelar reserva con confirmación
  it('debe cancelar reserva tras confirmación', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert');
    apiService.cancelarReserva.and.returnValue(of({ id: 1, estado: 'cancelada' }));
    authService.isLoggedIn.and.returnValue(true);
    authService.getUserId.and.returnValue(1);
    Object.defineProperty(authService, 'currentUserValue', { 
      get: () => mockUsuario 
    });
    apiService.getReservasUsuario.and.returnValue(of([]));
    apiService.getValoracionesUsuario.and.returnValue(of([]));

    component.cancelarReserva(1);

    expect(window.confirm).toHaveBeenCalled();
    expect(apiService.cancelarReserva).toHaveBeenCalledWith(1);
    expect(window.alert).toHaveBeenCalledWith('Reserva cancelada exitosamente');
  });

  // TEST 8: No cancelar si usuario rechaza confirmación
  it('no debe cancelar reserva si usuario rechaza', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    
    component.cancelarReserva(1);

    expect(apiService.cancelarReserva).not.toHaveBeenCalled();
  });

  // TEST 9: Eliminar valoración con confirmación
  it('debe eliminar valoración tras confirmación', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert');
    apiService.eliminarValoracion.and.returnValue(of(null));
    authService.isLoggedIn.and.returnValue(true);
    authService.getUserId.and.returnValue(1);
    Object.defineProperty(authService, 'currentUserValue', { 
      get: () => mockUsuario 
    });
    apiService.getReservasUsuario.and.returnValue(of([]));
    apiService.getValoracionesUsuario.and.returnValue(of([]));

    component.eliminarValoracion(1);

    expect(window.confirm).toHaveBeenCalled();
    expect(apiService.eliminarValoracion).toHaveBeenCalledWith(1);
  });

  // TEST 10: Obtener clase CSS según estado
  it('debe retornar clase CSS correcta según estado de reserva', () => {
    expect(component.getEstadoBadgeClass('pendiente')).toBe('badge-pendiente');
    expect(component.getEstadoBadgeClass('confirmada')).toBe('badge-confirmada');
    expect(component.getEstadoBadgeClass('cancelada')).toBe('badge-cancelada');
    expect(component.getEstadoBadgeClass('completada')).toBe('badge-completada');
  });

  // TEST 11: Generar estrellas correctamente
  it('debe generar array de estrellas', () => {
    const estrellas = component.generarEstrellas(3);
    expect(estrellas).toEqual(['★', '★', '★', '☆', '☆']);
  });

  // TEST 12: Logout
  it('debe hacer logout y redirigir', () => {
    component.logout();

    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  // TEST 13: Manejar error al cargar reservas
  it('debe manejar error al cargar reservas', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getUserId.and.returnValue(1);
    Object.defineProperty(authService, 'currentUserValue', { 
      get: () => mockUsuario 
    });
    apiService.getReservasUsuario.and.returnValue(throwError(() => new Error('Error de red')));
    apiService.getValoracionesUsuario.and.returnValue(of([]));

    spyOn(console, 'error');
    component.ngOnInit();

    expect(console.error).toHaveBeenCalled();
  });

  // TEST 14: Manejar error al cancelar reserva
  it('debe manejar error al cancelar reserva', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert');
    apiService.cancelarReserva.and.returnValue(throwError(() => new Error('Error')));

    component.cancelarReserva(1);

    expect(window.alert).toHaveBeenCalledWith('Error al cancelar la reserva');
  });

  // TEST 15: Renderizar información del usuario
  it('debe renderizar información del usuario', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getUserId.and.returnValue(1);
    Object.defineProperty(authService, 'currentUserValue', { 
      get: () => mockUsuario 
    });
    apiService.getReservasUsuario.and.returnValue(of([]));
    apiService.getValoracionesUsuario.and.returnValue(of([]));

    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Test User');
  });

  // TEST 16: Mostrar mensaje cuando no hay reservas
  it('debe mostrar mensaje cuando no hay reservas', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getUserId.and.returnValue(1);
    Object.defineProperty(authService, 'currentUserValue', { 
      get: () => mockUsuario 
    });
    apiService.getReservasUsuario.and.returnValue(of([]));
    apiService.getValoracionesUsuario.and.returnValue(of([]));

    component.ngOnInit();
    component.cargando = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.empty-state')).toBeTruthy();
  });

  // TEST 17: Desactivar loading tras cargar datos
  it('debe desactivar loading tras cargar datos', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getUserId.and.returnValue(1);
    Object.defineProperty(authService, 'currentUserValue', { 
      get: () => mockUsuario 
    });
    apiService.getReservasUsuario.and.returnValue(of([]));
    apiService.getValoracionesUsuario.and.returnValue(of([]));

    component.ngOnInit();

    expect(component.cargando).toBe(false);
  });

  // TEST 18: Verificar avatar con inicial
  it('debe mostrar inicial del usuario en avatar', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getUserId.and.returnValue(1);
    Object.defineProperty(authService, 'currentUserValue', { 
      get: () => mockUsuario 
    });
    apiService.getReservasUsuario.and.returnValue(of([]));
    apiService.getValoracionesUsuario.and.returnValue(of([]));

    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const avatar = compiled.querySelector('.avatar');
    expect(avatar?.textContent).toContain('T'); // Primera letra de 'testuser'
  });

  // TEST 19: Mostrar botón de logout
  it('debe mostrar botón de cerrar sesión', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getUserId.and.returnValue(1);
    Object.defineProperty(authService, 'currentUserValue', { 
      get: () => mockUsuario 
    });
    apiService.getReservasUsuario.and.returnValue(of([]));
    apiService.getValoracionesUsuario.and.returnValue(of([]));

    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.btn-logout')).toBeTruthy();
  });

  // TEST 20: Verificar pestañas clickeables
  it('debe tener pestañas clickeables', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getUserId.and.returnValue(1);
    Object.defineProperty(authService, 'currentUserValue', { 
      get: () => mockUsuario 
    });
    apiService.getReservasUsuario.and.returnValue(of([]));
    apiService.getValoracionesUsuario.and.returnValue(of([]));

    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const pestanas = compiled.querySelectorAll('.pestana');
    expect(pestanas.length).toBeGreaterThan(0);
  });
});