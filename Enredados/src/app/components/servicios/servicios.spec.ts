import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiciosComponent } from './servicios';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { of, throwError } from 'rxjs';

describe('ServiciosComponent', () => {
  let component: ServiciosComponent;
  let fixture: ComponentFixture<ServiciosComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  const mockServicios = [
    {
      id: 1,
      nombre: 'DJ Profesional',
      proveedor_nombre: 'Eventos Audio',
      categoria: 1,
      categoria_nombre: 'DJ y Música',
      precio: 500,
      descripcion: 'DJ profesional para bodas',
      disponible: true,
      imagen: 'https://example.com/dj.jpg'
    },
    {
      id: 2,
      nombre: 'Fotógrafo Premium',
      proveedor_nombre: 'FotoArte Studio',
      categoria: 2,
      categoria_nombre: 'Fotografía',
      precio: 1200,
      descripcion: 'Fotografía profesional de bodas',
      disponible: true,
      imagen: 'https://example.com/foto.jpg'
    },
    {
      id: 3,
      nombre: 'Catering Deluxe',
      proveedor_nombre: 'Sabor Gourmet',
      categoria: 3,
      categoria_nombre: 'Catering',
      precio: 3500,
      descripcion: 'Menú completo para 100 personas',
      disponible: false,
      imagen: 'https://example.com/catering.jpg'
    }
  ];

  const mockCategorias = [
    { id: 1, nombre: 'DJ y Música' },
    { id: 2, nombre: 'Fotografía' },
    { id: 3, nombre: 'Catering' }
  ];

  const mockProveedores = [
    { id: 1, nombre: 'Eventos Audio' },
    { id: 2, nombre: 'FotoArte Studio' }
  ];

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getServicios',
      'getCategorias',
      'getProveedores'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        ServiciosComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiciosComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST 1: Verificar inicialización correcta
  it('debe inicializarse con valores por defecto', () => {
    expect(component.servicios).toEqual([]);
    expect(component.serviciosFiltrados).toEqual([]);
    expect(component.categorias).toEqual([]);
    expect(component.categoriaSeleccionada).toBe('');
    expect(component.busqueda).toBe('');
    expect(component.precioMin).toBe(0);
    expect(component.precioMax).toBe(10000);
    expect(component.cargando).toBe(true);
  });

  // TEST 2: Cargar servicios correctamente
  it('debe cargar servicios al inicializar', () => {
    apiService.getServicios.and.returnValue(of(mockServicios));
    apiService.getCategorias.and.returnValue(of(mockCategorias));
    apiService.getProveedores.and.returnValue(of(mockProveedores));

    component.ngOnInit();

    expect(apiService.getServicios).toHaveBeenCalled();
    expect(component.servicios.length).toBe(3);
    expect(component.serviciosFiltrados.length).toBe(3);
    expect(component.cargando).toBe(false);
  });

  // TEST 3: Cargar categorías correctamente
  it('debe cargar categorías al inicializar', () => {
    apiService.getServicios.and.returnValue(of(mockServicios));
    apiService.getCategorias.and.returnValue(of(mockCategorias));
    apiService.getProveedores.and.returnValue(of(mockProveedores));

    component.ngOnInit();

    expect(apiService.getCategorias).toHaveBeenCalled();
    expect(component.categorias.length).toBe(3);
  });

  // TEST 4: Manejar error al cargar servicios
  it('debe manejar error al cargar servicios', () => {
    apiService.getServicios.and.returnValue(throwError(() => new Error('Error de red')));
    apiService.getCategorias.and.returnValue(of(mockCategorias));
    apiService.getProveedores.and.returnValue(of(mockProveedores));

    spyOn(console, 'error');
    component.ngOnInit();

    expect(console.error).toHaveBeenCalled();
    expect(component.cargando).toBe(false);
  });

  // TEST 5: Filtrar por categoría
  it('debe filtrar servicios por categoría', () => {
    component.servicios = mockServicios;
    component.categoriaSeleccionada = '1';
    
    component.aplicarFiltros();

    expect(component.serviciosFiltrados.length).toBe(1);
    expect(component.serviciosFiltrados[0].nombre).toBe('DJ Profesional');
  });

  // TEST 6: Filtrar por búsqueda de texto
  it('debe filtrar servicios por búsqueda de texto en nombre', () => {
    component.servicios = mockServicios;
    component.busqueda = 'Fotógrafo';
    
    component.aplicarFiltros();

    expect(component.serviciosFiltrados.length).toBe(1);
    expect(component.serviciosFiltrados[0].nombre).toBe('Fotógrafo Premium');
  });

  // TEST 7: Filtrar por búsqueda en proveedor
  it('debe filtrar servicios por búsqueda de texto en proveedor', () => {
    component.servicios = mockServicios;
    component.busqueda = 'FotoArte';
    
    component.aplicarFiltros();

    expect(component.serviciosFiltrados.length).toBe(1);
    expect(component.serviciosFiltrados[0].proveedor_nombre).toBe('FotoArte Studio');
  });

  // TEST 8: Filtrar por rango de precio
  it('debe filtrar servicios por rango de precio', () => {
    component.servicios = mockServicios;
    component.precioMin = 500;
    component.precioMax = 1500;
    
    component.aplicarFiltros();

    expect(component.serviciosFiltrados.length).toBe(2);
    expect(component.serviciosFiltrados.every(s => s.precio >= 500 && s.precio <= 1500)).toBe(true);
  });

  // TEST 9: Filtrar por precio mínimo
  it('debe filtrar servicios por precio mínimo', () => {
    component.servicios = mockServicios;
    component.precioMin = 1000;
    component.precioMax = 10000;
    
    component.aplicarFiltros();

    expect(component.serviciosFiltrados.length).toBe(2);
    expect(component.serviciosFiltrados.every(s => s.precio >= 1000)).toBe(true);
  });

  // TEST 10: Filtrar por precio máximo
  it('debe filtrar servicios por precio máximo', () => {
    component.servicios = mockServicios;
    component.precioMin = 0;
    component.precioMax = 1000;
    
    component.aplicarFiltros();

    expect(component.serviciosFiltrados.length).toBe(1);
    expect(component.serviciosFiltrados[0].precio).toBeLessThanOrEqual(1000);
  });

  // TEST 11: Filtros combinados
  it('debe aplicar múltiples filtros simultáneamente', () => {
    component.servicios = mockServicios;
    component.categoriaSeleccionada = '2';
    component.busqueda = 'Premium';
    component.precioMin = 1000;
    component.precioMax = 2000;
    
    component.aplicarFiltros();

    expect(component.serviciosFiltrados.length).toBe(1);
    expect(component.serviciosFiltrados[0].nombre).toBe('Fotógrafo Premium');
  });

  // TEST 12: Búsqueda case-insensitive
  it('debe realizar búsqueda case-insensitive', () => {
    component.servicios = mockServicios;
    component.busqueda = 'FOTÓGRAFO';
    
    component.aplicarFiltros();

    expect(component.serviciosFiltrados.length).toBe(1);
    expect(component.serviciosFiltrados[0].nombre).toBe('Fotógrafo Premium');
  });

  // TEST 13: Limpiar filtros
  it('debe limpiar todos los filtros', () => {
    component.servicios = mockServicios;
    component.categoriaSeleccionada = '1';
    component.busqueda = 'test';
    component.precioMin = 1000;
    component.precioMax = 2000;
    
    component.limpiarFiltros();

    expect(component.categoriaSeleccionada).toBe('');
    expect(component.busqueda).toBe('');
    expect(component.precioMin).toBe(0);
    expect(component.precioMax).toBe(10000);
    expect(component.serviciosFiltrados.length).toBe(3);
  });

  // TEST 14: Sin resultados de búsqueda
  it('debe retornar array vacío cuando no hay coincidencias', () => {
    component.servicios = mockServicios;
    component.busqueda = 'ServicioInexistente';
    
    component.aplicarFiltros();

    expect(component.serviciosFiltrados.length).toBe(0);
  });

  // TEST 15: Verificar que todos los servicios se muestran sin filtros
  it('debe mostrar todos los servicios cuando no hay filtros aplicados', () => {
    component.servicios = mockServicios;
    
    component.aplicarFiltros();

    expect(component.serviciosFiltrados.length).toBe(3);
  });

  // TEST 16: Renderizado del template
  it('debe renderizar el título correctamente', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    
    expect(compiled.querySelector('h1')?.textContent).toContain('Servicios para tu Boda');
  });

  // TEST 17: Mostrar mensaje de carga
  it('debe mostrar mensaje de carga cuando está cargando', () => {
    component.cargando = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.loading')).toBeTruthy();
    expect(compiled.querySelector('.loading')?.textContent).toContain('Cargando servicios...');
  });

  // TEST 18: Ocultar mensaje de carga
  it('debe ocultar mensaje de carga cuando termina de cargar', () => {
    component.cargando = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.loading')).toBeFalsy();
  });

  // TEST 19: Mostrar mensaje sin resultados
  it('debe mostrar mensaje cuando no hay resultados', () => {
    component.cargando = false;
    component.serviciosFiltrados = [];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.sin-resultados')).toBeTruthy();
  });

  // TEST 20: Renderizar grid de servicios
  it('debe renderizar tarjetas de servicios', () => {
    apiService.getServicios.and.returnValue(of(mockServicios));
    apiService.getCategorias.and.returnValue(of(mockCategorias));
    apiService.getProveedores.and.returnValue(of(mockProveedores));

    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const servicioCards = compiled.querySelectorAll('.servicio-card');
    
    expect(servicioCards.length).toBe(3);
  });
});
