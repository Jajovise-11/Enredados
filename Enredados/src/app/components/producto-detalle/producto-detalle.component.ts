import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.css'
})
export class ProductoDetalleComponent implements OnInit {
  producto: any = null;
  tipo: string = ''; // 'vestido', 'complemento-novia', 'traje', 'complemento-novio'
  cargando: boolean = true;

  // Base de datos de productos
  todosLosProductos: any = {
    'vestidos': [
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
        ]
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
        ]
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
        ]
      }
    ],
    'complementos-novia': [
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
    'trajes': [
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
        ]
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
        ]
      }
    ],
    'complementos-novio': [
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

  imagenActual: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router
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
    
    let tipoBase = this.tipo;
    if (this.tipo === 'vestidos-novia') tipoBase = 'vestidos';
    if (this.tipo === 'trajes-novio') tipoBase = 'trajes';
    
    const productos = this.todosLosProductos[tipoBase];
    
    if (productos) {
      this.producto = productos.find((p: any) => p.id === id);
    }
    
    if (!this.producto) {
      alert('Producto no encontrado');
      this.router.navigate(['/']);
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

  consultarDisponibilidad(): void {
    alert('Funcionalidad de consulta próximamente. Por ahora, redirigiendo a servicios...');
    this.router.navigate(['/servicios']);
  }
}