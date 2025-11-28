import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'isLoggedIn',
      'getUsername',
      'logout'
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        RouterTestingModule,
        CommonModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST 1: Verificar inicialización
  it('debe inicializarse correctamente', () => {
    expect(component).toBeTruthy();
    expect(component.menuAbierto).toEqual({});
  });

  // TEST 2: Verificar logout
  it('debe llamar a logout y redirigir', () => {
    component.logout();

    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  // TEST 3: Mostrar menú cuando usuario está autenticado
  it('debe mostrar menú de usuario cuando está autenticado', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getUsername.and.returnValue('testuser');
    
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.user-menu')).toBeTruthy();
  });

  // TEST 4: Mostrar botones de login cuando no está autenticado
  it('debe mostrar botones de login/registro cuando no está autenticado', () => {
    authService.isLoggedIn.and.returnValue(false);
    
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.auth-buttons')).toBeTruthy();
  });

  // TEST 5: Renderizar logo
  it('debe renderizar el logo correctamente', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logo = compiled.querySelector('.navbar-logo a');
    
    expect(logo?.textContent).toContain('Enredados');
  });

  // TEST 6: Verificar enlaces del menú principal
  it('debe tener enlaces del menú principal', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('.navbar-link');
    
    expect(links.length).toBeGreaterThan(0);
  });

  // TEST 7: Verificar que se muestra el username
  it('debe mostrar el nombre de usuario cuando está autenticado', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getUsername.and.returnValue('JuanTest');
    
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const userButton = compiled.querySelector('.user-button');
    
    expect(userButton?.textContent).toContain('JuanTest');
  });

  // TEST 8: Verificar dropdown de usuario
  it('debe tener dropdown con opciones de usuario', () => {
    authService.isLoggedIn.and.returnValue(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const dropdown = compiled.querySelector('.user-dropdown');
    
    expect(dropdown).toBeTruthy();
  });

  // TEST 9: Verificar que el logout limpia la sesión
  it('debe limpiar sesión al hacer logout', () => {
    component.logout();

    expect(authService.logout).toHaveBeenCalled();
  });
});