import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar';

interface Traje {
  id: number;
  nombre: string;
  marca: string;
  precio: number;
  imagen: string;
  descripcion: string;
  tallas: string[];
  tipo: string;
  color: string;
}

@Component({
  selector: 'app-trajes-novio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './trajes-novio.component.html',
  styleUrl: './trajes-novio.component.css'
})
export class TrajesNovioComponent {
  trajes: Traje[] = [
    {
      id: 1,
      nombre: 'Esmoquin Clásico Negro',
      marca: 'Hugo Boss',
      precio: 850,
      imagen: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop',
      descripcion: 'Esmoquin negro de corte clásico con solapas de satén. Elegancia atemporal.',
      tallas: ['48', '50', '52', '54', '56'],
      tipo: 'Esmoquin',
      color: 'Negro'
    },
    {
      id: 2,
      nombre: 'Traje Azul Marino Slim Fit',
      marca: 'Armani',
      precio: 950,
      imagen: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=400&auto=format&fit=crop',
      descripcion: 'Traje slim fit en azul marino. Moderno y sofisticado.',
      tallas: ['46', '48', '50', '52', '54'],
      tipo: 'Traje',
      color: 'Azul Marino'
    },
    {
      id: 3,
      nombre: 'Chaqué Gris Perla',
      marca: 'Sastrería Langa',
      precio: 1200,
      imagen: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&auto=format&fit=crop',
      descripcion: 'Chaqué tradicional en gris perla con chaleco. Protocolo máximo.',
      tallas: ['48', '50', '52', '54'],
      tipo: 'Chaqué',
      color: 'Gris'
    },
    {
      id: 4,
      nombre: 'Traje Beige Lino',
      marca: 'Scalpers',
      precio: 650,
      imagen: 'https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=400&auto=format&fit=crop',
      descripcion: 'Traje de lino ideal para bodas de verano. Fresco y elegante.',
      tallas: ['46', '48', '50', '52'],
      tipo: 'Traje',
      color: 'Beige'
    },
    {
      id: 5,
      nombre: 'Smoking Blanco',
      marca: 'Tom Ford',
      precio: 1400,
      imagen: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&auto=format&fit=crop',
      descripcion: 'Smoking blanco para bodas elegantes. Impacto visual garantizado.',
      tallas: ['48', '50', '52', '54'],
      tipo: 'Smoking',
      color: 'Blanco'
    },
    {
      id: 6,
      nombre: 'Traje Gris Marengo',
      marca: 'Devred',
      precio: 580,
      imagen: 'https://images.unsplash.com/photo-1598808503491-edfb1e56df0e?w=400&auto=format&fit=crop',
      descripcion: 'Traje clásico en gris marengo. Versátil y elegante.',
      tallas: ['46', '48', '50', '52', '54', '56'],
      tipo: 'Traje',
      color: 'Gris'
    }
  ];

  trajesFiltrados: Traje[] = [...this.trajes];
  tipoFiltro: string = '';
  precioMaximo: number = 2000;

  aplicarFiltros(): void {
    this.trajesFiltrados = this.trajes.filter(t => {
      const cumpleTipo = !this.tipoFiltro || t.tipo === this.tipoFiltro;
      const cumplePrecio = t.precio <= this.precioMaximo;
      return cumpleTipo && cumplePrecio;
    });
  }

  limpiarFiltros(): void {
    this.tipoFiltro = '';
    this.precioMaximo = 2000;
    this.trajesFiltrados = [...this.trajes];
  }
}