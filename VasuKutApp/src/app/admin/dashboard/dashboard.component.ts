
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
  activeUserCount: number = 0;
  inactiveUserCount: number = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUserCounts();
  }

  loadUserCounts(): void {
    this.adminService.getUsers(1, 1).subscribe({
      next: (response) => {
        this.activeUserCount = response.activeUserCount;
        this.inactiveUserCount = response.inactiveUserCount;
      },
      error: (err) => {
        console.error('Error fetching user counts:', err);
      }
    });
  }

}
