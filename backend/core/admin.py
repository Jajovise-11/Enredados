from django.contrib import admin
from .models import (
    Proveedor, CategoriaServicio, Servicio, Reserva, Valoracion,
    VestidoNovia, TrajeNovio, ComplementoNovia, ComplementoNovio,
    TareaAgenda, ItemPresupuesto
)

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


# NUEVOS ADMINS PARA PRODUCTOS
@admin.register(VestidoNovia)
class VestidoNoviaAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'marca', 'estilo', 'precio', 'disponible', 'fecha_creacion']
    search_fields = ['nombre', 'marca']
    list_filter = ['estilo', 'disponible', 'marca']
    ordering = ['-fecha_creacion']


@admin.register(TrajeNovio)
class TrajeNovioAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'marca', 'tipo', 'precio', 'disponible', 'fecha_creacion']
    search_fields = ['nombre', 'marca']
    list_filter = ['tipo', 'disponible', 'marca']
    ordering = ['-fecha_creacion']


@admin.register(ComplementoNovia)
class ComplementoNoviaAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'categoria', 'precio', 'disponible', 'fecha_creacion']
    search_fields = ['nombre']
    list_filter = ['categoria', 'disponible']
    ordering = ['-fecha_creacion']


@admin.register(ComplementoNovio)
class ComplementoNovioAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'categoria', 'precio', 'disponible', 'fecha_creacion']
    search_fields = ['nombre']
    list_filter = ['categoria', 'disponible']
    ordering = ['-fecha_creacion']


@admin.register(TareaAgenda)
class TareaAgendaAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'usuario', 'fecha', 'categoria', 'prioridad', 'completada']
    search_fields = ['titulo', 'usuario__username']
    list_filter = ['categoria', 'prioridad', 'completada', 'fecha']
    ordering = ['fecha', '-prioridad']


@admin.register(ItemPresupuesto)
class ItemPresupuestoAdmin(admin.ModelAdmin):
    list_display = ['concepto', 'usuario', 'categoria', 'tipo_item', 'presupuestado', 'gastado', 'pagado']
    search_fields = ['concepto', 'usuario__username']
    list_filter = ['categoria', 'tipo_item', 'pagado']
    ordering = ['-fecha_creacion']