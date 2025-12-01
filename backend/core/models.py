from django.db import models
from django.contrib.auth.models import User

class PerfilProveedor(models.Model):
    """Perfil extendido para usuarios proveedores"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='perfil_proveedor')
    nombre_empresa = models.CharField(max_length=200)
    descripcion = models.TextField()
    telefono = models.CharField(max_length=20)
    direccion = models.CharField(max_length=200)
    ciudad = models.CharField(max_length=100)
    cif_nif = models.CharField(max_length=20, blank=True)
    logo = models.URLField(blank=True, null=True)
    verificado = models.BooleanField(default=False)
    fecha_registro = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Perfiles de Proveedores"
    
    def __str__(self):
        return f"{self.nombre_empresa} - {self.user.username}"

class Proveedor(models.Model):
    """Proveedores de servicios para bodas"""
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    telefono = models.CharField(max_length=20)
    email = models.EmailField()
    direccion = models.CharField(max_length=200)
    ciudad = models.CharField(max_length=100)
    fecha_registro = models.DateTimeField(auto_now_add=True)
    
    # Nuevo campo para relacionar con usuario proveedor
    usuario_proveedor = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='proveedor_servicios'
    )
    
    class Meta:
        verbose_name_plural = "Proveedores"
    
    def __str__(self):
        return self.nombre


class CategoriaServicio(models.Model):
    """Categorías de servicios (DJ, Fotógrafo, Salón, etc.)"""
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    
    class Meta:
        verbose_name_plural = "Categorías de Servicios"
    
    def __str__(self):
        return self.nombre


class Servicio(models.Model):
    """Servicios ofrecidos por los proveedores"""
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE, related_name='servicios')
    categoria = models.ForeignKey(CategoriaServicio, on_delete=models.SET_NULL, null=True, related_name='servicios')
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    disponible = models.BooleanField(default=True)
    imagen = models.URLField(blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    
    # Nuevo campo para relacionar con usuario proveedor
    creado_por = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='servicios_creados'
    )
    
    def __str__(self):
        return f"{self.nombre} - {self.proveedor.nombre}"


# NUEVOS MODELOS PARA PRODUCTOS CON RELACIÓN A PROVEEDOR
class VestidoNovia(models.Model):
    """Vestidos de novia"""
    ESTILO_CHOICES = [
        ('princesa', 'Princesa'),
        ('sirena', 'Sirena'),
        ('bohemio', 'Bohemio'),
        ('linea_a', 'Línea A'),
        ('minimalista', 'Minimalista'),
        ('vintage', 'Vintage'),
    ]
    
    nombre = models.CharField(max_length=200)
    marca = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField()
    descripcion_larga = models.TextField()
    estilo = models.CharField(max_length=20, choices=ESTILO_CHOICES)
    color = models.CharField(max_length=50)
    tallas_disponibles = models.CharField(max_length=200)
    imagen_principal = models.URLField()
    imagenes_adicionales = models.TextField(blank=True)
    caracteristicas = models.TextField(blank=True)
    disponible = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    
    # Nuevo campo para relacionar con usuario proveedor
    proveedor = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='vestidos_novia',
        null=True,
        blank=True
    )
    
    class Meta:
        verbose_name_plural = "Vestidos de Novia"
    
    def __str__(self):
        return f"{self.nombre} - {self.marca}"


class TrajeNovio(models.Model):
    """Trajes de novio"""
    TIPO_CHOICES = [
        ('esmoquin', 'Esmoquin'),
        ('traje', 'Traje'),
        ('chaque', 'Chaqué'),
        ('smoking', 'Smoking'),
    ]
    
    nombre = models.CharField(max_length=200)
    marca = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField()
    descripcion_larga = models.TextField()
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    color = models.CharField(max_length=50)
    tallas_disponibles = models.CharField(max_length=200)
    imagen_principal = models.URLField()
    imagenes_adicionales = models.TextField(blank=True)
    caracteristicas = models.TextField(blank=True)
    disponible = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    
    # Nuevo campo para relacionar con usuario proveedor
    proveedor = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='trajes_novio',
        null=True,
        blank=True
    )
    
    class Meta:
        verbose_name_plural = "Trajes de Novio"
    
    def __str__(self):
        return f"{self.nombre} - {self.marca}"


class ComplementoNovia(models.Model):
    """Complementos para novias"""
    CATEGORIA_CHOICES = [
        ('velos', 'Velos'),
        ('tocados', 'Tocados'),
        ('zapatos', 'Zapatos'),
        ('bolsos', 'Bolsos'),
        ('joyeria', 'Joyería'),
        ('accesorios', 'Accesorios'),
        ('lenceria', 'Lencería'),
    ]
    
    nombre = models.CharField(max_length=200)
    categoria = models.CharField(max_length=20, choices=CATEGORIA_CHOICES)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField()
    descripcion_larga = models.TextField()
    imagen_principal = models.URLField()
    imagenes_adicionales = models.TextField(blank=True)
    caracteristicas = models.TextField(blank=True)
    disponible = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    
    # Nuevo campo para relacionar con usuario proveedor
    proveedor = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='complementos_novia',
        null=True,
        blank=True
    )
    
    class Meta:
        verbose_name_plural = "Complementos de Novia"
    
    def __str__(self):
        return f"{self.nombre} ({self.categoria})"


class ComplementoNovio(models.Model):
    """Complementos para novios"""
    CATEGORIA_CHOICES = [
        ('corbatas', 'Corbatas'),
        ('pajaritas', 'Pajaritas'),
        ('gemelos', 'Gemelos'),
        ('zapatos', 'Zapatos'),
        ('relojes', 'Relojes'),
        ('panuelos', 'Pañuelos'),
        ('cinturones', 'Cinturones'),
        ('tirantes', 'Tirantes'),
        ('alfileres', 'Alfileres'),
    ]
    
    nombre = models.CharField(max_length=200)
    categoria = models.CharField(max_length=20, choices=CATEGORIA_CHOICES)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField()
    descripcion_larga = models.TextField()
    imagen_principal = models.URLField()
    imagenes_adicionales = models.TextField(blank=True)
    caracteristicas = models.TextField(blank=True)
    disponible = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    
    # Nuevo campo para relacionar con usuario proveedor
    proveedor = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='complementos_novio',
        null=True,
        blank=True
    )
    
    class Meta:
        verbose_name_plural = "Complementos de Novio"
    
    def __str__(self):
        return f"{self.nombre} ({self.categoria})"


# MODELO PARA TAREAS PERSONALIZABLES
class TareaAgenda(models.Model):
    """Tareas personalizables en la agenda"""
    PRIORIDAD_CHOICES = [
        ('alta', 'Alta'),
        ('media', 'Media'),
        ('baja', 'Baja'),
    ]
    
    CATEGORIA_CHOICES = [
        ('lugar', 'Lugar'),
        ('catering', 'Catering'),
        ('invitaciones', 'Invitaciones'),
        ('vestuario', 'Vestuario'),
        ('fotografia', 'Fotografía'),
        ('decoracion', 'Decoración'),
        ('otros', 'Otros'),
    ]
    
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tareas_agenda')
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True)
    fecha = models.DateField()
    categoria = models.CharField(max_length=20, choices=CATEGORIA_CHOICES, default='otros')
    prioridad = models.CharField(max_length=10, choices=PRIORIDAD_CHOICES, default='media')
    completada = models.BooleanField(default=False)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name_plural = "Tareas de Agenda"
        ordering = ['fecha', '-prioridad']
    
    def __str__(self):
        return f"{self.titulo} - {self.usuario.username}"


# MODELO PARA PRESUPUESTO
class ItemPresupuesto(models.Model):
    """Items del presupuesto personalizado"""
    CATEGORIA_CHOICES = [
        ('lugar', 'Lugar'),
        ('comida', 'Comida'),
        ('fotografia', 'Fotografía'),
        ('vestuario', 'Vestuario'),
        ('decoracion', 'Decoración'),
        ('entretenimiento', 'Entretenimiento'),
        ('papeleria', 'Papelería'),
        ('otros', 'Otros'),
    ]
    
    TIPO_ITEM_CHOICES = [
        ('servicio', 'Servicio'),
        ('vestido', 'Vestido de Novia'),
        ('traje', 'Traje de Novio'),
        ('complemento_novia', 'Complemento Novia'),
        ('complemento_novio', 'Complemento Novio'),
        ('personalizado', 'Personalizado'),
    ]
    
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='presupuesto')
    concepto = models.CharField(max_length=200)
    categoria = models.CharField(max_length=20, choices=CATEGORIA_CHOICES)
    tipo_item = models.CharField(max_length=20, choices=TIPO_ITEM_CHOICES, default='personalizado')
    
    servicio = models.ForeignKey(Servicio, on_delete=models.SET_NULL, null=True, blank=True)
    vestido = models.ForeignKey(VestidoNovia, on_delete=models.SET_NULL, null=True, blank=True)
    traje = models.ForeignKey(TrajeNovio, on_delete=models.SET_NULL, null=True, blank=True)
    complemento_novia = models.ForeignKey(ComplementoNovia, on_delete=models.SET_NULL, null=True, blank=True)
    complemento_novio = models.ForeignKey(ComplementoNovio, on_delete=models.SET_NULL, null=True, blank=True)
    
    presupuestado = models.DecimalField(max_digits=10, decimal_places=2)
    gastado = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    pagado = models.BooleanField(default=False)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Items de Presupuesto"
    
    def __str__(self):
        return f"{self.concepto} - {self.usuario.username}"


class Reserva(models.Model):
    """Reservas de servicios y productos por usuarios"""
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('confirmada', 'Confirmada'),
        ('cancelada', 'Cancelada'),
        ('completada', 'Completada'),
    ]
    
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reservas')
    
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE, null=True, blank=True, related_name='reservas')
    vestido = models.ForeignKey(VestidoNovia, on_delete=models.CASCADE, null=True, blank=True, related_name='reservas')
    traje = models.ForeignKey(TrajeNovio, on_delete=models.CASCADE, null=True, blank=True, related_name='reservas')
    complemento_novia = models.ForeignKey(ComplementoNovia, on_delete=models.CASCADE, null=True, blank=True, related_name='reservas')
    complemento_novio = models.ForeignKey(ComplementoNovio, on_delete=models.CASCADE, null=True, blank=True, related_name='reservas')
    
    fecha_evento = models.DateField()
    fecha_reserva = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')
    comentarios = models.TextField(blank=True)
    
    def __str__(self):
        if self.servicio:
            return f"{self.usuario.username} - Servicio: {self.servicio.nombre} ({self.estado})"
        elif self.vestido:
            return f"{self.usuario.username} - Vestido: {self.vestido.nombre} ({self.estado})"
        elif self.traje:
            return f"{self.usuario.username} - Traje: {self.traje.nombre} ({self.estado})"
        elif self.complemento_novia:
            return f"{self.usuario.username} - Complemento Novia ({self.estado})"
        elif self.complemento_novio:
            return f"{self.usuario.username} - Complemento Novio ({self.estado})"
        return f"Reserva #{self.id} ({self.estado})"
    
    def get_producto_nombre(self):
        """Devuelve el nombre del producto reservado"""
        if self.servicio:
            return self.servicio.nombre
        elif self.vestido:
            return self.vestido.nombre
        elif self.traje:
            return self.traje.nombre
        elif self.complemento_novia:
            return self.complemento_novia.nombre
        elif self.complemento_novio:
            return self.complemento_novio.nombre
        return "Sin producto"


class Valoracion(models.Model):
    """Valoraciones y comentarios sobre servicios"""
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='valoraciones')
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE, related_name='valoraciones')
    puntuacion = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comentario = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Valoraciones"
    
    def __str__(self):
        return f"{self.usuario.username} - {self.servicio.nombre} ({self.puntuacion}★)"