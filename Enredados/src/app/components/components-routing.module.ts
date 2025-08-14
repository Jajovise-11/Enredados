import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { MiBodaComponent } from './mi-boda/mi-boda.component';
import { LugaresParaBodaComponent } from './lugares-para-boda/lugares-para-boda.component';
import { NoviasComponent } from './novias/novias.component';
import { NoviosComponent } from './novios/novios.component';
import { VestidosComponent } from './vestidos/vestidos.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { IdeasBodaComponent } from './ideas-boda/ideas-boda.component';
import { ComunidadComponent } from './comunidad/comunidad.component';
import { MiAgendaComponent } from './mi-agenda/mi-agenda.component';
import { InvitadosComponent } from './invitados/invitados.component';
import { MesasComponent } from './mesas/mesas.component';
import { PresupuestadorComponent } from './presupuestador/presupuestador.component';



const routes: Routes = [

    { path: '', component: PrincipalComponent },
    { path: 'mi-boda', component: MiBodaComponent },
    { path: 'mi-agenda', component: MiAgendaComponent },
    { path: 'invitados', component: InvitadosComponent },
    { path: 'mesas', component: MesasComponent },
    { path: 'presupuesto', component: PresupuestadorComponent },
    { path: 'vestidos', component: VestidosComponent },
    { path: 'proveedor', component: ProveedoresComponent },
    { path: 'lugares-para-boda', component: LugaresParaBodaComponent },
    { path: 'novias', component: NoviasComponent },
    { path: 'novios', component: NoviosComponent },
    { path: 'vestidos', component: VestidosComponent },
    { path: 'proveedores', component: ProveedoresComponent },
    { path: 'ideas-boda', component: IdeasBodaComponent },
    { path: 'comunidad', component: ComunidadComponent },
    ];
    
    
    @NgModule({
    
    imports: [RouterModule.forChild(routes)],
    
    exports: [RouterModule]
    
    })
    
    export class ComponentsRoutingModule { }