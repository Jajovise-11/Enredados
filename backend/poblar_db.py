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
        'nombre': 'Zapatos Brillantes con Pedrería',
        'categoria': 'zapatos',
        'precio': 120.00,
        'descripcion': 'Zapatos de tacón con cristales',
        'descripcion_larga': 'Zapatos elegantes decorados con cristales Swarovski',
        'imagen_principal': 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400',
        'caracter