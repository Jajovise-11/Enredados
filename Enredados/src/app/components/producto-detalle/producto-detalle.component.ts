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
        // Si falla, usar datos de ejemplo
        this.cargarProductoEjemplo(id, tipoNombre);
      }
    });
  }

  procesarProducto(data: any): any {
    // Asegurar que tiene un array de imágenes
    if (!data.imagenes || !Array.isArray(data.imagenes)) {
      data.imagenes = data.imagen ? [data.imagen] : ['https://via.placeholder.com/800x600?text=' + data.nombre];
    }
    
    // Agregar descripción larga si no existe
    if (!data.descripcionLarga) {
      data.descripcionLarga = data.descripcion + ' Este producto ha sido cuidadosamente seleccionado para tu día especial.';
    }
    
    // Agregar características si no existen
    if (!data.caracteristicas) {
      data.caracteristicas = [
        'Alta calidad de materiales',
        'Diseño exclusivo',
        'Disponible en varias tallas',
        'Envío gratuito',
        'Devolución en 30 días'
      ];
    }
    
    return data;
  }

  cargarProductoEjemplo(id: number, tipoNombre: string): void {
    // Base de datos de productos de ejemplo completa
    const todosLosProductos: any = {
      'Vestidos de Novia': [
        {
          id: 1,
          nombre: 'Vestido Romántico Princesa',
          marca: 'Rosa Clará',
          precio: 2500,
          imagenes: [
            'https://images.unsplash.com/photo-1594552072238-52e479f9ebf0?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1519657337289-077653f724ed?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1525087740718-9e0f2c58c7ef?w=800&auto=format&fit=crop'
          ],
          descripcion: 'Vestido de corte princesa con encaje y pedrería. Perfecto para una boda de ensueño.',
          descripcionLarga: 'Este majestuoso vestido de novia combina la elegancia clásica con detalles modernos. El corte princesa realza la silueta mientras el encaje delicado y la pedrería artesanal añaden un toque de sofisticación. Confeccionado con los mejores materiales, este vestido te hará sentir como la princesa que siempre soñaste ser en tu día especial.',
          tallas: ['36', '38', '40', '42', '44'],
          estilo: 'Princesa',
          color: 'Blanco',
          caracteristicas: [
            'Encaje francés de alta calidad',
            'Pedrería Swarovski',
            'Corsé interno ajustable',
            'Cola desmontable',
            'Incluye velo a juego'
          ],
          disponible: true
        },
        {
          id: 2,
          nombre: 'Vestido Sirena Elegante',
          marca: 'Pronovias',
          precio: 3200,
          imagenes: [
            'https://images.unsplash.com/photo-1519657337289-077653f724ed?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1594552072238-52e479f9ebf0?w=800&auto=format&fit=crop'
          ],
          descripcion: 'Diseño sirena con escote corazón y cola larga. Ideal para resaltar la figura.',
          descripcionLarga: 'Un diseño sofisticado que abraza las curvas con elegancia. El corte sirena se ajusta perfectamente hasta las rodillas, donde se abre en una espectacular cola. El escote corazón realza el busto mientras el tejido de alta calidad crea una silueta impecable.',
          tallas: ['36', '38', '40', '42'],
          estilo: 'Sirena',
          color: 'Marfil',
          caracteristicas: [
            'Tejido satén italiano',
            'Escote corazón estructurado',
            'Cola larga de 2 metros',
            'Cremallera invisible',
            'Forro interior suave'
          ],
          disponible: true
        },
        {
          id: 3,
          nombre: 'Vestido Bohemio Vintage',
          marca: 'Inmaculada García',
          precio: 1800,
          imagenes: [
            'https://images.unsplash.com/photo-1525087740718-9e0f2c58c7ef?w=800&auto=format&fit=crop'
          ],
          descripcion: 'Estilo bohemio con encajes y manga larga. Perfecto para bodas al aire libre.',
          descripcionLarga: 'Para la novia con espíritu libre. Este vestido combina el romanticismo vintage con un toque bohemio contemporáneo. Los encajes delicados, la manga larga y el fluido de la falda crean un look etéreo perfecto para ceremonias al aire libre.',
          tallas: ['34', '36', '38', '40', '42'],
          estilo: 'Bohemio',
          color: 'Crema',
          caracteristicas: [
            'Encaje floral artesanal',
            'Manga larga transparente',
            'Espalda abierta',
            'Falda de vuelo',
            'Cinta ajustable en cintura'
          ],
          disponible: true
        }
      ],
      'Complementos de Novia': [
        {
          id: 1,
          nombre: 'Velo Catedral Largo',
          categoria: 'Velos',
          precio: 180,
          imagenes: [
            'https://images.unsplash.com/photo-1522673607170-d2c8d29e5d7d?w=800&auto=format&fit=crop'
          ],
          descripcion: 'Velo de tul suave con detalles de encaje en los bordes. Longitud catedral.',
          descripcionLarga: 'Velo elegante de 3 metros de longitud con acabados de encaje francés. El tul ultra suave cae con gracia creando un efecto espectacular en la ceremonia.',
          disponible: true,
          caracteristicas: [
            'Longitud: 3 metros',
            'Tul italiano',
            'Encaje francés en bordes',
            'Peineta incluida',
            'Color marfil/blanco'
          ]
        },
        {
          id: 2,
          nombre: 'Diadema Cristales Swarovski',
          categoria: 'Tocados',
          precio: 250,
          imagenes: [
            'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop'
          ],
          descripcion: 'Elegante diadema con cristales Swarovski auténticos. Brillo espectacular.',
          descripcionLarga: 'Diadema de alta joyería con cristales Swarovski genuinos. Cada cristal está colocado artesanalmente para crear un efecto de brillo incomparable.',
          disponible: true,
          caracteristicas: [
            'Cristales Swarovski auténticos',
            'Base ajustable',
            'Acabado plateado',
            'Diseño atemporal',
            'Estuche incluido'
          ]
        }
      ],
      'Trajes de Novio': [
        {
          id: 1,
          nombre: 'Esmoquin Clásico Negro',
          marca: 'Hugo Boss',
          precio: 850,
          imagenes: [
            'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop'
          ],
          descripcion: 'Esmoquin negro de corte clásico con solapas de satén. Elegancia atemporal.',
          descripcionLarga: 'El esmoquin definitivo para el novio que busca elegancia tradicional. Confeccionado en lana virgen con solapas de satén, este traje representa la sofisticación en su máxima expresión.',
          tallas: ['48', '50', '52', '54', '56'],
          tipo: 'Esmoquin',
          color: 'Negro',
          caracteristicas: [
            'Lana virgen 100%',
            'Solapas de satén',
            'Forro de seda',
            'Botones cubiertos',
            'Incluye pajarita'
          ],
          disponible: true
        },
        {
          id: 2,
          nombre: 'Traje Azul Marino Slim Fit',
          marca: 'Armani',
          precio: 950,
          imagenes: [
            'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=800&auto=format&fit=crop'
          ],
          descripcion: 'Traje slim fit en azul marino. Moderno y sofisticado.',
          descripcionLarga: 'Diseño contemporáneo que combina elegancia y modernidad. El corte slim fit estiliza la silueta mientras el azul marino aporta versatilidad y distinción.',
          tallas: ['46', '48', '50', '52', '54'],
          tipo: 'Traje',
          color: 'Azul Marino',
          caracteristicas: [
            'Corte slim fit',
            'Tejido italiano',
            'Dos botones',
            'Bolsillos ocultos',
            'Pantalón con pinzas'
          ],
          disponible: true
        }
      ],
      'Complementos de Novio': [
        {
          id: 1,
          nombre: 'Corbata Seda Azul Marino',
          categoria: 'Corbatas',
          precio: 45,
          imagenes: [
            'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&auto=format&fit=crop'
          ],
          descripcion: 'Corbata de seda italiana en azul marino. Acabado impecable.',
          descripcionLarga: 'Corbata de seda pura italiana con tejido jacquard. El azul marino profundo combina con cualquier traje mientras el acabado brillante añade sofisticación.',
          disponible: true,
          caracteristicas: [
            'Seda italiana 100%',
            'Tejido jacquard',
            'Largo: 150cm',
            'Hecha a mano',
            'Resistente a arrugas'
          ]
        },
        {
          id: 2,
          nombre: 'Gemelos Plata Grabados',
          categoria: 'Gemelos',
          precio: 85,
          imagenes: [
            'https://images.unsplash.com/photo-1610824352934-c10d87b700cc?w=800&auto=format&fit=crop'
          ],
          descripcion: 'Gemelos de plata con posibilidad de grabado personalizado.',
          descripcionLarga: 'Gemelos de plata de ley con acabado pulido. Incluye servicio de grabado personalizado para añadir iniciales o fecha especial.',
          disponible: true,
          caracteristicas: [
            'Plata de ley 925',
            'Grabado personalizado incluido',
            'Estuche de regalo',
            'Garantía de por vida',
            'Cierre seguro'
          ]
        }
      ]
    };

    // Buscar el producto en los datos de ejemplo
    const productos = todosLosProductos[tipoNombre];
    
    if (productos) {
      this.producto = productos.find((p: any) => p.id === id);
    }
    
    if (!this.producto) {
      // Si no se encuentra el producto específico, usar el primero de la categoría
      this.producto = productos && productos.length > 0 ? productos[0] : null;
    }
    
    this.cargando = false;
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

  // Variables para reserva
  mostrarFormularioReserva: boolean = false;
  fechaEvento: string = '';
  comentarios: string = '';
  reservaEnviando: boolean = false;
  reservaExitosa: boolean = false;
  fechaMinima: string = new Date().toISOString().split('T')[0];

  toggleFormularioReserva(): void {
    // Verificar autenticación
    if (!this.authService.isLoggedIn()) {
      alert('Debes iniciar sesión para hacer una reserva');
      this.router.navigate(['/login']);
      return;
    }
    this.mostrarFormularioReserva = !this.mostrarFormularioReserva;
  }

  realizarReserva(): void {
    if (!this.fechaEvento) {
      alert('Por favor, selecciona una fecha para el evento');
      return;
    }

    // Preparar datos según el tipo de producto
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