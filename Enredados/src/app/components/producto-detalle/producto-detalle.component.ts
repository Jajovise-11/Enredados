import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.css'
})
export class ProductoDetalleComponent implements OnInit {
  producto: any = null;
  tipo: string = '';
  cargando: boolean = true;
  imagenActual: number = 0;
  
  // Variables para reserva
  mostrarFormularioReserva: boolean = false;
  fechaEvento: string = '';
  comentarios: string = '';
  reservaEnviando: boolean = false;
  reservaExitosa: boolean = false;
  fechaMinima: string = new Date().toISOString().split('T')[0];
  
  // Control de reservas
  reservaExistente: any = null;
  usuarioAutenticado: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.usuarioAutenticado = this.authService.isLoggedIn();
    
    this.route.params.subscribe(params => {
      const id = parseInt(params['id']);
      this.tipo = this.route.snapshot.url[0].path;
      
      console.log('=== INICIO CARGA PRODUCTO ===');
      console.log('ID:', id);
      console.log('Tipo:', this.tipo);
      
      this.cargarProducto(id);
    });
  }

  verificarReservaExistente(productoId: number): void {
    if (!this.usuarioAutenticado) return;

    const usuarioId = this.authService.getUserId();
    if (!usuarioId) return;

    this.apiService.getReservasUsuario(usuarioId).subscribe({
      next: (reservas: any[]) => {
        console.log('Reservas del usuario:', reservas);
        
        this.reservaExistente = reservas.find((reserva: any) => {
          const esActiva = reserva.estado !== 'cancelada';
          let coincide = false;

          if (this.tipo === 'vestidos-novia' && reserva.vestido === productoId) coincide = true;
          if (this.tipo === 'trajes-novio' && reserva.traje === productoId) coincide = true;
          if (this.tipo === 'complementos-novia' && reserva.complemento_novia === productoId) coincide = true;
          if (this.tipo === 'complementos-novio' && reserva.complemento_novio === productoId) coincide = true;

          return coincide && esActiva;
        });

        console.log('Reserva existente:', this.reservaExistente);
      },
      error: (error: any) => {
        console.error('Error al verificar reserva:', error);
      }
    });
  }

  cargarProducto(id: number): void {
    this.cargando = true;
    
    let observable;
    
    switch(this.tipo) {
      case 'vestidos-novia':
        observable = this.apiService.getVestidoNovia(id);
        break;
      case 'complementos-novia':
        observable = this.apiService.getComplementoNovia(id);
        break;
      case 'trajes-novio':
        observable = this.apiService.getTrajeNovio(id);
        break;
      case 'complementos-novio':
        observable = this.apiService.getComplementoNovio(id);
        break;
      default:
        console.error('Tipo no reconocido:', this.tipo);
        alert('Tipo de producto no reconocido');
        this.router.navigate(['/']);
        return;
    }

    observable.subscribe({
      next: (data: any) => {
        console.log('Producto recibido del backend:', data);
        this.producto = this.procesarProducto(data);
        console.log('Producto procesado:', this.producto);
        this.cargando = false;
        
        // Verificar reserva DESPUÉS de cargar el producto
        this.verificarReservaExistente(id);
      },
      error: (error: any) => {
        console.error('Error al cargar producto:', error);
        console.log('Cargando producto de ejemplo...');
        this.cargarProductoEjemplo(id);
        this.verificarReservaExistente(id);
      }
    });
  }

  procesarProducto(data: any): any {
    console.log('Procesando producto:', data);
    
    // Asegurar array de imágenes
    if (!data.imagenes || !Array.isArray(data.imagenes) || data.imagenes.length === 0) {
      if (data.imagen) {
        data.imagenes = [data.imagen];
      } else {
        data.imagenes = ['https://images.unsplash.com/photo-1519657337289-077653f724ed?w=800&auto=format&fit=crop'];
      }
    }
    
    // Descripción larga
    if (!data.descripcionLarga) {
      data.descripcionLarga = data.descripcion + ' Este producto ha sido cuidadosamente seleccionado para tu día especial.';
    }
    
    // Características
    if (!data.caracteristicas || data.caracteristicas.length === 0) {
      data.caracteristicas = [
        'Alta calidad de materiales',
        'Diseño exclusivo',
        'Disponible en varias tallas',
        'Asesoramiento personalizado'
      ];
    }
    
    // Tallas como array
    if (data.tallas && typeof data.tallas === 'string') {
      data.tallas = data.tallas.split(',').map((t: string) => t.trim());
    }
    
    // Disponible por defecto
    if (data.disponible === undefined) {
      data.disponible = true;
    }
    
    return data;
  }

  cargarProductoEjemplo(id: number): void {
    const ejemplos: any = {
      'vestidos-novia': {
        id: id,
        nombre: 'Vestido Ejemplo ' + id,
        marca: 'Rosa Clará',
        precio: 2500,
        imagenes: ['https://images.unsplash.com/photo-1594552072238-52e479f9ebf0?w=800&auto=format&fit=crop'],
        descripcion: 'Vestido de corte princesa con encaje.',
        descripcionLarga: 'Vestido elegante para tu día especial.',
        tallas: ['36', '38', '40', '42'],
        estilo: 'Princesa',
        color: 'Blanco',
        caracteristicas: ['Encaje francés', 'Corsé ajustable'],
        disponible: true
      },
      'complementos-novia': {
        id: id,
        nombre: 'Complemento Ejemplo ' + id,
        categoria: 'Velos',
        precio: 180,
        imagenes: ['https://images.unsplash.com/photo-1522673607170-d2c8d29e5d7d?w=800&auto=format&fit=crop'],
        descripcion: 'Velo elegante con encaje.',
        descripcionLarga: 'Velo de alta calidad.',
        caracteristicas: ['Tul italiano', 'Encaje francés'],
        disponible: true
      },
      'trajes-novio': {
        id: id,
        nombre: 'Traje Ejemplo ' + id,
        marca: 'Hugo Boss',
        precio: 850,
        imagenes: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop'],
        descripcion: 'Esmoquin negro clásico.',
        descripcionLarga: 'Elegancia tradicional.',
        tallas: ['48', '50', '52'],
        tipo: 'Esmoquin',
        color: 'Negro',
        caracteristicas: ['Lana virgen', 'Solapas de satén'],
        disponible: true
      },
      'complementos-novio': {
        id: id,
        nombre: 'Complemento Ejemplo ' + id,
        categoria: 'Corbatas',
        precio: 45,
        imagenes: ['https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&auto=format&fit=crop'],
        descripcion: 'Corbata de seda.',
        descripcionLarga: 'Corbata elegante.',
        caracteristicas: ['Seda italiana', 'Hecha a mano'],
        disponible: true
      }
    };

    this.producto = this.procesarProducto(ejemplos[this.tipo] || ejemplos['vestidos-novia']);
    this.cargando = false;
  }

  cambiarImagen(index: number): void {
    this.imagenActual = index;
  }

  volverAtras(): void {
    const rutas: any = {
      'vestidos-novia': '/vestidos-novia',
      'complementos-novia': '/complementos-novia',
      'trajes-novio': '/trajes-novio',
      'complementos-novio': '/complementos-novio'
    };
    this.router.navigate([rutas[this.tipo] || '/']);
  }

  toggleFormularioReserva(): void {
    if (!this.authService.isLoggedIn()) {
      alert('Debes iniciar sesión para hacer una reserva');
      this.router.navigate(['/login']);
      return;
    }

    if (this.reservaExistente) {
      alert('Ya tienes una reserva activa de este producto');
      return;
    }

    this.mostrarFormularioReserva = !this.mostrarFormularioReserva;
  }

  realizarReserva(): void {
    if (!this.fechaEvento) {
      alert('Por favor, selecciona una fecha para el evento');
      return;
    }

    const usuarioId = this.authService.getUserId();
    if (!usuarioId) {
      alert('Error: Usuario no autenticado');
      return;
    }

    // Preparar datos de reserva
    let reservaData: any = {
      usuario: usuarioId,
      fecha_evento: this.fechaEvento,
      estado: 'pendiente',
      comentarios: this.comentarios
    };

    // Asignar el campo correcto según el tipo
    switch(this.tipo) {
      case 'vestidos-novia':
        reservaData.vestido = this.producto.id;
        break;
      case 'complementos-novia':
        reservaData.complemento_novia = this.producto.id;
        break;
      case 'trajes-novio':
        reservaData.traje = this.producto.id;
        break;
      case 'complementos-novio':
        reservaData.complemento_novio = this.producto.id;
        break;
    }

    console.log('Datos de reserva a enviar:', reservaData);
    this.reservaEnviando = true;

    // Usar el nuevo método que crea reserva + presupuesto
    this.apiService.crearReservaConPresupuesto(reservaData, this.producto, usuarioId).subscribe({
      next: (response: any) => {
        console.log('Reserva y presupuesto creados:', response);
        this.reservaExitosa = true;
        this.reservaEnviando = false;
        this.reservaExistente = response.reserva;
        
        alert('¡Reserva realizada con éxito! Se ha añadido automáticamente al presupuesto.');
        
        setTimeout(() => {
          this.mostrarFormularioReserva = false;
          this.reservaExitosa = false;
          this.fechaEvento = '';
          this.comentarios = '';
        }, 2000);
      },
      error: (error: any) => {
        console.error('Error al crear reserva:', error);
        this.reservaEnviando = false;
        
        let mensaje = 'Error al crear la reserva.';
        if (error.error && typeof error.error === 'object') {
          mensaje += '\n' + JSON.stringify(error.error);
        }
        alert(mensaje);
      }
    });
  }
}