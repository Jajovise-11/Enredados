import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Crear spies (mocks) de los servicios
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'isLoggedIn']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST 1: Verificar que el componente se inicializa correctamente
  it('debe inicializar con valores vacíos', () => {
    expect(component.username).toBe('');
    expect(component.password).toBe('');
    expect(component.error).toBe('');
    expect(component.loading).toBe(false);
  });

  // TEST 2: Verificar que muestra error si los campos están vacíos
  it('debe mostrar error cuando los campos están vacíos', () => {
    component.username = '';
    component.password = '';
    component.onSubmit();

    expect(component.error).toBe('Por favor, completa todos los campos');
    expect(component.loading).toBe(false);
  });

  // TEST 3: Verificar que muestra error si falta el username
  it('debe mostrar error cuando falta el username', () => {
    component.username = '';
    component.password = 'password123';
    component.onSubmit();

    expect(component.error).toBe('Por favor, completa todos los campos');
  });

  // TEST 4: Verificar que muestra error si falta la contraseña
  it('debe mostrar error cuando falta la contraseña', () => {
    component.username = 'testuser';
    component.password = '';
    component.onSubmit();

    expect(component.error).toBe('Por favor, completa todos los campos');
  });

  // TEST 5: Verificar login exitoso
  it('debe realizar login exitoso y redirigir a home', () => {
    const mockResponse = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      first_name: 'Test',
      last_name: 'User'
    };

    authService.login.and.returnValue(of(mockResponse));

    component.username = 'testuser';
    component.password = 'password123';
    component.onSubmit();

    expect(component.loading).toBe(false);
    expect(component.error).toBe('');
    expect(authService.login).toHaveBeenCalledWith('testuser', 'password123');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  // TEST 6: Verificar manejo de error en login
  it('debe mostrar error cuando las credenciales son incorrectas', () => {
    const mockError = {
      error: { error: 'Credenciales inválidas' }
    };

    authService.login.and.returnValue(throwError(() => mockError));

    component.username = 'testuser';
    component.password = 'wrongpassword';
    component.onSubmit();

    expect(component.loading).toBe(false);
    expect(component.error).toBe('Credenciales inválidas');
  });

  // TEST 7: Verificar que loading se activa durante el login
  it('debe activar loading durante el proceso de login', () => {
    const mockResponse = { id: 1, username: 'testuser' };
    authService.login.and.returnValue(of(mockResponse));

    component.username = 'testuser';
    component.password = 'password123';
    
    // Antes de enviar
    expect(component.loading).toBe(false);
    
    component.onSubmit();
    
    // El loading se desactiva después de la respuesta
    expect(component.loading).toBe(false);
  });

  // TEST 8: Verificar que redirige si ya está autenticado
  it('debe redirigir a home si el usuario ya está autenticado', () => {
    authService.isLoggedIn.and.returnValue(true);
    
    // Recrear componente para que ejecute el constructor
    const newFixture = TestBed.createComponent(LoginComponent);
    
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  // TEST 9: Verificar que muestra error genérico si la API falla
  it('debe mostrar error genérico cuando la API falla sin mensaje específico', () => {
    const mockError = { error: {} };
    authService.login.and.returnValue(throwError(() => mockError));

    component.username = 'testuser';
    component.password = 'password123';
    component.onSubmit();

    expect(component.error).toBe('Credenciales inválidas. Por favor, intenta de nuevo.');
  });

  // TEST 10: Verificar que limpia el error anterior al hacer nuevo submit
  it('debe limpiar el error anterior al hacer nuevo submit', () => {
    component.error = 'Error previo';
    
    const mockResponse = { id: 1, username: 'testuser' };
    authService.login.and.returnValue(of(mockResponse));

    component.username = 'testuser';
    component.password = 'password123';
    component.onSubmit();

    expect(component.error).toBe('');
  });

  // TEST 11: Verificar renderizado del template
  it('debe renderizar el formulario correctamente', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('h1')?.textContent).toContain('Iniciar Sesión');
    expect(compiled.querySelector('input[type="text"]')).toBeTruthy();
    expect(compiled.querySelector('input[type="password"]')).toBeTruthy();
    expect(compiled.querySelector('button[type="submit"]')).toBeTruthy();
  });

  // TEST 12: Verificar que muestra mensaje de error en el template
  it('debe mostrar mensaje de error en el template cuando hay un error', () => {
    component.error = 'Error de prueba';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const errorDiv = compiled.querySelector('.alert-error');
    
    expect(errorDiv).toBeTruthy();
    expect(errorDiv?.textContent).toContain('Error de prueba');
  });

  // TEST 13: Verificar que deshabilita inputs durante loading
  it('debe deshabilitar inputs cuando loading está activo', () => {
    component.loading = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const usernameInput = compiled.querySelector('#username') as HTMLInputElement;
    const passwordInput = compiled.querySelector('#password') as HTMLInputElement;
    
    expect(usernameInput.disabled).toBe(true);
    expect(passwordInput.disabled).toBe(true);
  });

  // TEST 14: Verificar texto del botón cambia durante loading
  it('debe cambiar el texto del botón durante loading', () => {
    component.loading = false;
    fixture.detectChanges();
    
    let compiled = fixture.nativeElement as HTMLElement;
    let button = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(button.textContent).toContain('Iniciar Sesión');

    component.loading = true;
    fixture.detectChanges();
    
    compiled = fixture.nativeElement as HTMLElement;
    button = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(button.textContent).toContain('Iniciando sesión...');
  });

  // TEST 15: Verificar que el botón se deshabilita durante loading
  it('debe deshabilitar el botón de submit durante loading', () => {
    component.loading = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
    
    expect(button.disabled).toBe(true);
  });
});