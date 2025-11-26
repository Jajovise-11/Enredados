import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar';

interface Vestido {
  id: number;
  nombre: string;
  marca: string;
  precio: number;
  imagen: string;
  descripcion: string;
  tallas: string[];
  estilo: string;
  color: string;
}

@Component({
  selector: 'app-vestidos-novia',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './vestidos-novia.component.html',
  styleUrl: './vestidos-novia.component.css'
})
export class VestidosNoviaComponent {
  vestidos: Vestido[] = [
    {
      id: 1,
      nombre: 'Vestido Romántico Princesa',
      marca: 'Rosa Clará',
      precio: 2500,
      imagen: 'https://images.unsplash.com/photo-1594552072238-52e479f9ebf0?w=400&auto=format&fit=crop',
      descripcion: 'Vestido de corte princesa con encaje y pedrería. Perfecto para una boda de ensueño.',
      tallas: ['36', '38', '40', '42', '44'],
      estilo: 'Princesa',
      color: 'Blanco'
    },
    {
      id: 2,
      nombre: 'Vestido Sirena Elegante',
      marca: 'Pronovias',
      precio: 3200,
      imagen: 'https://images.unsplash.com/photo-1519657337289-077653f724ed?w=400&auto=format&fit=crop',
      descripcion: 'Diseño sirena con escote corazón y cola larga. Ideal para resaltar la figura.',
      tallas: ['36', '38', '40', '42'],
      estilo: 'Sirena',
      color: 'Marfil'
    },
    {
      id: 3,
      nombre: 'Vestido Bohemio Vintage',
      marca: 'Inmaculada García',
      precio: 1800,
      imagen: 'https://images.unsplash.com/photo-1525087740718-9e0f2c58c7ef?w=400&auto=format&fit=crop',
      descripcion: 'Estilo bohemio con encajes y manga larga. Perfecto para bodas al aire libre.',
      tallas: ['34', '36', '38', '40', '42'],
      estilo: 'Bohemio',
      color: 'Crema'
    },
    {
      id: 4,
      nombre: 'Vestido Línea A Clásico',
      marca: 'Jesús Peiró',
      precio: 2200,
      imagen: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop',
      descripcion: 'Corte línea A con detalles florales. Elegancia atemporal.',
      tallas: ['36', '38', '40', '42', '44', '46'],
      estilo: 'Línea A',
      color: 'Blanco'
    },
    {
      id: 5,
      nombre: 'Vestido Minimalista Moderno',
      marca: 'Novia D\'Art',
      precio: 1500,
      imagen: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&auto=format&fit=crop',
      descripcion: 'Diseño minimalista y sofisticado con líneas limpias.',
      tallas: ['34', '36', '38', '40'],
      estilo: 'Minimalista',
      color: 'Blanco'
    },
    {
      id: 6,
      nombre: 'Vestido Vintage con Encaje',
      marca: 'Aire Barcelona',
      precio: 2800,
      imagen: 'https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=400&auto=format&fit=crop',
      descripcion: 'Inspiración vintage con encaje francés y detalles en perlas.',
      tallas: ['36', '38', '40', '42'],
      estilo: 'Vintage',
      color: 'Marfil'
    }
  ];

  vestidosFiltrados: Vestido[] = [...this.vestidos];
  estiloFiltro: string = '';
  precioMaximo: number = 5000;

  aplicarFiltros(): void {
    this.vestidosFiltrados = this.vestidos.filter(v => {
      const cumpleEstilo = !this.estiloFiltro || v.estilo === this.estiloFiltro;
      const cumplePrecio = v.precio <= this.precioMaximo;
      return cumpleEstilo && cumplePrecio;
    });
  }

  limpiarFiltros(): void {
    this.estiloFiltro = '';
    this.precioMaximo = 5000;
    this.vestidosFiltrados = [...this.vestidos];
  }
}