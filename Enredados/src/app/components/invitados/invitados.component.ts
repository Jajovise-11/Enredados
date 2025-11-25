import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar';

@Component({
  selector: 'app-invitados',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './invitados.component.html',
  styleUrl: './invitados.component.css'
})
export class InvitadosComponent {

}