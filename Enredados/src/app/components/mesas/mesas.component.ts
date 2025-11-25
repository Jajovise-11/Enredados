import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar';

@Component({
  selector: 'app-mesas',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './mesas.component.html',
  styleUrl: './mesas.component.css'
})
export class MesasComponent {

}