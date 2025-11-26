import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar';

interface Complemento {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  imagen: string;
  descripcion: string;
  disponible: boolean;
}

@Component({
  selector: 'app-complementos-novia',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './complementos-novia.component.html',
  styleUrl: './complementos-novia.component.css'
})
export class ComplementosNoviaComponent {
  complementos: Complemento[] = [
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
    },
    {
      id: 6,
      nombre: 'Pendientes Lágrima Plata',
      categoria: 'Joyería',
      precio: 95,
      imagen: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&auto=format&fit=crop',
      descripcion: 'Pendientes largos en forma de lágrima con baño de plata.',
      disponible: true
    },
    {
      id: 7,
      nombre: 'Peineta Flores Naturales',
      categoria: 'Tocados',
      precio: 65,
      imagen: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&auto=format&fit=crop',
      descripcion: 'Peineta decorada con flores preservadas. Estilo romántico.',
      disponible: true
    },
    {
      id: 8,
      nombre: 'Guantes Largos Satén',
      categoria: 'Accesorios',
      precio: 45,
      imagen: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&auto=format&fit=crop',
      descripcion: 'Guantes largos hasta el codo en satén blanco. Elegancia clásica.',
      disponible: false
    },
    {
      id: 9,
      nombre: 'Liga Encaje Blanco',
      categoria: 'Lencería',
      precio: 25,
      imagen: 'https://images.unsplash.com/photo-1505947038613-c8806fb0ea46?w=400&auto=format&fit=crop',
      descripcion: 'Liga tradicional con encaje y lazo azul. Tradición nupcial.',
      disponible: true
    }
  ];

  complementosFiltrados: Complemento[] = [...this.complementos];
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