import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar';

@Component({
  selector: 'app-mi-boda',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './mi-boda.component.html',
  styleUrl: './mi-boda.component.css'
})
export class MiBodaComponent {

}