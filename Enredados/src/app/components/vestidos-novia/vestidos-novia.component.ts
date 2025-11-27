import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-vestidos-novia',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './vestidos-novia.component.html',
  styleUrl: './vestidos-novia.component.css'
})
export class VestidosNoviaComponent implements OnInit {
  vestidos: any[] = [];
  vestidosFiltrados: any[] = [];
  estiloFiltro: string = '';
  precioMaximo: number = 5000;
  cargando: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarVestidos();
  }

  cargarVestidos(): void {
    this.cargando = true;
    this.apiService.getVestidosNovia().subscribe({
      next: (data: any) => {
        this.vestidos = data;
        this.vestidosFiltrados = data;
        this.cargando = false;
      },
      error: (error: any) => {
        console.error('Error al cargar vestidos:', error);
        // Si falla el backend, usar datos de ejemplo
        this.usarDatosEjemplo();
        this.cargando = false;
      }
    });
  }

  usarDatosEjemplo(): void {
    this.vestidos = [
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
      }
    ];
    this.vestidosFiltrados = [...this.vestidos];
  }

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