import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroComponent } from './registro';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['register', 'isLoggedIn']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        RegistroComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST 1: Verificar inicialización
  it('debe inicializar con valores vacíos', () => {
    expect(component.formData.username).toBe('');
    expect(component.formData.password).toBe('');
    expect(component.formData.password2).toBe('');
    expect(component.formData.email).toBe('');
    expect(component.error).toBe('');
    expect(component.success).toBe(false);
    expect(component.loading).toBe(false);
  });

  // TEST 2: Validar campos obligatorios
  it('debe mostrar error si faltan campos obligatorios', () => {
    component.formData.username = '';
    component.formData.password = 'test123';
    
    component.onSubmit();

    expect(component.error).toBe('Usuario y contraseña son obligatorios');
  });

  // TEST 3: Validar que las contraseñas coinciden
  it('debe mostrar error si las contraseñas no coinciden', () => {
    component.formData.username = 'testuser';
    component.formData.password = 'password123';
    component.formData.password2 = 'password456';
    
    component.onSubmit();

    expect(component.error).toBe('Las contraseñas no coinciden');
  });

  // TEST 4: Validar longitud mínima de contraseña
  it('debe mostrar error si la contraseña es muy corta', () => {
    component.formData.username = 'testuser';
    component.formData.password = '12345';
    component.formData.password2 = '12345';
    
    component.onSubmit();

    expect(component.error).toBe('La contraseña debe tener al menos 6 caracteres');
  });

  // TEST 5: Registro exitoso
  it('debe registrar usuario exitosamente', (done) => {
    const mockResponse = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      message: 'Usuario creado exitosamente'
    };

    authService.register.and.returnValue(of(mockResponse));

    component.formData.username = 'testuser';
    component.formData.password = 'password123';
    component.formData.password2 = 'password123';
    component.formData.email = 'test@example.com';
    
    component.onSubmit();

    expect(component.loading).toBe(false);
    expect(component.success).toBe(true);
    expect(component.error).toBe('');

    // Verificar redirección después de 2 segundos
    setTimeout(() => {
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      done();
    }, 2100);
  });

  // TEST 6: Manejar error en registro
  it('debe mostrar error cuando el registro falla', () => {
    const mockError = {
      error: { error: 'El usuario ya existe' }
    };

    authService.register.and.returnValue(throwError(() => mockError));

    component.formData.username = 'testuser';
    component.formData.password = 'password123';
    component.formData.password2 = 'password123';
    
    component.onSubmit();

    expect(component.loading).toBe(false);
    expect(component.error).toBe('El usuario ya existe');
  });

  // TEST 7: Verificar que loading se activa
  it('debe activar loading durante el registro', () => {
    const mockResponse = { id: 1, username: 'test' };
    authService.register.and.returnValue(of(mockResponse));

    component.formData.username = 'testuser';
    component.formData.password = 'password123';
    component.formData.password2 = 'password123';
    
    expect(component.loading).toBe(false);
    component.onSubmit();
    expect(component.loading).toBe(false); // Se desactiva tras la respuesta
  });

  // TEST 8: Verificar mensaje genérico de error
  it('debe mostrar mensaje genérico si la API falla sin mensaje', () => {
    const mockError = { error: {} };
    authService.register.and.returnValue(throwError(() => mockError));

    component.formData.username = 'testuser';
    component.formData.password = 'password123';
    component.formData.password2 = 'password123';
    
    component.onSubmit();

    expect(component.error).toBe('Error al crear la cuenta. Por favor, intenta de nuevo.');
  });

  // TEST 9: Redirigir si ya está autenticado
  it('debe redirigir si el usuario ya está autenticado', () => {
    authService.isLoggedIn.and.returnValue(true);
    
    const newFixture = TestBed.createComponent(RegistroComponent);
    
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  // TEST 10: Renderizado del formulario
  it('debe renderizar el formulario correctamente', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('h1')?.textContent).toContain('Crear Cuenta');
    expect(compiled.querySelector('#username')).toBeTruthy();
    expect(compiled.querySelector('#password')).toBeTruthy();
    expect(compiled.querySelector('#password2')).toBeTruthy();
  });

  // TEST 11: Mostrar mensaje de éxito
  it('debe mostrar mensaje de éxito tras registro exitoso', () => {
    const mockResponse = { id: 1, username: 'test' };
    authService.register.and.returnValue(of(mockResponse));

    component.formData.username = 'testuser';
    component.formData.password = 'password123';
    component.formData.password2 = 'password123';
    
    component.onSubmit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const successDiv = compiled.querySelector('.alert-success');
    
    expect(successDiv).toBeTruthy();
  });

  // TEST 12: Ocultar formulario tras éxito
  it('debe ocultar formulario cuando el registro es exitoso', () => {
    const mockResponse = { id: 1, username: 'test' };
    authService.register.and.returnValue(of(mockResponse));

    component.formData.username = 'testuser';
    component.formData.password = 'password123';
    component.formData.password2 = 'password123';
    
    component.onSubmit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('.registro-form');
    
    expect(form).toBeFalsy();
  });

  // TEST 13: Deshabilitar inputs durante loading
  it('debe deshabilitar inputs cuando loading está activo', () => {
    component.loading = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const usernameInput = compiled.querySelector('#username') as HTMLInputElement;
    
    expect(usernameInput.disabled).toBe(true);
  });

  // TEST 14: Cambiar texto del botón durante loading
  it('debe cambiar texto del botón durante loading', () => {
    component.loading = false;
    fixture.detectChanges();
    
    let compiled = fixture.nativeElement as HTMLElement;
    let button = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(button.textContent).toContain('Crear Cuenta');

    component.loading = true;
    fixture.detectChanges();
    
    compiled = fixture.nativeElement as HTMLElement;
    button = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(button.textContent).toContain('Creando cuenta...');
  });

  // TEST 15: Limpiar error previo al enviar
  it('debe limpiar error previo al hacer nuevo submit', () => {
    component.error = 'Error anterior';
    
    const mockResponse = { id: 1, username: 'test' };
    authService.register.and.returnValue(of(mockResponse));

    component.formData.username = 'testuser';
    component.formData.password = 'password123';
    component.formData.password2 = 'password123';
    
    component.onSubmit();

    expect(component.error).toBe('');
  });
});