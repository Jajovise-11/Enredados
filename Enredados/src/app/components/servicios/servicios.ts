import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NavbarComponent } from '../shared/navbar/navbar';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css'
})
export class ServiciosComponent implements OnInit {
  servicios: any[] = [];
  serviciosFiltrados: any[] = [];
  categorias: any[] = [];
  proveedores: any[] = [];
  
  // Filtros
  categoriaSeleccionada: string = '';
  busqueda: string = '';
  precioMin: number = 0;
  precioMax: number = 10000;
  
  cargando: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;

    // Cargar servicios
    this.apiService.getServicios().subscribe({
      next: (data: any) => {
        this.servicios = data;
        this.serviciosFiltrados = data;
        this.cargando = false;
      },
      error: (error: any) => {
        console.error('Error al cargar servicios:', error);
        this.cargando = false;
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

    // Cargar proveedores
    this.apiService.getProveedores().subscribe({
      next: (data: any) => {
        this.proveedores = data;
      },
      error: (error: any) => {
        console.error('Error al cargar proveedores:', error);
      }
    });
  }

  aplicarFiltros(): void {
    this.serviciosFiltrados = this.servicios.filter(servicio => {
      // Filtro por categoría
      const cumpleCategoria = !this.categoriaSeleccionada || 
                             servicio.categoria === parseInt(this.categoriaSeleccionada);

      // Filtro por búsqueda
      const cumpleBusqueda = !this.busqueda || 
                            servicio.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
                            servicio.proveedor_nombre.toLowerCase().includes(this.busqueda.toLowerCase());

      // Filtro por precio
      const cumplePrecio = servicio.precio >= this.precioMin && 
                          servicio.precio <= this.precioMax;

      return cumpleCategoria && cumpleBusqueda && cumplePrecio;
    });
  }

  limpiarFiltros(): void {
    this.categoriaSeleccionada = '';
    this.busqueda = '';
    this.precioMin = 0;
    this.precioMax = 10000;
    this.serviciosFiltrados = this.servicios;
  }
}