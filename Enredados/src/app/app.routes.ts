import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/principal/principal.component').then(m => m.PrincipalComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'registro',
    loadComponent: () => import('./components/auth/registro/registro').then(m => m.RegistroComponent)
  },
  {
    path: 'servicios',
    loadComponent: () => import('./components/servicios/servicios').then(m => m.ServiciosComponent)
  },
  {
    path: 'servicio/:id',
    loadComponent: () => import('./components/servicio-detalle/servicio-detalle').then(m => m.ServicioDetalleComponent)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./components/perfil/perfil').then(m => m.PerfilComponent)
  },
  {
    path: 'mi-boda',
    loadComponent: () => import('./components/mi-boda/mi-boda.component').then(m => m.MiBodaComponent)
  },
  {
    path: 'mi-agenda',
    loadComponent: () => import('./components/mi-agenda/mi-agenda.component').then(m => m.MiAgendaComponent)
  },
  {
    path: 'presupuestador',
    loadComponent: () => import('./components/presupuestador/presupuestador.component').then(m => m.PresupuestadorComponent)
  },
  {
    path: 'invitados',
    loadComponent: () => import('./components/invitados/invitados.component').then(m => m.InvitadosComponent)
  },
  {
    path: 'mesas',
    loadComponent: () => import('./components/mesas/mesas.component').then(m => m.MesasComponent)
  },
  {
    path: 'novias',
    loadComponent: () => import('./components/novias/novias.component').then(m => m.NoviasComponent)
  },
  {
    path: 'vestidos-novia',
    loadComponent: () => import('./components/vestidos-novia/vestidos-novia.component').then(m => m.VestidosNoviaComponent)
  },
  {
    path: 'complementos-novia',
    loadComponent: () => import('./components/complementos-novia/complementos-novia.component').then(m => m.ComplementosNoviaComponent)
  },
  {
    path: 'novios',
    loadComponent: () => import('./components/novios/novios.component').then(m => m.NoviosComponent)
  },
  {
    path: 'trajes-novio',
    loadComponent: () => import('./components/trajes-novio/trajes-novio.component').then(m => m.TrajesNovioComponent)
  },
  {
    path: 'complementos-novio',
    loadComponent: () => import('./components/complementos-novio/complementos-novio.component').then(m => m.ComplementosNovioComponent)
  }
];