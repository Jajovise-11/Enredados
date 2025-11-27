import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-complementos-novia',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './complementos-novia.component.html',
  styleUrl: './complementos-novia.component.css'
})
export class ComplementosNoviaComponent implements OnInit {
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
    this.apiService.getComplementosNovia().subscribe({
      next: (data: any) => {
        this.complementos = data;
        this.complementosFiltrados = data;
        this.cargando = false;
      },
      error: (error: any) => {
        console.error('Error al cargar complementos:', error);
        // Si falla el backend, usar datos de ejemplo
        this.usarDatosEjemplo();
        this.cargando = false;
      }
    });
  }

  usarDatosEjemplo(): void {
    this.complementos = [
      {
        id: 1,
        nombre: 'Velo Catedral Largo',
        categoria: 'Velos',
        precio: 180,
        imagen: 'https://images.unsplash.com/photo-1522673607170-d2c8d29e5d7d?w=400&auto=format&fit=crop',
        descripcion: 'Velo de tul suave con detalles de encaje en los bordes. Longitud catedral.',
        disponible: true
      },
      {
        id: 2,
        nombre: 'Diadema Cristales Swarovski',
        categoria: 'Tocados',
        precio: 250,
        imagen: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&auto=format&fit=crop',
        descripcion: 'Elegante diadema con cristales Swarovski auténticos. Brillo espectacular.',
        disponible: true
      },
      {
        id: 3,
        nombre: 'Zapatos Peep Toe Marfil',
        categoria: 'Zapatos',
        precio: 120,
        imagen: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&auto=format&fit=crop',
        descripcion: 'Zapatos de tacón medio con acabado satinado. Comodidad garantizada.',
        disponible: true
      },
      {
        id: 4,
        nombre: 'Bolso Clutch Perlas',
        categoria: 'Bolsos',
        precio: 85,
        imagen: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&auto=format&fit=crop',
        descripcion: 'Pequeño clutch decorado con perlas y cierre dorado. Perfecto tamaño.',
        disponible: true
      },
      {
        id: 5,
        nombre: 'Collar Gargantilla Diamantes',
        categoria: 'Joyería',
        precio: 450,
        imagen: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&auto=format&fit=crop',
        descripcion: 'Collar gargantilla con circonitas que simulan diamantes. Elegancia pura.',
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