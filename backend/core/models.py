from django.db import models
from django.contrib.auth.models import User

class Proveedor(models.Model):
    """Proveedores de servicios para bodas"""
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    telefono = models.CharField(max_length=20)
    email = models.EmailField()
    direccion = models.CharField(max_length=200)
    ciudad = models.CharField(max_length=100)
    fecha_registro = models.DateTimeField(auto_now_add=True)
    
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
    
    def __str__(self):
        return f"{self.nombre} - {self.proveedor.nombre}"


class Reserva(models.Model):
    """Reservas de servicios por usuarios"""
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('confirmada', 'Confirmada'),
        ('cancelada', 'Cancelada'),
        ('completada', 'Completada'),
    ]
    
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reservas')
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE, related_name='reservas')
    fecha_evento = models.DateField()
    fecha_reserva = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')
    comentarios = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.usuario.username} - {self.servicio.nombre} ({self.estado})"


class Valoracion(models.Model):
    """Valoraciones y comentarios sobre servicios"""
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='valoraciones')
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE, related_name='valoraciones')
    puntuacion = models.IntegerField(choices=[(i, i) for i in range(1, 6)])  # 1 a 5 estrellas
    comentario = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Valoraciones"
    
    def __str__(self):
        return f"{self.usuario.username} - {self.servicio.nombre} ({self.puntuacion}★)"