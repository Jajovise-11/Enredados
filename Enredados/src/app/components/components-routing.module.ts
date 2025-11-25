import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { MiBodaComponent } from './mi-boda/mi-boda.component';
import { NoviasComponent } from './novias/novias.component';
import { NoviosComponent } from './novios/novios.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { InvitadosComponent } from './invitados/invitados.component';
import { MesasComponent } from './mesas/mesas.component';
import { ServiciosComponent } from './servicios/servicios';
import { ServicioDetalleComponent } from './servicio-detalle/servicio-detalle';
import { LoginComponent } from './auth/login/login';
import { RegistroComponent } from './auth/registro/registro';
import { PerfilComponent } from './perfil/perfil';



const routes: Routes = [

    { path: '', component: PrincipalComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'servicios', component: ServiciosComponent },
    { path: 'servicio/:id', component: ServicioDetalleComponent },
    { path: 'servicios', component: ServiciosComponent },
    { path: 'servicio/:id', component: ServicioDetalleComponent }, 
    { path: 'mi-boda', component: MiBodaComponent },
    { path: 'invitados', component: InvitadosComponent },
    { path: 'mesas', component: MesasComponent },
    { path: 'proveedor', component: ProveedoresComponent },
    { path: 'novias', component: NoviasComponent },
    { path: 'novios', component: NoviosComponent },
    { path: 'proveedores', component: ProveedoresComponent },
    ];
    
    
    @NgModule({
    
    imports: [RouterModule.forChild(routes)],
    
    exports: [RouterModule]
    
    })
    
    export class ComponentsRoutingModule { }