import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-panel-proveedor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './panel-proveedor.component.html',
  styleUrl: './panel-proveedor.component.css'
})
export class PanelProveedorComponent implements OnInit {
  // Pestaña activa
  pestanaActiva: string = 'resumen'; // resumen, servicios, vestidos, trajes, complementos-novia, complementos-novio

  // Datos del proveedor
  usuario: any = null;
  perfilProveedor: any = null;

  // Productos del proveedor
  servicios: any[] = [];
  vestidosNovia: any[] = [];
  trajesNovio: any[] = [];
  complementosNovia: any[] = [];
  complementosNovio: any[] = [];

  // Estados
  cargando: boolean = true;
  mostrarFormulario: boolean = false;
  tipoFormulario: string = ''; // servicio, vestido, traje, complemento-novia, complemento-novio

  // Formulario de nuevo producto
  nuevoProducto: any = this.inicializarFormulario();

  // Categorías y opciones
  categoriasServicio: any[] = [];
  
  estilosVestido = ['princesa', 'sirena', 'bohemio', 'linea_a', 'minimalista', 'vintage'];
  tiposTraje = ['esmoquin', 'traje', 'chaque', 'smoking'];
  categoriasComplementoNovia = ['velos', 'tocados', 'zapatos', 'bolsos', 'joyeria', 'accesorios', 'lenceria'];
  categoriasComplementoNovio = ['corbatas', 'pajaritas', 'gemelos', 'zapatos', 'relojes', 'panuelos', 'cinturones', 'tirantes', 'alfileres'];

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verificar que es proveedor
    if (!this.authService.isLoggedIn()) {
      alert('Debes iniciar sesión');
      this.router.navigate(['/login']);
      return;
    }

    if (!this.authService.isProveedor()) {
      alert('Esta sección es solo para proveedores');
      this.router.navigate(['/']);
      return;
    }

    this.usuario = this.authService.currentUserValue;
    this.perfilProveedor = this.usuario.perfil_proveedor;
    
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    const usuarioId = this.authService.getUserId();

    // Cargar categorías de servicios
    this.apiService.getCategorias().subscribe({
      next: (data: any) => {
        this.categoriasServicio = data;
      },
      error: (error: any) => {
        console.error('Error al cargar categorías:', error);
      }
    });

    // Cargar servicios del proveedor
    this.apiService.getServicios().subscribe({
      next: (data: any) => {
        this.servicios = data.filter((s: any) => s.creado_por === usuarioId);
      },
      error: (error: any) => {
        console.error('Error al cargar servicios:', error);
      }
    });

    // Cargar vestidos del proveedor
    this.apiService.getVestidosNovia().subscribe({
      next: (data: any) => {
        this.vestidosNovia = data.filter((v: any) => v.proveedor === usuarioId);
      },
      error: (error: any) => {
        console.error('Error al cargar vestidos:', error);
      }
    });

    // Cargar trajes del proveedor
    this.apiService.getTrajesNovio().subscribe({
      next: (data: any) => {
        this.trajesNovio = data.filter((t: any) => t.proveedor === usuarioId);
      },
      error: (error: any) => {
        console.error('Error al cargar trajes:', error);
      }
    });

    // Cargar complementos novia del proveedor
    this.apiService.getComplementosNovia().subscribe({
      next: (data: any) => {
        this.complementosNovia = data.filter((c: any) => c.proveedor === usuarioId);
      },
      error: (error: any) => {
        console.error('Error al cargar complementos novia:', error);
      }
    });

    // Cargar complementos novio del proveedor
    this.apiService.getComplementosNovio().subscribe({
      next: (data: any) => {
        this.complementosNovio = data.filter((c: any) => c.proveedor === usuarioId);
        this.cargando = false;
      },
      error: (error: any) => {
        console.error('Error al cargar complementos novio:', error);
        this.cargando = false;
      }
    });
  }

  cambiarPestana(pestana: string): void {
    this.pestanaActiva = pestana;
    this.mostrarFormulario = false;
  }

  abrirFormulario(tipo: string): void {
    this.tipoFormulario = tipo;
    this.nuevoProducto = this.inicializarFormulario();
    this.mostrarFormulario = true;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.nuevoProducto = this.inicializarFormulario();
  }

  inicializarFormulario(): any {
    return {
      // Campos comunes
      nombre: '',
      descripcion: '',
      descripcion_larga: '',
      precio: 0,
      imagen_principal: '',
      imagenes_adicionales: '',
      caracteristicas: '',
      disponible: true,
      
      // Servicios
      categoria: null,
      
      // Vestidos
      marca: '',
      estilo: 'princesa',
      color: '',
      tallas_disponibles: '',
      
      // Trajes
      tipo: 'esmoquin',
      
      // Complementos
      categoria_complemento: ''
    };
  }

  guardarProducto(): void {
    const usuarioId = this.authService.getUserId();
    
    if (!this.nuevoProducto.nombre || !this.nuevoProducto.precio) {
      alert('Por favor completa nombre y precio');
      return;
    }

    let observable;

    switch(this.tipoFormulario) {
      case 'servicio':
        if (!this.nuevoProducto.categoria) {
          alert('Por favor selecciona una categoría');
          return;
        }
        const servicioData = {
          nombre: this.nuevoProducto.nombre,
          descripcion: this.nuevoProducto.descripcion,
          precio: Number(this.nuevoProducto.precio),
          categoria: Number(this.nuevoProducto.categoria),
          creado_por: usuarioId,
          proveedor_id: this.perfilProveedor?.id || 1,
          imagen: this.nuevoProducto.imagen_principal || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
          disponible: this.nuevoProducto.disponible !== false
        };
        console.log('Datos servicio a enviar:', servicioData);
        observable = this.apiService.crearServicio(servicioData);
        break;
        
      case 'vestido':
        if (!this.nuevoProducto.marca || !this.nuevoProducto.tallas_disponibles) {
          alert('Por favor completa marca y tallas');
          return;
        }
        
        const vestidoData = {
          nombre: this.nuevoProducto.nombre,
          marca: this.nuevoProducto.marca,
          precio: Number(this.nuevoProducto.precio),
          estilo: this.nuevoProducto.estilo || 'princesa',
          color: this.nuevoProducto.color || 'Blanco',
          tallas_disponibles: this.nuevoProducto.tallas_disponibles,
          descripcion: this.nuevoProducto.descripcion,
          descripcion_larga: this.nuevoProducto.descripcion_larga || this.nuevoProducto.descripcion,
          imagen_principal: this.nuevoProducto.imagen_principal || 'https://images.unsplash.com/photo-1594552072238-52e479f9ebf0?w=800',
          imagenes_adicionales: this.nuevoProducto.imagenes_adicionales || '',
          caracteristicas: this.nuevoProducto.caracteristicas || '',
          disponible: this.nuevoProducto.disponible !== false,
          proveedor: usuarioId
        };
        
        console.log('Datos vestido a enviar:', vestidoData);
        observable = this.apiService.crearVestidoNovia(vestidoData);
        break;
        
      case 'traje':
        if (!this.nuevoProducto.marca || !this.nuevoProducto.tallas_disponibles) {
          alert('Por favor completa marca y tallas');
          return;
        }
        
        const trajeData = {
          nombre: this.nuevoProducto.nombre,
          marca: this.nuevoProducto.marca,
          precio: Number(this.nuevoProducto.precio),
          tipo: this.nuevoProducto.tipo || 'esmoquin',
          color: this.nuevoProducto.color || 'Negro',
          tallas_disponibles: this.nuevoProducto.tallas_disponibles,
          descripcion: this.nuevoProducto.descripcion,
          descripcion_larga: this.nuevoProducto.descripcion_larga || this.nuevoProducto.descripcion,
          imagen_principal: this.nuevoProducto.imagen_principal || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800',
          imagenes_adicionales: this.nuevoProducto.imagenes_adicionales || '',
          caracteristicas: this.nuevoProducto.caracteristicas || '',
          disponible: this.nuevoProducto.disponible !== false,
          proveedor: usuarioId
        };
        
        console.log('Datos traje a enviar:', trajeData);
        observable = this.apiService.crearTrajeNovio(trajeData);
        break;
        
      case 'complemento-novia':
        if (!this.nuevoProducto.categoria_complemento) {
          alert('Por favor selecciona una categoría');
          return;
        }
        
        const compNoviaData = {
          nombre: this.nuevoProducto.nombre,
          categoria: this.nuevoProducto.categoria_complemento,
          precio: Number(this.nuevoProducto.precio),
          descripcion: this.nuevoProducto.descripcion,
          descripcion_larga: this.nuevoProducto.descripcion_larga || this.nuevoProducto.descripcion,
          imagen_principal: this.nuevoProducto.imagen_principal || 'https://images.unsplash.com/photo-1522673607170-d2c8d29e5d7d?w=800',
          imagenes_adicionales: this.nuevoProducto.imagenes_adicionales || '',
          caracteristicas: this.nuevoProducto.caracteristicas || '',
          disponible: this.nuevoProducto.disponible !== false,
          proveedor: usuarioId
        };
        
        console.log('Datos complemento novia a enviar:', compNoviaData);
        observable = this.apiService.crearComplementoNovia(compNoviaData);
        break;
        
      case 'complemento-novio':
        if (!this.nuevoProducto.categoria_complemento) {
          alert('Por favor selecciona una categoría');
          return;
        }
        
        const compNovioData = {
          nombre: this.nuevoProducto.nombre,
          categoria: this.nuevoProducto.categoria_complemento,
          precio: Number(this.nuevoProducto.precio),
          descripcion: this.nuevoProducto.descripcion,
          descripcion_larga: this.nuevoProducto.descripcion_larga || this.nuevoProducto.descripcion,
          imagen_principal: this.nuevoProducto.imagen_principal || 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800',
          imagenes_adicionales: this.nuevoProducto.imagenes_adicionales || '',
          caracteristicas: this.nuevoProducto.caracteristicas || '',
          disponible: this.nuevoProducto.disponible !== false,
          proveedor: usuarioId
        };
        
        console.log('Datos complemento novio a enviar:', compNovioData);
        observable = this.apiService.crearComplementoNovio(compNovioData);
        break;
        
      default:
        alert('Tipo de producto no válido');
        return;
    }

    observable.subscribe({
      next: (response: any) => {
        console.log('Producto creado exitosamente:', response);
        alert('¡Producto creado exitosamente!');
        this.cerrarFormulario();
        this.cargarDatos();
      },
      error: (error: any) => {
        console.error('Error completo:', error);
        console.error('Error status:', error.status);
        console.error('Error body:', error.error);
        
        let mensajeError = 'Error al crear el producto: ';
        
        if (error.error) {
          if (typeof error.error === 'string') {
            mensajeError += error.error;
          } else if (error.error.detail) {
            mensajeError += error.error.detail;
          } else if (error.error.error) {
            mensajeError += error.error.error;
          } else {
            // Mostrar todos los errores de validación
            const errores = Object.entries(error.error)
              .map(([campo, mensajes]) => `${campo}: ${mensajes}`)
              .join('\n');
            mensajeError += '\n' + errores;
          }
        } else {
          mensajeError += 'Intenta de nuevo';
        }
        
        alert(mensajeError);
      }
    });
  }
  
  

  eliminarProducto(tipo: string, id: number): void {
    if (!confirm('¿Estás seguro de eliminar este producto?')) {
      return;
    }

    let observable;

    switch(tipo) {
      case 'servicio':
        observable = this.apiService.eliminarServicio(id);
        break;
      case 'vestido':
        observable = this.apiService.eliminarVestidoNovia(id);
        break;
      case 'traje':
        observable = this.apiService.eliminarTrajeNovio(id);
        break;
      case 'complemento-novia':
        observable = this.apiService.eliminarComplementoNovia(id);
        break;
      case 'complemento-novio':
        observable = this.apiService.eliminarComplementoNovio(id);
        break;
      default:
        return;
    }

    observable.subscribe({
      next: () => {
        alert('Producto eliminado exitosamente');
        this.cargarDatos();
      },
      error: (error: any) => {
        console.error('Error al eliminar:', error);
        alert('Error al eliminar el producto');
      }
    });
  }

  get totalProductos(): number {
    return this.servicios.length + 
           this.vestidosNovia.length + 
           this.trajesNovio.length + 
           this.complementosNovia.length + 
           this.complementosNovio.length;
  }
}