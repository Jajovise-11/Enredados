import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar';
@Component({
  selector: 'app-novias',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './novias.component.html',
  styleUrl: './novias.component.css'
})
export class NoviasComponent {

}