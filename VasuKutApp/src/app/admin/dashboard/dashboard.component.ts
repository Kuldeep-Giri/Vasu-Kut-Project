
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
  activeUser:number=0;
  inactiveUser:number=0;
  constructor(private userService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((res) => {
      const activeUser = res.users.filter(u=>u.isDisable)
      this.activeUser = activeUser.length;
      const inactiveUser = res.users.filter(u=>!u.isDisable)
      this.inactiveUser = inactiveUser.length;
      console.log(this.inactiveUser,this.activeUser)
    });
  }

}
