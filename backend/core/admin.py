from django.contrib import admin
from .models import Proveedor, CategoriaServicio, Servicio, Reserva, Valoracion

@admin.register(Proveedor)
class ProveedorAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'ciudad', 'telefono', 'email', 'fecha_registro']
    search_fields = ['nombre', 'ciudad']
    list_filter = ['ciudad', 'fecha_registro']


@admin.register(CategoriaServicio)
class CategoriaServicioAdmin(admin.ModelAdmin):
    list_display = ['nombre']
    search_fields = ['nombre']


@admin.register(Servicio)
class ServicioAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'proveedor', 'categoria', 'precio', 'disponible']
    search_fields = ['nombre', 'proveedor__nombre']
    list_filter = ['categoria', 'disponible', 'proveedor']


@admin.register(Reserva)
class ReservaAdmin(admin.ModelAdmin):
    list_display = ['usuario', 'servicio', 'fecha_evento', 'estado', 'fecha_reserva']
    search_fields = ['usuario__username', 'servicio__nombre']
    list_filter = ['estado', 'fecha_evento']


@admin.register(Valoracion)
class ValoracionAdmin(admin.ModelAdmin):
    list_display = ['usuario', 'servicio', 'puntuacion', 'fecha']
    search_fields = ['usuario__username', 'servicio__nombre']
    list_filter = ['puntuacion', 'fecha']