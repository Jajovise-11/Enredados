import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar';

@Component({
  selector: 'app-novios',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './novios.component.html',
  styleUrl: './novios.component.css'
})
export class NoviosComponent {

}