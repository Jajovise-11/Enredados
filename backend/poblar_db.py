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

# ========== CREAR SERVICIOS ==========
print("🎵 Creando servicios...")

servicios = [
    {
        'nombre': 'DJ Profesional - Boda Completa',
        'proveedor': prov1,
        'categoria': cat_dj,
        'descripcion': 'Servicio completo de DJ para bodas con equipo profesional',
        'precio': 800.00,
        'imagen': 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400'
    },
    {
        'nombre': 'Fotógrafo Premium - Todo el Día',
        'proveedor': prov2,
        'categoria': cat_foto,
        'descripcion': 'Cobertura fotográfica completa de tu boda',
        'precio': 1200.00,
        'imagen': 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400'
    },
    {
        'nombre': 'Catering Premium (100 personas)',
        'proveedor': prov1,
        'categoria': cat_catering,
        'descripcion': 'Menú completo para 100 invitados',
        'precio': 5000.00,
        'imagen': 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400'
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
            'creado_por': usuario_proveedor1
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
        'caracteristicas': 'Tacón 8cm, Cristales Swarovski, Plantilla acolchada'
    },
]

for comp_data in complementos_novia:
    ComplementoNovia.objects.get_or_create(
        nombre=comp_data['nombre'],
        defaults={**comp_data, 'disponible': True, 'proveedor': usuario_proveedor1}
    )

# ========== CREAR COMPLEMENTOS NOVIO ==========
print("🎩 Creando complementos de novio...")

complementos_novio = [
    {
        'nombre': 'Corbata de Seda Italiana',
        'categoria': 'corbatas',
        'precio': 45.00,
        'descripcion': 'Corbata elegante de seda',
        'descripcion_larga': 'Corbata de seda italiana 100% con diseño clásico',
        'imagen_principal': 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=400',
        'caracteristicas': 'Seda 100%, Hecha en Italia, Varios colores'
    },
    {
        'nombre': 'Gemelos Plata con Cristales',
        'categoria': 'gemelos',
        'precio': 85.00,
        'descripcion': 'Gemelos elegantes de plata',
        'descripcion_larga': 'Gemelos de plata de ley con incrustaciones de cristal',
        'imagen_principal': 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400',
        'caracteristicas': 'Plata de ley, Cristales, Estuche incluido'
    },
]

for comp_data in complementos_novio:
    ComplementoNovio.objects.get_or_create(
        nombre=comp_data['nombre'],
        defaults={**comp_data, 'disponible': True, 'proveedor': usuario_proveedor1}
    )

print("\n✅ ¡Base de datos poblada exitosamente!")
print("\n📊 Resumen:")
print(f"   - Usuarios proveedores: {User.objects.filter(perfil_proveedor__isnull=False).count()}")
print(f"   - Categorías: {CategoriaServicio.objects.count()}")
print(f"   - Proveedores: {Proveedor.objects.count()}")
print(f"   - Servicios: {Servicio.objects.count()}")
print(f"   - Vestidos: {VestidoNovia.objects.count()}")
print(f"   - Trajes: {TrajeNovio.objects.count()}")
print(f"   - Complementos novia: {ComplementoNovia.objects.count()}")
print(f"   - Complementos novio: {ComplementoNovio.objects.count()}")
print("\n🎉 ¡Listo para usar!")