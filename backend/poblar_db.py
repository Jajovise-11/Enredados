import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'enredados.settings')
django.setup()

from core.models import (
    CategoriaServicio, Proveedor, Servicio, 
    VestidoNovia, TrajeNovio, ComplementoNovia, ComplementoNovio,
    PerfilProveedor
)
from django.contrib.auth.models import User

print("🚀 Iniciando población de base de datos...\n")

# ========== CREAR USUARIOS PROVEEDORES ==========
print("📝 Creando usuarios proveedores...")

usuario_proveedor1, created = User.objects.get_or_create(
    username='proveedor_audio',
    defaults={
        'email': 'audio@eventos.com',
        'first_name': 'Audio',
        'last_name': 'Eventos'
    }
)
if created:
    usuario_proveedor1.set_password('password123')
    usuario_proveedor1.save()
    PerfilProveedor.objects.create(
        user=usuario_proveedor1,
        nombre_empresa='Eventos Audio Pro',
        descripcion='DJ profesional con 10 años de experiencia',
        telefono='612345678',
        direccion='Calle Mayor 123',
        ciudad='Madrid',
        cif_nif='B12345678'
    )

usuario_proveedor2, created = User.objects.get_or_create(
    username='proveedor_foto',
    defaults={
        'email': 'foto@estudio.com',
        'first_name': 'Foto',
        'last_name': 'Studio'
    }
)
if created:
    usuario_proveedor2.set_password('password123')
    usuario_proveedor2.save()
    PerfilProveedor.objects.create(
        user=usuario_proveedor2,
        nombre_empresa='FotoArte Studio',
        descripcion='Fotografía profesional para bodas',
        telefono='623456789',
        direccion='Avenida Libertad 45',
        ciudad='Barcelona',
        cif_nif='B23456789'
    )

usuario_proveedor3, created = User.objects.get_or_create(
    username='proveedor_catering',
    defaults={
        'email': 'catering@deluxe.com',
        'first_name': 'Catering',
        'last_name': 'Deluxe'
    }
)
if created:
    usuario_proveedor3.set_password('password123')
    usuario_proveedor3.save()
    PerfilProveedor.objects.create(
        user=usuario_proveedor3,
        nombre_empresa='Catering Deluxe',
        descripcion='Catering de alta cocina para eventos',
        telefono='634567890',
        direccion='Calle Gastronomía 78',
        ciudad='Valencia',
        cif_nif='B34567890'
    )

# ========== CREAR CATEGORÍAS ==========
print("📁 Creando categorías...")

categorias = [
    ('DJ y Música', 'Servicios de música y animación para bodas'),
    ('Fotografía', 'Servicios de fotografía y video profesional'),
    ('Catering', 'Servicios de comida y bebida'),
    ('Decoración', 'Decoración y ambientación para bodas'),
    ('Salones', 'Salones y espacios para celebraciones'),
]

for nombre, desc in categorias:
    CategoriaServicio.objects.get_or_create(
        nombre=nombre,
        defaults={'descripcion': desc}
    )

cat_dj = CategoriaServicio.objects.get(nombre='DJ y Música')
cat_foto = CategoriaServicio.objects.get(nombre='Fotografía')
cat_catering = CategoriaServicio.objects.get(nombre='Catering')
cat_decoracion = CategoriaServicio.objects.get(nombre='Decoración')
cat_salones = CategoriaServicio.objects.get(nombre='Salones')

# ========== CREAR PROVEEDORES ==========
print("🏢 Creando proveedores...")

prov1, _ = Proveedor.objects.get_or_create(
    nombre='Eventos Audio Pro',
    defaults={
        'descripcion': 'DJ profesional con equipos de última generación',
        'telefono': '612345678',
        'email': 'audio@eventos.com',
        'direccion': 'Calle Mayor 123',
        'ciudad': 'Madrid',
        'usuario_proveedor': usuario_proveedor1
    }
)

prov2, _ = Proveedor.objects.get_or_create(
    nombre='FotoArte Studio',
    defaults={
        'descripcion': 'Fotografía artística para bodas',
        'telefono': '623456789',
        'email': 'foto@estudio.com',
        'direccion': 'Avenida Libertad 45',
        'ciudad': 'Barcelona',
        'usuario_proveedor': usuario_proveedor2
    }
)

prov3, _ = Proveedor.objects.get_or_create(
    nombre='Catering Deluxe',
    defaults={
        'descripcion': 'Alta cocina para eventos inolvidables',
        'telefono': '634567890',
        'email': 'catering@deluxe.com',
        'direccion': 'Calle Gastronomía 78',
        'ciudad': 'Valencia',
        'usuario_proveedor': usuario_proveedor3
    }
)

# ========== CREAR SERVICIOS ==========
print("🎵 Creando servicios...")

servicios = [
    # DJ y Música
    {
        'nombre': 'DJ Profesional - Boda Completa',
        'proveedor': prov1,
        'categoria': cat_dj,
        'descripcion': 'Servicio completo de DJ para bodas con equipo profesional',
        'precio': 800.00,
        'imagen': 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400'
    },
    {
        'nombre': 'Orquesta en Vivo - 8 Músicos',
        'proveedor': prov1,
        'categoria': cat_dj,
        'descripcion': 'Orquesta profesional con repertorio variado',
        'precio': 2500.00,
        'imagen': 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400'
    },
    {
        'nombre': 'Saxofonista para Ceremonia',
        'proveedor': prov1,
        'categoria': cat_dj,
        'descripcion': 'Música en vivo durante la ceremonia',
        'precio': 350.00,
        'imagen': 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=400'
    },
    {
        'nombre': 'DJ + Saxofonista Pack',
        'proveedor': prov1,
        'categoria': cat_dj,
        'descripcion': 'Combinación perfecta para tu boda',
        'precio': 1100.00,
        'imagen': 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400'
    },
    # Fotografía
    {
        'nombre': 'Fotógrafo Premium - Todo el Día',
        'proveedor': prov2,
        'categoria': cat_foto,
        'descripcion': 'Cobertura fotográfica completa de tu boda',
        'precio': 1200.00,
        'imagen': 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400'
    },
    {
        'nombre': 'Video 4K Cinematic',
        'proveedor': prov2,
        'categoria': cat_foto,
        'descripcion': 'Vídeo cinematográfico de alta calidad',
        'precio': 1800.00,
        'imagen': 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400'
    },
    {
        'nombre': 'Fotomatón Vintage',
        'proveedor': prov2,
        'categoria': cat_foto,
        'descripcion': 'Diversión asegurada para tus invitados',
        'precio': 450.00,
        'imagen': 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400'
    },
    {
        'nombre': 'Álbum Digital Premium',
        'proveedor': prov2,
        'categoria': cat_foto,
        'descripcion': 'Todas tus fotos editadas en alta resolución',
        'precio': 600.00,
        'imagen': 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=400'
    },
    {
        'nombre': 'Drone Aéreo Profesional',
        'proveedor': prov2,
        'categoria': cat_foto,
        'descripcion': 'Tomas aéreas espectaculares de tu boda',
        'precio': 500.00,
        'imagen': 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400'
    },
    # Catering
    {
        'nombre': 'Catering Premium (100 personas)',
        'proveedor': prov3,
        'categoria': cat_catering,
        'descripcion': 'Menú completo para 100 invitados',
        'precio': 5000.00,
        'imagen': 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400'
    },
    {
        'nombre': 'Cocktail de Bienvenida',
        'proveedor': prov3,
        'categoria': cat_catering,
        'descripcion': 'Aperitivos gourmet y bebidas',
        'precio': 1200.00,
        'imagen': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400'
    },
    {
        'nombre': 'Barra Libre Premium',
        'proveedor': prov3,
        'categoria': cat_catering,
        'descripcion': 'Barra libre con licores de marca',
        'precio': 2000.00,
        'imagen': 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400'
    },
    {
        'nombre': 'Tarta de Boda Personalizada',
        'proveedor': prov3,
        'categoria': cat_catering,
        'descripcion': 'Tarta diseñada a tu gusto',
        'precio': 450.00,
        'imagen': 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400'
    },
    {
        'nombre': 'Candy Bar Deluxe',
        'proveedor': prov3,
        'categoria': cat_catering,
        'descripcion': 'Mesa de dulces variados',
        'precio': 350.00,
        'imagen': 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400'
    },
    # Decoración
    {
        'nombre': 'Decoración Floral Completa',
        'proveedor': prov1,
        'categoria': cat_decoracion,
        'descripcion': 'Arreglos florales para ceremonia y banquete',
        'precio': 1500.00,
        'imagen': 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400'
    },
    {
        'nombre': 'Iluminación LED Ambiental',
        'proveedor': prov1,
        'categoria': cat_decoracion,
        'descripcion': 'Sistema de iluminación profesional',
        'precio': 800.00,
        'imagen': 'https://images.unsplash.com/photo-1519167758481-83f29da8a3e0?w=400'
    },
    {
        'nombre': 'Arco Floral para Ceremonia',
        'proveedor': prov1,
        'categoria': cat_decoracion,
        'descripcion': 'Arco decorado con flores naturales',
        'precio': 650.00,
        'imagen': 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400'
    },
    # Salones
    {
        'nombre': 'Salón Jardín - Capacidad 150',
        'proveedor': prov1,
        'categoria': cat_salones,
        'descripcion': 'Hermoso salón con jardín exterior',
        'precio': 3000.00,
        'imagen': 'https://images.unsplash.com/photo-1519167758481-83f29da8a3e0?w=400'
    },
    {
        'nombre': 'Finca Rústica - Capacidad 200',
        'proveedor': prov2,
        'categoria': cat_salones,
        'descripcion': 'Finca con encanto rural',
        'precio': 4500.00,
        'imagen': 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400'
    },
]

for servicio_data in servicios:
    Servicio.objects.get_or_create(
        nombre=servicio_data['nombre'],
        defaults={
            'proveedor': servicio_data['proveedor'],
            'categoria': servicio_data['categoria'],
            'descripcion': servicio_data['descripcion'],
            'precio': servicio_data['precio'],
            'imagen': servicio_data['imagen'],
            'disponible': True,
            'creado_por': servicio_data['proveedor'].usuario_proveedor
        }
    )

# ========== CREAR VESTIDOS DE NOVIA ==========
print("👰 Creando vestidos de novia...")

vestidos = [
    {
        'nombre': 'Vestido Princesa Romántico',
        'marca': 'Rosa Clará',
        'precio': 2500.00,
        'descripcion': 'Vestido estilo princesa con encaje francés',
        'descripcion_larga': 'Hermoso vestido estilo princesa con detalles de encaje francés y pedrería Swarovski',
        'estilo': 'princesa',
        'color': 'Blanco marfil',
        'tallas_disponibles': '36,38,40,42,44',
        'imagen_principal': 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
        'caracteristicas': 'Encaje francés, Pedrería Swarovski, Cola de 2 metros'
    },
    {
        'nombre': 'Vestido Sirena Elegante',
        'marca': 'Pronovias',
        'precio': 3200.00,
        'descripcion': 'Vestido sirena con escote corazón',
        'descripcion_larga': 'Elegante vestido sirena que realza la figura con escote corazón',
        'estilo': 'sirena',
        'color': 'Blanco puro',
        'tallas_disponibles': '36,38,40,42',
        'imagen_principal': 'https://images.unsplash.com/photo-1594552072238-f036ca1de1b9?w=400',
        'caracteristicas': 'Escote corazón, Tejido satén, Cola desmontable'
    },
    {
        'nombre': 'Vestido Bohemio Vintage',
        'marca': 'Rue de Seine',
        'precio': 2800.00,
        'descripcion': 'Vestido boho con detalles vintage',
        'descripcion_larga': 'Vestido bohemio con encaje vintage y mangas largas',
        'estilo': 'bohemio',
        'color': 'Crema',
        'tallas_disponibles': '34,36,38,40,42',
        'imagen_principal': 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=400',
        'caracteristicas': 'Encaje vintage, Mangas largas, Espalda abierta'
    },
    {
        'nombre': 'Vestido A-Line Minimalista',
        'marca': 'Vera Wang',
        'precio': 3500.00,
        'descripcion': 'Elegancia minimalista en corte A',
        'descripcion_larga': 'Diseño minimalista y sofisticado con líneas limpias',
        'estilo': 'linea_a',
        'color': 'Blanco',
        'tallas_disponibles': '34,36,38,40,42,44',
        'imagen_principal': 'https://images.unsplash.com/photo-1594552072238-f036ca1de1b9?w=400',
        'caracteristicas': 'Diseño minimalista, Satén de seda, Escote barco'
    },
    {
        'nombre': 'Vestido Imperio con Tul',
        'marca': 'Monique Lhuillier',
        'precio': 2900.00,
        'descripcion': 'Vestido imperio con capas de tul',
        'descripcion_larga': 'Romántico vestido imperio con múltiples capas de tul',
        'estilo': 'imperio',
        'color': 'Champagne',
        'tallas_disponibles': '36,38,40,42,44',
        'imagen_principal': 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
        'caracteristicas': 'Talle imperio, Capas de tul, Pedrería en cintura'
    },
    {
        'nombre': 'Vestido Sirena con Transparencias',
        'marca': 'Galia Lahav',
        'precio': 4200.00,
        'descripcion': 'Sirena sensual con encaje transparente',
        'descripcion_larga': 'Vestido sirena con detalles de encaje transparente',
        'estilo': 'sirena',
        'color': 'Nude con blanco',
        'tallas_disponibles': '34,36,38,40,42',
        'imagen_principal': 'https://images.unsplash.com/photo-1594552072238-f036ca1de1b9?w=400',
        'caracteristicas': 'Transparencias, Encaje bordado, Espalda dramática'
    },
    {
        'nombre': 'Vestido Princesa con Manga',
        'marca': 'Elie Saab',
        'precio': 3800.00,
        'descripcion': 'Princesa de cuento con mangas largas',
        'descripcion_larga': 'Vestido de princesa con elegantes mangas de encaje',
        'estilo': 'princesa',
        'color': 'Blanco marfil',
        'tallas_disponibles': '36,38,40,42,44,46',
        'imagen_principal': 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
        'caracteristicas': 'Mangas de encaje, Volumen controlado, Pedrería delicada'
    },
    {
        'nombre': 'Vestido Corte Recto Moderno',
        'marca': 'Carolina Herrera',
        'precio': 3100.00,
        'descripcion': 'Líneas rectas y elegancia moderna',
        'descripcion_larga': 'Vestido de corte recto con detalles arquitectónicos',
        'estilo': 'recto',
        'color': 'Blanco puro',
        'tallas_disponibles': '34,36,38,40,42',
        'imagen_principal': 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=400',
        'caracteristicas': 'Corte arquitectónico, Sin cola, Mikado de seda'
    },
    {
        'nombre': 'Vestido Boho con Flores 3D',
        'marca': 'Immacle',
        'precio': 2600.00,
        'descripcion': 'Estilo bohemio con flores tridimensionales',
        'descripcion_larga': 'Vestido bohemio decorado con flores 3D bordadas',
        'estilo': 'bohemio',
        'color': 'Marfil',
        'tallas_disponibles': '36,38,40,42',
        'imagen_principal': 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=400',
        'caracteristicas': 'Flores 3D, Espalda abierta, Tul bordado'
    },
    {
        'nombre': 'Vestido Dos Piezas Contemporáneo',
        'marca': 'Reformation',
        'precio': 1800.00,
        'descripcion': 'Set de dos piezas moderno y versátil',
        'descripcion_larga': 'Conjunto de crop top y falda para novia moderna',
        'estilo': 'dos_piezas',
        'color': 'Blanco',
        'tallas_disponibles': '34,36,38,40,42,44',
        'imagen_principal': 'https://images.unsplash.com/photo-1594552072238-f036ca1de1b9?w=400',
        'caracteristicas': 'Crop top con encaje, Falda satén, Diseño versátil'
    },
]

for vestido_data in vestidos:
    VestidoNovia.objects.get_or_create(
        nombre=vestido_data['nombre'],
        defaults={**vestido_data, 'disponible': True, 'proveedor': usuario_proveedor1}
    )

# ========== CREAR TRAJES DE NOVIO ==========
print("🤵 Creando trajes de novio...")

trajes = [
    {
        'nombre': 'Esmoquin Clásico Negro',
        'marca': 'Hugo Boss',
        'precio': 850.00,
        'descripcion': 'Esmoquin elegante de corte clásico',
        'descripcion_larga': 'Esmoquin negro clásico con solapa de raso',
        'tipo': 'esmoquin',
        'color': 'Negro',
        'tallas_disponibles': '48,50,52,54,56',
        'imagen_principal': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400',
        'caracteristicas': 'Solapa raso, Corbata incluida, Lana italiana'
    },
    {
        'nombre': 'Traje Azul Marino Slim Fit',
        'marca': 'Armani',
        'precio': 1200.00,
        'descripcion': 'Traje moderno azul marino',
        'descripcion_larga': 'Elegante traje azul marino con corte slim fit',
        'tipo': 'traje',
        'color': 'Azul marino',
        'tallas_disponibles': '48,50,52,54',
        'imagen_principal': 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400',
        'caracteristicas': 'Corte slim fit, Lana 100%, Chaleco incluido'
    },
    {
        'nombre': 'Traje Gris Marengo',
        'marca': 'Canali',
        'precio': 980.00,
        'descripcion': 'Traje gris versátil y elegante',
        'descripcion_larga': 'Traje gris marengo perfecto para cualquier ocasión',
        'tipo': 'traje',
        'color': 'Gris marengo',
        'tallas_disponibles': '48,50,52,54,56',
        'imagen_principal': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400',
        'caracteristicas': 'Lana virgen, Forro de seda, Tres piezas'
    },
    {
        'nombre': 'Esmoquin Blanco Veraniego',
        'marca': 'Ralph Lauren',
        'precio': 1100.00,
        'descripcion': 'Esmoquin blanco ideal para verano',
        'descripcion_larga': 'Elegante esmoquin blanco perfecto para bodas de verano',
        'tipo': 'esmoquin',
        'color': 'Blanco',
        'tallas_disponibles': '48,50,52,54',
        'imagen_principal': 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400',
        'caracteristicas': 'Lino y algodón, Solapa raso negro, Pajarita incluida'
    },
    {
        'nombre': 'Traje Beige Casual Elegante',
        'marca': 'Massimo Dutti',
        'precio': 650.00,
        'descripcion': 'Traje beige para bodas informales',
        'descripcion_larga': 'Traje beige de lino para ceremonias al aire libre',
        'tipo': 'casual',
        'color': 'Beige',
        'tallas_disponibles': '48,50,52,54,56',
        'imagen_principal': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400',
        'caracteristicas': 'Lino natural, Corte regular, Transpirable'
    },
    {
        'nombre': 'Smoking Azul Medianoche',
        'marca': 'Tom Ford',
        'precio': 1800.00,
        'descripcion': 'Smoking de lujo en azul medianoche',
        'descripcion_larga': 'Smoking de alta costura con detalles premium',
        'tipo': 'esmoquin',
        'color': 'Azul medianoche',
        'tallas_disponibles': '48,50,52,54',
        'imagen_principal': 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400',
        'caracteristicas': 'Corte italiano, Solapa pico, Botones forrados'
    },
    {
        'nombre': 'Traje Príncipe de Gales',
        'marca': 'Hackett London',
        'precio': 1050.00,
        'descripcion': 'Traje con patrón clásico inglés',
        'descripcion_larga': 'Elegante traje con patrón Príncipe de Gales',
        'tipo': 'traje',
        'color': 'Gris con cuadros',
        'tallas_disponibles': '48,50,52,54,56',
        'imagen_principal': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400',
        'caracteristicas': 'Patrón inglés, Lana peinada, Corte clásico'
    },
    {
        'nombre': 'Chaqué Tradicional',
        'marca': 'Sastrería Cornejo',
        'precio': 1400.00,
        'descripcion': 'Chaqué para ceremonias formales',
        'descripcion_larga': 'Chaqué tradicional español de máxima elegancia',
        'tipo': 'chaque',
        'color': 'Gris perla',
        'tallas_disponibles': '48,50,52,54,56',
        'imagen_principal': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400',
        'caracteristicas': 'Levita, Pantalón a rayas, Chaleco gris'
    },
]

for traje_data in trajes:
    TrajeNovio.objects.get_or_create(
        nombre=traje_data['nombre'],
        defaults={**traje_data, 'disponible': True, 'proveedor': usuario_proveedor1}
    )

# ========== CREAR COMPLEMENTOS NOVIA ==========
print("💍 Creando complementos de novia...")

complementos_novia = [
    {
        'nombre': 'Velo Catedral de Encaje',
        'categoria': 'velos',
        'precio': 180.00,
        'descripcion': 'Velo largo con borde de encaje',
        'descripcion_larga': 'Elegante velo catedral de 3 metros con borde de encaje',
        'imagen_principal': 'https://images.unsplash.com/photo-1594552072238-f036ca1de1b9?w=400',
        'caracteristicas': '3 metros, Encaje francés, Tul suave'
        },
    {
        'nombre': 'Peineta Floral Dorada',
        'categoria': 'accesorios_cabello',
        'precio': 45.00,
        'descripcion': 'Peineta dorada con diseño floral',
        'descripcion_larga': 'Peineta floral dorada con detalles metálicos perfecta para un look romántico',
        'imagen_principal': 'https://images.unsplash.com/photo-1560067174-b353a478dbbd?w=400',
        'caracteristicas': 'Baño dorado, Diseño floral, Sujeción firme'
    },
    {
        'nombre': 'Tocado de Perlas y Cristales',
        'categoria': 'accesorios_cabello',
        'precio': 60.00,
        'descripcion': 'Tocado elegante para novia',
        'descripcion_larga': 'Tocado elaborado a mano con perlas naturales y cristales premium',
        'imagen_principal': 'https://images.unsplash.com/photo-1601582586427-828a126dfe66?w=400',
        'caracteristicas': 'Perlas naturales, Hecho a mano, Ajustable'
    },
    {
        'nombre': 'Ramo Artificial Premium',
        'categoria': 'ramos',
        'precio': 95.00,
        'descripcion': 'Ramo de novia eterno',
        'descripcion_larga': 'Ramo de flores artificiales premium que parece totalmente natural',
        'imagen_principal': 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400',
        'caracteristicas': 'Flores premium, No se marchita, Material hipoalergénico'
    },
    {
        'nombre': 'Ramo de Rosas Preservadas',
        'categoria': 'ramos',
        'precio': 130.00,
        'descripcion': 'Ramo de rosas naturales preservadas',
        'descripcion_larga': 'Ramo elegante fabricado con rosas naturales preservadas que duran años',
        'imagen_principal': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
        'caracteristicas': 'Rosas preservadas, Duración larga, Aromatizado'
    },
    {
        'nombre': 'Liguero Encaje Blanco',
        'categoria': 'lenceria',
        'precio': 25.00,
        'descripcion': 'Liguero clásico para novia',
        'descripcion_larga': 'Liguero de encaje blanco con detalles delicados',
        'imagen_principal': 'https://images.unsplash.com/photo-1589174700692-1bdaf2b0dba3?w=400',
        'caracteristicas': 'Encaje suave, Elástico, Talla única'
    },
    {
        'nombre': 'Lencería Bridal Premium',
        'categoria': 'lenceria',
        'precio': 80.00,
        'descripcion': 'Set de lencería elegante',
        'descripcion_larga': 'Conjunto de lencería blanca ideal para el día de la boda',
        'imagen_principal': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400',
        'caracteristicas': 'Encaje bordado, Suave y cómodo, Varios talles'
    },
    {
        'nombre': 'Diadema con Cristales',
        'categoria': 'accesorios_cabello',
        'precio': 70.00,
        'descripcion': 'Diadema brillante para novia',
        'descripcion_larga': 'Diadema plateada con cristales que aporta elegancia y luz',
        'imagen_principal': 'https://images.unsplash.com/photo-1587223968140-5fbd4e81f625?w=400',
        'caracteristicas': 'Cristales brillantes, Base metálica, Ajuste perfecto'
    },
    {
        'nombre': 'Guantes de Encaje Vintage',
        'categoria': 'guantes',
        'precio': 40.00,
        'descripcion': 'Guantes largos estilo vintage',
        'descripcion_larga': 'Guantes de encaje blanco ideales para novias clásicas',
        'imagen_principal': 'https://images.unsplash.com/photo-1520964564270-4691a5b1dbce?w=400',
        'caracteristicas': 'Encaje suave, Largos, Cierre cómodo'
    },
    {
        'nombre': 'Capa de Novia con Tul',
        'categoria': 'capas',
        'precio': 150.00,
        'descripcion': 'Capa estilizada con caída suave',
        'descripcion_larga': 'Capa larga hecha de tul suave que sustituye al velo tradicional',
        'imagen_principal': 'https://images.unsplash.com/photo-1601582586427-828a126dfe66?w=400',
        'caracteristicas': 'Tul suave, Transparente, Ligera'
    },
    {
        'nombre': 'Bolso Elegante Perlado',
        'categoria': 'bolsos',
        'precio': 55.00,
        'descripcion': 'Bolso pequeño decorado con perlas',
        'descripcion_larga': 'Clutch decorado con perlas y cadena dorada desmontable',
        'imagen_principal': 'https://images.unsplash.com/photo-1587223968140-5fbd4e81f625?w=400',
        'caracteristicas': 'Perlas, Cadena desmontable, Elegante'
    },
]
for comp in complementos_novia:
    ComplementoNovia.objects.get_or_create(
        nombre=comp['nombre'],
        defaults={**comp, 'disponible': True, 'proveedor': usuario_proveedor1}
    )
# ========== CREAR COMPLEMENTOS NOVIO ==========
print("🎩 Creando complementos de novio...")

complementos_novio = [
    {
        'nombre': 'Corbata Azul Marino Seda',
        'categoria': 'corbatas',
        'precio': 35.00,
        'descripcion': 'Corbata elegante de seda',
        'descripcion_larga': 'Corbata de seda azul marino, ideal para trajes clásicos',
        'imagen_principal': 'https://images.unsplash.com/photo-1592878904946-b3cd8b37e1e2?w=400',
        'caracteristicas': 'Seda 100%, Slim fit, Alta calidad'
    },
    {
        'nombre': 'Pajarita Negra Satinada',
        'categoria': 'pajaritas',
        'precio': 25.00,
        'descripcion': 'Pajarita clásica negra',
        'descripcion_larga': 'Pajarita satinada ideal para esmoquin o traje formal',
        'imagen_principal': 'https://images.unsplash.com/photo-1534215861858-9f5f36fb9c6c?w=400',
        'caracteristicas': 'Satén, Ajustable, Clásica'
    },
    {
        'nombre': 'Gemelos Plateados Minimalistas',
        'categoria': 'gemelos',
        'precio': 40.00,
        'descripcion': 'Gemelos en acabado plata',
        'descripcion_larga': 'Gemelos minimalistas de acero inoxidable',
        'imagen_principal': 'https://images.unsplash.com/photo-1587223968140-5fbd4e81f625?w=400',
        'caracteristicas': 'Acero inoxidable, Diseño minimalista, Caja incluida'
    },
    {
        'nombre': 'Gemelos Personalizados Iniciales',
        'categoria': 'gemelos',
        'precio': 60.00,
        'descripcion': 'Gemelos personalizados con iniciales',
        'descripcion_larga': 'Gemelos grabados a láser con iniciales del novio',
        'imagen_principal': 'https://images.unsplash.com/photo-1601582586427-828a126dfe66?w=400',
        'caracteristicas': 'Personalizables, Acero pulido, Elegantes'
    },
    {
        'nombre': 'Reloj Clásico de Acero',
        'categoria': 'relojes',
        'precio': 150.00,
        'descripcion': 'Reloj masculino elegante',
        'descripcion_larga': 'Reloj analógico de acero inoxidable con diseño clásico',
        'imagen_principal': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        'caracteristicas': 'Acero, Correa ajustable, Resistente al agua'
    },
    {
        'nombre': 'Cinturón de Piel Negro',
        'categoria': 'cinturones',
        'precio': 45.00,
        'descripcion': 'Cinturón elegante de piel',
        'descripcion_larga': 'Cinturón de piel negra con hebilla metálica',
        'imagen_principal': 'https://images.unsplash.com/photo-1587223968140-5fbd4e81f625?w=400',
        'caracteristicas': 'Piel auténtica, Hebilla acero, Ajustable'
    },
    {
        'nombre': 'Tirantes Blancos de Ceremonia',
        'categoria': 'tirantes',
        'precio': 30.00,
        'descripcion': 'Tirantes blancos para traje',
        'descripcion_larga': 'Tirantes regulables con detalles metálicos',
        'imagen_principal': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        'caracteristicas': 'Ajustables, Elásticos, Resistentes'
    },
    {
        'nombre': 'Pañuelo de Bolsillo Perlado',
        'categoria': 'panuelos',
        'precio': 20.00,
        'descripcion': 'Pañuelo elegante para la solapa',
        'descripcion_larga': 'Pañuelo blanco con detalles perlados',
        'imagen_principal': 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400',
        'caracteristicas': 'Algodón suave, Diseño elegante'
    },
    {
        'nombre': 'Botoniera de Flor Blanca',
        'categoria': 'flores',
        'precio': 18.00,
        'descripcion': 'Flor para la solapa del traje',
        'descripcion_larga': 'Botoniera clásica hecha a mano con flores naturales',
        'imagen_principal': 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400',
        'caracteristicas': 'Hecho a mano, Flor natural, Alambre oculto'
    },
    {
        'nombre': 'Chaleco Gris Elegante',
        'categoria': 'chalecos',
        'precio': 75.00,
        'descripcion': 'Chaleco para traje de novio',
        'descripcion_larga': 'Chaleco gris claro ideal para combinar con trajes oscuros o chaqué',
        'imagen_principal': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400',
        'caracteristicas': 'Corte slim, Botones metálicos, Elegante'
    },
]

for comp in complementos_novio:
    ComplementoNovio.objects.get_or_create(
        nombre=comp['nombre'],
        defaults={**comp, 'disponible': True, 'proveedor': usuario_proveedor1}
    )
print("✅ Proveedores, servicios, vestidos, trajes y complementos creados con éxito.")    