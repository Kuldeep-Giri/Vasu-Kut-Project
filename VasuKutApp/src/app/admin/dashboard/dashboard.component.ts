
import { Component } from '@angular/core';
import { AdminService, User } from '../admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ngModel support

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
}
