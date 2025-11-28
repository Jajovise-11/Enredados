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
  
  // NUEVO: Variables para control de reservas
  reservaExistente: any = null;
  usuarioAutenticado: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = parseInt(params['id']);
      this.tipo = this.route.snapshot.url[0].path;
      this.cargarProducto(id);
      
      // NUEVO: Verificar autenticación y reserva existente
      this.usuarioAutenticado = this.authService.isLoggedIn();
      if (this.usuarioAutenticado) {
        this.verificarReservaExistente(id);
      }
    });
  }

  // NUEVO MÉTODO: Verificar si ya existe una reserva
  verificarReservaExistente(productoId: number): void {
    const usuarioId = this.authService.getUserId();
    if (!usuarioId) return;

    this.apiService.getReservasUsuario(usuarioId).subscribe({
      next: (reservas: any[]) => {
        // Buscar reserva según el tipo de producto
        this.reservaExistente = reservas.find((reserva: any) => {
          if (this.tipo === 'vestidos-novia' && reserva.vestido === productoId) return true;
          if (this.tipo === 'trajes-novio' && reserva.traje === productoId) return true;
          if (this.tipo === 'complementos-novia' && reserva.complemento_novia === productoId) return true;
          if (this.tipo === 'complementos-novio' && reserva.complemento_novio === productoId) return true;
          return false;
        });
      },
      error: (error: any) => {
        console.error('Error al verificar reserva:', error);
      }
    });
  }

  cargarProducto(id: number): void {
    this.cargando = true;
    
    let observable;
    let tipoNombre = '';
    
    switch(this.tipo) {
      case 'vestidos-novia':
        observable = this.apiService.getVestidoNovia(id);
        tipoNombre = 'Vestidos de Novia';
        break;
      case 'complementos-novia':
        observable = this.apiService.getComplementoNovia(id);
        tipoNombre = 'Complementos de Novia';
        break;
      case 'trajes-novio':
        observable = this.apiService.getTrajeNovio(id);
        tipoNombre = 'Trajes de Novio';
        break;
      case 'complementos-novio':
        observable = this.apiService.getComplementoNovio(id);
        tipoNombre = 'Complementos de Novio';
        break;
      default:
        alert('Tipo de producto no reconocido');
        this.router.navigate(['/']);
        return;
    }

    observable.subscribe({
      next: (data: any) => {
        this.producto = this.procesarProducto(data);
        this.cargando = false;
      },
      error: (error: any) => {
        console.error('Error al cargar producto:', error);
        this.cargarProductoEjemplo(id, tipoNombre);
      }
    });
  }

  procesarProducto(data: any): any {
  console.log('Procesando producto:', data);
  
  // Asegurar que tiene un array de imágenes
  if (!data.imagenes || !Array.isArray(data.imagenes)) {
    if (data.imagen) {
      // Si tiene 'imagen' singular, convertir a array
      data.imagenes = [data.imagen];
    } else {
      // Si no tiene ninguna imagen, usar placeholder
      data.imagenes = ['https://images.unsplash.com/photo-1519657337289-077653f724ed?w=800&auto=format&fit=crop'];
    }
  }
  
  // Asegurar que las imágenes no están vacías
  if (data.imagenes.length === 0) {
    data.imagenes = ['https://images.unsplash.com/photo-1519657337289-077653f724ed?w=800&auto=format&fit=crop'];
  }
  
  // Agregar descripción larga si no existe
  if (!data.descripcionLarga) {
    data.descripcionLarga = data.descripcion + ' Este producto ha sido cuidadosamente seleccionado para tu día especial. Confeccionado con materiales de la más alta calidad y diseñado para hacer de tu boda un momento inolvidable.';
  }
  
  // Agregar características si no existen
  if (!data.caracteristicas || data.caracteristicas.length === 0) {
    data.caracteristicas = [
      'Alta calidad de materiales',
      'Diseño exclusivo',
      'Disponible en varias tallas',
      'Asesoramiento personalizado',
      'Servicio de ajustes incluido'
    ];
  }
  
  // Asegurar que tallas es un array
  if (data.tallas && typeof data.tallas === 'string') {
    data.tallas = data.tallas.split(',').map((t: string) => t.trim());
  }
  
  // Asegurar que disponible existe
  if (data.disponible === undefined) {
    data.disponible = true;
  }
  
  console.log('Producto procesado:', data);
  return data;
}

cargarProductoEjemplo(id: number, tipoNombre: string): void {
  const todosLosProductos: any = {
    'Vestidos de Novia': [
      {
        id: 1,
        nombre: 'Vestido Romántico Princesa',
        marca: 'Rosa Clará',
        precio: 2500,
        imagen: 'https://images.unsplash.com/photo-1594552072238-52e479f9ebf0?w=800&auto=format&fit=crop',
        imagenes: [
          'https://images.unsplash.com/photo-1594552072238-52e479f9ebf0?w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1519657337289-077653f724ed?w=800&auto=format&fit=crop'
        ],
        descripcion: 'Vestido de corte princesa con encaje y pedrería. Perfecto para una boda de ensueño.',
        descripcionLarga: 'Este majestuoso vestido de novia combina la elegancia clásica con detalles modernos. El corte princesa realza la silueta mientras el encaje delicado y la pedrería artesanal añaden un toque de sofisticación.',
        tallas: ['36', '38', '40', '42', '44'],
        estilo: 'Princesa',
        color: 'Blanco',
        caracteristicas: [
          'Encaje francés de alta calidad',
          'Pedrería Swarovski',
          'Corsé interno ajustable',
          'Cola desmontable'
        ],
        disponible: true
      },
      {
        id: 2,
        nombre: 'Vestido Sirena Elegante',
        marca: 'Pronovias',
        precio: 3200,
        imagen: 'https://images.unsplash.com/photo-1519657337289-077653f724ed?w=800&auto=format&fit=crop',
        imagenes: [
          'https://images.unsplash.com/photo-1519657337289-077653f724ed?w=800&auto=format&fit=crop'
        ],
        descripcion: 'Diseño sirena con escote corazón y cola larga.',
        descripcionLarga: 'Un diseño sofisticado que abraza las curvas con elegancia. El corte sirena se ajusta perfectamente hasta las rodillas.',
        tallas: ['36', '38', '40', '42'],
        estilo: 'Sirena',
        color: 'Marfil',
        caracteristicas: [
          'Tejido satén italiano',
          'Escote corazón estructurado',
          'Cola larga de 2 metros'
        ],
        disponible: true
      },
      {
        id: 3,
        nombre: 'Vestido Bohemio Vintage',
        marca: 'Inmaculada García',
        precio: 1800,
        imagen: 'https://images.unsplash.com/photo-1525087740718-9e0f2c58c7ef?w=800&auto=format&fit=crop',
        imagenes: [
          'https://images.unsplash.com/photo-1525087740718-9e0f2c58c7ef?w=800&auto=format&fit=crop'
        ],
        descripcion: 'Estilo bohemio con encajes y manga larga.',
        descripcionLarga: 'Para la novia con espíritu libre. Este vestido combina el romanticismo vintage con un toque bohemio contemporáneo.',
        tallas: ['34', '36', '38', '40', '42'],
        estilo: 'Bohemio',
        color: 'Crema',
        caracteristicas: [
          'Encaje floral artesanal',
          'Manga larga transparente',
          'Espalda abierta'
        ],
        disponible: true
      },
      {
        id: 4,
        nombre: 'Vestido Línea A Clásico',
        marca: 'Pronovias',
        precio: 2200,
        imagen: 'https://images.unsplash.com/photo-1594552072238-52e479f9ebf0?w=800&auto=format&fit=crop',
        imagenes: [
          'https://images.unsplash.com/photo-1594552072238-52e479f9ebf0?w=800&auto=format&fit=crop'
        ],
        descripcion: 'Corte línea A universal.',
        descripcionLarga: 'Corte línea A que favorece a todas las siluetas. Elegancia atemporal.',
        tallas: ['36', '38', '40', '42', '44', '46'],
        estilo: 'Línea A',
        color: 'Blanco',
        caracteristicas: ['Corte favorecedor', 'Tul de calidad'],
        disponible: true
      },
      {
        id: 5,
        nombre: 'Vestido Minimalista Moderno',
        marca: 'Stella McCartney',
        precio: 2800,
        imagen: 'https://images.unsplash.com/photo-1519657337289-077653f724ed?w=800&auto=format&fit=crop',
        imagenes: [
          'https://images.unsplash.com/photo-1519657337289-077653f724ed?w=800&auto=format&fit=crop'
        ],
        descripcion: 'Diseño minimalista y sofisticado.',
        descripcionLarga: 'Perfecto para novias modernas que buscan elegancia simple.',
        tallas: ['36', '38', '40', '42'],
        estilo: 'Minimalista',
        color: 'Marfil',
        caracteristicas: ['Líneas limpias', 'Tejido premium'],
        disponible: true
      },
      {
        id: 6,
        nombre: 'Vestido Vintage Años 50',
        marca: 'Inmaculada García',
        precio: 2100,
        imagen: 'https://images.unsplash.com/photo-1525087740718-9e0f2c58c7ef?w=800&auto=format&fit=crop',
        imagenes: [
          'https://images.unsplash.com/photo-1525087740718-9e0f2c58c7ef?w=800&auto=format&fit=crop'
        ],
        descripcion: 'Inspirado en los años 50.',
        descripcionLarga: 'Con falda amplia y cintura marcada, estilo retro elegante.',
        tallas: ['34', '36', '38', '40', '42'],
        estilo: 'Vintage',
        color: 'Crema',
        caracteristicas: ['Falda amplia', 'Cintura marcada'],
        disponible: true
      }
    ],
    'Complementos de Novia': [
      {
        id: 1,
        nombre: 'Velo Catedral Largo',
        categoria: 'Velos',
        precio: 180,
        imagen: 'https://images.unsplash.com/photo-1522673607170-d2c8d29e5d7d?w=800&auto=format&fit=crop',
        imagenes: ['https://images.unsplash.com/photo-1522673607170-d2c8d29e5d7d?w=800&auto=format&fit=crop'],
        descripcion: 'Velo de tul suave con encaje.',
        descripcionLarga: 'Velo elegante de 3 metros de longitud con acabados de encaje francés.',
        disponible: true,
        caracteristicas: ['Longitud: 3 metros', 'Tul italiano', 'Encaje francés']
      },
      {
        id: 2,
        nombre: 'Diadema Cristales Swarovski',
        categoria: 'Tocados',
        precio: 250,
        imagen: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop',
        imagenes: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop'],
        descripcion: 'Elegante diadema con cristales.',
        descripcionLarga: 'Diadema de alta joyería con cristales Swarovski genuinos.',
        disponible: true,
        caracteristicas: ['Cristales Swarovski', 'Base ajustable']
      }
    ],
    'Trajes de Novio': [
      {
        id: 1,
        nombre: 'Esmoquin Clásico Negro',
        marca: 'Hugo Boss',
        precio: 850,
        imagen: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop',
        imagenes: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop'],
        descripcion: 'Esmoquin negro de corte clásico.',
        descripcionLarga: 'El esmoquin definitivo para el novio que busca elegancia tradicional.',
        tallas: ['48', '50', '52', '54', '56'],
        tipo: 'Esmoquin',
        color: 'Negro',
        caracteristicas: ['Lana virgen 100%', 'Solapas de satén'],
        disponible: true
      },
      {
        id: 2,
        nombre: 'Traje Azul Marino Slim Fit',
        marca: 'Armani',
        precio: 950,
        imagen: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=800&auto=format&fit=crop',
        imagenes: ['https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=800&auto=format&fit=crop'],
        descripcion: 'Traje slim fit moderno.',
        descripcionLarga: 'Diseño contemporáneo que combina elegancia y modernidad.',
        tallas: ['46', '48', '50', '52', '54'],
        tipo: 'Traje',
        color: 'Azul Marino',
        caracteristicas: ['Corte slim fit', 'Tejido italiano'],
        disponible: true
      }
    ],
    'Complementos de Novio': [
      {
        id: 1,
        nombre: 'Corbata Seda Azul Marino',
        categoria: 'Corbatas',
        precio: 45,
        imagen: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&auto=format&fit=crop',
        imagenes: ['https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&auto=format&fit=crop'],
        descripcion: 'Corbata de seda italiana.',
        descripcionLarga: 'Corbata de seda pura italiana con tejido jacquard.',
        disponible: true,
        caracteristicas: ['Seda italiana 100%', 'Tejido jacquard']
      },
      {
        id: 2,
        nombre: 'Gemelos Plata Grabados',
        categoria: 'Gemelos',
        precio: 85,
        imagen: 'https://images.unsplash.com/photo-1610824352934-c10d87b700cc?w=800&auto=format&fit=crop',
        imagenes: ['https://images.unsplash.com/photo-1610824352934-c10d87b700cc?w=800&auto=format&fit=crop'],
        descripcion: 'Gemelos de plata con grabado.',
        descripcionLarga: 'Gemelos de plata de ley con acabado pulido.',
        disponible: true,
        caracteristicas: ['Plata de ley 925', 'Grabado personalizado']
      }
    ]
  };

  const productos = todosLosProductos[tipoNombre];
  
  if (productos) {
    this.producto = productos.find((p: any) => p.id === id);
  }
  
  if (!this.producto && productos && productos.length > 0) {
    this.producto = productos[0];
  }
  
  if (this.producto) {
    this.producto = this.procesarProducto(this.producto);
  }
  
  this.cargando = false;
  console.log('Producto de ejemplo cargado:', this.producto);
}

  cambiarImagen(index: number): void {
    this.imagenActual = index;
  }

  volverAtras(): void {
    if (this.tipo === 'vestidos-novia') {
      this.router.navigate(['/vestidos-novia']);
    } else if (this.tipo === 'complementos-novia') {
      this.router.navigate(['/complementos-novia']);
    } else if (this.tipo === 'trajes-novio') {
      this.router.navigate(['/trajes-novio']);
    } else if (this.tipo === 'complementos-novio') {
      this.router.navigate(['/complementos-novio']);
    }
  }

  toggleFormularioReserva(): void {
    // Verificar autenticación
    if (!this.authService.isLoggedIn()) {
      alert('Debes iniciar sesión para hacer una reserva');
      this.router.navigate(['/login']);
      return;
    }

    // Verificar si ya tiene reserva
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

    let reservaData: any = {
      usuario: this.authService.getUserId(),
      fecha_evento: this.fechaEvento,
      estado: 'pendiente',
      comentarios: this.comentarios
    };

    // Asignar el tipo correcto de producto
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

    this.reservaEnviando = true;

    this.apiService.crearReserva(reservaData).subscribe({
      next: (response: any) => {
        console.log('Reserva creada:', response);
        this.reservaExitosa = true;
        this.reservaEnviando = false;
        
        // Actualizar reservaExistente
        this.reservaExistente = response;
        
        setTimeout(() => {
          this.mostrarFormularioReserva = false;
          this.reservaExitosa = false;
          this.fechaEvento = '';
          this.comentarios = '';
        }, 3000);
      },
      error: (error: any) => {
        console.error('Error al crear reserva:', error);
        this.reservaEnviando = false;
        alert('Error al crear la reserva. Por favor, intenta de nuevo.');
      }
    });
  }

  consultarDisponibilidad(): void {
    this.toggleFormularioReserva();
  }
}