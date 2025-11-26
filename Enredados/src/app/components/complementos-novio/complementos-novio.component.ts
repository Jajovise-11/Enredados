import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar';

interface ComplementoNovio {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  imagen: string;
  descripcion: string;
  disponible: boolean;
}

@Component({
  selector: 'app-complementos-novio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './complementos-novio.component.html',
  styleUrl: './complementos-novio.component.css'
})
export class ComplementosNovioComponent {
  complementos: ComplementoNovio[] = [
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
      nombre: 'Reloj Clásico Dorado',
      categoria: 'Relojes',
      precio: 320,
      imagen: 'https://images.unsplash.com/photo-1610824352934-c10d87b700cc?w=400&auto=format&fit=crop',
      descripcion: 'Reloj de pulsera con correa de cuero y caja dorada.',
      disponible: true
    },
    {
      id: 6,
      nombre: 'Pañuelo Bolsillo Seda',
      categoria: 'Pañuelos',
      precio: 25,
      imagen: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&auto=format&fit=crop',
      descripcion: 'Pañuelo de seda para bolsillo. Toque de distinción.',
      disponible: true
    },
    {
      id: 7,
      nombre: 'Cinturón Cuero Negro',
      categoria: 'Cinturones',
      precio: 55,
      imagen: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&auto=format&fit=crop',
      descripcion: 'Cinturón de cuero genuino con hebilla plateada.',
      disponible: true
    },
    {
      id: 8,
      nombre: 'Tirantes Elásticos',
      categoria: 'Tirantes',
      precio: 35,
      imagen: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&auto=format&fit=crop',
      descripcion: 'Tirantes elásticos con cuero genuino. Estilo vintage.',
      disponible: false
    },
    {
      id: 9,
      nombre: 'Alfiler Corbata Oro',
      categoria: 'Alfileres',
      precio: 42,
      imagen: 'https://images.unsplash.com/photo-1610824352934-c10d87b700cc?w=400&auto=format&fit=crop',
      descripcion: 'Alfiler de corbata con baño de oro. Detalle elegante.',
      disponible: true
    }
  ];

  complementosFiltrados: ComplementoNovio[] = [...this.complementos];
  categoriaFiltro: string = '';

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