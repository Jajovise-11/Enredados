from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Proveedor, CategoriaServicio, Servicio, Reserva, Valoracion,
    VestidoNovia, TrajeNovio, ComplementoNovia, ComplementoNovio,
    TareaAgenda, ItemPresupuesto, PerfilProveedor
)


class PerfilProveedorSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    
    class Meta:
        model = PerfilProveedor
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    es_proveedor = serializers.SerializerMethodField()
    perfil_proveedor = PerfilProveedorSerializer(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'es_proveedor', 'perfil_proveedor']
    
    def get_es_proveedor(self, obj):
        return hasattr(obj, 'perfil_proveedor')


class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = '__all__'


class CategoriaServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaServicio
        fields = '__all__'


class ServicioSerializer(serializers.ModelSerializer):
    proveedor_nombre = serializers.CharField(source='proveedor.nombre', read_only=True)
    categoria_nombre = serializers.CharField(source='categoria.nombre', read_only=True)
    creado_por_nombre = serializers.CharField(source='creado_por.username', read_only=True)
    
    class Meta:
        model = Servicio
        fields = '__all__'


class ReservaSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.CharField(source='usuario.username', read_only=True)
    servicio_nombre = serializers.CharField(source='servicio.nombre', read_only=True)
    vestido_nombre = serializers.CharField(source='vestido.nombre', read_only=True)
    traje_nombre = serializers.CharField(source='traje.nombre', read_only=True)
    complemento_novia_nombre = serializers.CharField(source='complemento_novia.nombre', read_only=True)
    complemento_novio_nombre = serializers.CharField(source='complemento_novio.nombre', read_only=True)
    
    class Meta:
        model = Reserva
        fields = [
            'id', 'usuario', 'servicio', 'vestido', 'traje',
            'complemento_novia', 'complemento_novio',
            'fecha_evento', 'fecha_reserva', 'estado', 'comentarios',
            'usuario_nombre', 'servicio_nombre', 'vestido_nombre',
            'traje_nombre', 'complemento_novia_nombre', 'complemento_novio_nombre'
        ]
        read_only_fields = ['fecha_reserva']
    
    def validate(self, data):
        if not any([
            data.get('servicio'),
            data.get('vestido'),
            data.get('traje'),
            data.get('complemento_novia'),
            data.get('complemento_novio')
        ]):
            raise serializers.ValidationError(
                "Debes reservar al menos un producto"
            )
        return data


class ValoracionSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.CharField(source='usuario.username', read_only=True)
    servicio_nombre = serializers.CharField(source='servicio.nombre', read_only=True)
    
    class Meta:
        model = Valoracion
        fields = '__all__'


class VestidoNoviaSerializer(serializers.ModelSerializer):
    tallas = serializers.SerializerMethodField()
    imagenes = serializers.SerializerMethodField()
    proveedor_nombre = serializers.CharField(source='proveedor.username', read_only=True)
    
    class Meta:
        model = VestidoNovia
        fields = '__all__'
    
    def get_tallas(self, obj):
        if obj.tallas_disponibles:
            return obj.tallas_disponibles.split(',')
        return []
    
    def get_imagenes(self, obj):
        imagenes = [obj.imagen_principal]
        if obj.imagenes_adicionales:
            imagenes.extend(obj.imagenes_adicionales.split(','))
        return imagenes


class TrajeNovioSerializer(serializers.ModelSerializer):
    tallas = serializers.SerializerMethodField()
    imagenes = serializers.SerializerMethodField()
    proveedor_nombre = serializers.CharField(source='proveedor.username', read_only=True)
    
    class Meta:
        model = TrajeNovio
        fields = '__all__'
    
    def get_tallas(self, obj):
        if obj.tallas_disponibles:
            return obj.tallas_disponibles.split(',')
        return []
    
    def get_imagenes(self, obj):
        imagenes = [obj.imagen_principal]
        if obj.imagenes_adicionales:
            imagenes.extend(obj.imagenes_adicionales.split(','))
        return imagenes


class ComplementoNoviaSerializer(serializers.ModelSerializer):
    imagenes = serializers.SerializerMethodField()
    proveedor_nombre = serializers.CharField(source='proveedor.username', read_only=True)
    
    class Meta:
        model = ComplementoNovia
        fields = '__all__'
    
    def get_imagenes(self, obj):
        imagenes = [obj.imagen_principal]
        if obj.imagenes_adicionales:
            imagenes.extend(obj.imagenes_adicionales.split(','))
        return imagenes


class ComplementoNovioSerializer(serializers.ModelSerializer):
    imagenes = serializers.SerializerMethodField()
    proveedor_nombre = serializers.CharField(source='proveedor.username', read_only=True)
    
    class Meta:
        model = ComplementoNovio
        fields = '__all__'
    
    def get_imagenes(self, obj):
        imagenes = [obj.imagen_principal]
        if obj.imagenes_adicionales:
            imagenes.extend(obj.imagenes_adicionales.split(','))
        return imagenes


class TareaAgendaSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.CharField(source='usuario.username', read_only=True)
    
    class Meta:
        model = TareaAgenda
        fields = '__all__'


class ItemPresupuestoSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.CharField(source='usuario.username', read_only=True)
    servicio_nombre = serializers.CharField(source='servicio.nombre', read_only=True, allow_null=True)
    vestido_nombre = serializers.CharField(source='vestido.nombre', read_only=True, allow_null=True)
    traje_nombre = serializers.CharField(source='traje.nombre', read_only=True, allow_null=True)
    complemento_novia_nombre = serializers.CharField(source='complemento_novia.nombre', read_only=True, allow_null=True)
    complemento_novio_nombre = serializers.CharField(source='complemento_novio.nombre', read_only=True, allow_null=True)
    diferencia = serializers.SerializerMethodField()
    
    class Meta:
        model = ItemPresupuesto
        fields = '__all__'
    
    def get_diferencia(self, obj):
        return float(obj.presupuestado - obj.gastado)