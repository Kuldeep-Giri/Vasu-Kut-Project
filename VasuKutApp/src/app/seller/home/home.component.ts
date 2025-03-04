import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-home',
  imports: [ CommonModule,SidebarComponent,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
 
 
}
