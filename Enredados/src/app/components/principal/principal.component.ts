import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { NavbarComponent } from '../shared/navbar/navbar';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NavbarComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit {
  // Búsqueda
  terminoBusqueda: string = '';
  categoriaSeleccionada: string = '';

  // Datos desde la API
  servicios: any[] = [];
  serviciosDestacados: any[] = [];
  categorias: any[] = [];
  valoracionesRecientes: any[] = [];
  
  cargando: boolean = true;

  // Categorías con iconos
  categoriasDestacadas = [
    { 
      nombre: 'DJ y Música', 
      icono: '🎵', 
      descripcion: 'Los mejores DJs para tu fiesta',
      color: '#667eea'
    },
    { 
      nombre: 'Fotografía', 
      icono: '📸', 
      descripcion: 'Captura cada momento especial',
      color: '#f093fb'
    },
    { 
      nombre: 'Catering', 
      icono: '🍽️', 
      descripcion: 'Delicias para tus invitados',
      color: '#4facfe'
    },
    { 
      nombre: 'Decoración', 
      icono: '💐', 
      descripcion: 'Ambientes únicos y memorables',
      color: '#43e97b'
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;

    // Cargar servicios
    this.apiService.getServicios().subscribe({
      next: (data: any) => {
        this.servicios = data;
        // Obtener los 6 servicios más recientes como destacados
        this.serviciosDestacados = data
          .sort((a: any, b: any) => new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime())
          .slice(0, 6);
      },
      error: (error: any) => {
        console.error('Error al cargar servicios:', error);
      }
    });

    // Cargar categorías
    this.apiService.getCategorias().subscribe({
      next: (data: any) => {
        this.categorias = data;
      },
      error: (error: any) => {
        console.error('Error al cargar categorías:', error);
      }
    });

    // Cargar valoraciones recientes
    this.apiService.getValoraciones().subscribe({
      next: (data: any) => {
        this.valoracionesRecientes = data
          .sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
          .slice(0, 3);
        this.cargando = false;
      },
      error: (error: any) => {
        console.error('Error al cargar valoraciones:', error);
        this.cargando = false;
      }
    });
  }

  buscarServicios(): void {
    // Navegar a la página de servicios con parámetros de búsqueda
    const params: any = {};
    
    if (this.terminoBusqueda) {
      params.busqueda = this.terminoBusqueda;
    }
    
    if (this.categoriaSeleccionada) {
      params.categoria = this.categoriaSeleccionada;
    }

    this.router.navigate(['/servicios'], { queryParams: params });
  }

  filtrarPorCategoria(categoriaNombre: string): void {
    const categoria = this.categorias.find(c => c.nombre === categoriaNombre);
    if (categoria) {
      this.router.navigate(['/servicios'], { queryParams: { categoria: categoria.id } });
    }
  }

  generarEstrellas(puntuacion: number): string[] {
    return Array(5).fill('★').map((star, index) => index < puntuacion ? '★' : '☆');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}