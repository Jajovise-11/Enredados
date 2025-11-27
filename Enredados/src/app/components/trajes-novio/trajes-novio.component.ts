import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-trajes-novio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './trajes-novio.component.html',
  styleUrl: './trajes-novio.component.css'
})
export class TrajesNovioComponent implements OnInit {
  trajes: any[] = [];
  trajesFiltrados: any[] = [];
  tipoFiltro: string = '';
  precioMaximo: number = 2000;
  cargando: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarTrajes();
  }

  cargarTrajes(): void {
    this.cargando = true;
    this.apiService.getTrajesNovio().subscribe({
      next: (data: any) => {
        this.trajes = data;
        this.trajesFiltrados = data;
        this.cargando = false;
      },
      error: (error: any) => {
        console.error('Error al cargar trajes:', error);
        // Si falla el backend, usar datos de ejemplo
        this.usarDatosEjemplo();
        this.cargando = false;
      }
    });
  }

  usarDatosEjemplo(): void {
    this.trajes = [
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
      }
    ];
    this.trajesFiltrados = [...this.trajes];
  }

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