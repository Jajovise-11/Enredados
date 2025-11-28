import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-complementos-novio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './complementos-novio.component.html',
  styleUrl: './complementos-novio.component.css'
})
export class ComplementosNovioComponent implements OnInit {
  complementos: any[] = [];
  complementosFiltrados: any[] = [];
  categoriaFiltro: string = '';
  cargando: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarComplementos();
  }

  cargarComplementos(): void {
    this.cargando = true;
    this.apiService.getComplementosNovio().subscribe({
      next: (data: any) => {
        console.log('Complementos novio cargados desde backend:', data);
        if (data && data.length > 0) {
          this.complementos = data;
          this.complementosFiltrados = data;
        } else {
          console.log('No hay complementos en el backend, usando datos de ejemplo');
          this.usarDatosEjemplo();
        }
        this.cargando = false;
      },
      error: (error: any) => {
        console.error('Error al cargar complementos:', error);
        console.log('Usando datos de ejemplo debido al error');
        this.usarDatosEjemplo();
        this.cargando = false;
      }
    });
  }

  usarDatosEjemplo(): void {
    this.complementos = [
      {
        id: 1,
        nombre: 'Corbata Seda Azul Marino',
        categoria: 'Corbatas',
        precio: 45,
        imagen: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&auto=format&fit=crop',
        descripcion: 'Corbata de seda italiana en azul marino. Acabado impecable.',
        disponible: true
      },
      {
        id: 2,
        nombre: 'Pajarita Negra Clásica',
        categoria: 'Pajaritas',
        precio: 38,
        imagen: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&auto=format&fit=crop',
        descripcion: 'Pajarita negra de lazo manual. Elegancia tradicional.',
        disponible: true
      },
      {
        id: 3,
        nombre: 'Gemelos Plata Grabados',
        categoria: 'Gemelos',
        precio: 85,
        imagen: 'https://images.unsplash.com/photo-1610824352934-c10d87b700cc?w=400&auto=format&fit=crop',
        descripcion: 'Gemelos de plata con posibilidad de grabado personalizado.',
        disponible: true
      },
      {
        id: 4,
        nombre: 'Zapatos Oxford Negro',
        categoria: 'Zapatos',
        precio: 150,
        imagen: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&auto=format&fit=crop',
        descripcion: 'Zapatos Oxford de piel genuina. Comodidad y estilo.',
        disponible: true
      },
      {
        id: 5,
        nombre: 'Reloj Clásico Oro Rosa',
        categoria: 'Relojes',
        precio: 320,
        imagen: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&auto=format&fit=crop',
        descripcion: 'Reloj elegante con caja de oro rosa. Sofisticación en la muñeca.',
        disponible: true
      },
      {
        id: 6,
        nombre: 'Pañuelo Bolsillo Seda',
        categoria: 'Pañuelos',
        precio: 28,
        imagen: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&auto=format&fit=crop',
        descripcion: 'Pañuelo de bolsillo en seda pura. Toque de distinción.',
        disponible: true
      },
      {
        id: 7,
        nombre: 'Cinturón Cuero Marrón',
        categoria: 'Cinturones',
        precio: 55,
        imagen: 'https://images.unsplash.com/photo-1610824352934-c10d87b700cc?w=400&auto=format&fit=crop',
        descripcion: 'Cinturón de piel genuina con hebilla clásica.',
        disponible: true
      },
      {
        id: 8,
        nombre: 'Tirantes Elásticos',
        categoria: 'Tirantes',
        precio: 42,
        imagen: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&auto=format&fit=crop',
        descripcion: 'Tirantes elásticos con enganches de cuero. Estilo vintage.',
        disponible: true
      },
      {
        id: 9,
        nombre: 'Alfiler Corbata Plateado',
        categoria: 'Alfileres',
        precio: 35,
        imagen: 'https://images.unsplash.com/photo-1610824352934-c10d87b700cc?w=400&auto=format&fit=crop',
        descripcion: 'Alfiler de corbata en plata con acabado pulido.',
        disponible: true
      },
      {
        id: 10,
        nombre: 'Gemelos Oro con Iniciales',
        categoria: 'Gemelos',
        precio: 125,
        imagen: 'https://images.unsplash.com/photo-1610824352934-c10d87b700cc?w=400&auto=format&fit=crop',
        descripcion: 'Gemelos de oro con grabado personalizado de iniciales.',
        disponible: true
      }
    ];
    this.complementosFiltrados = [...this.complementos];
  }

  aplicarFiltros(): void {
    this.complementosFiltrados = this.complementos.filter(c => {
      return !this.categoriaFiltro || c.categoria === this.categoriaFiltro;
    });
  }

  limpiarFiltros(): void {
    this.categoriaFiltro = '';
    this.complementosFiltrados = [...this.complementos];
  }
}