import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/principal/principal.component').then(m => m.PrincipalComponent)
  },

 {
    path: 'mi-boda',
    loadComponent: () => import('./components/mi-boda/mi-boda.component').then(m => m.MiBodaComponent)
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
    path: 'novios',
    loadComponent: () => import('./components/novios/novios.component').then(m => m.NoviosComponent)
  },
];