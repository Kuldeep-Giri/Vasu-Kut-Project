// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-user-managment',
//   imports: [],
//   templateUrl: './user-managment.component.html',
//   styleUrl: './user-managment.component.scss'
// })
// export class UserManagmentComponent {

// }

import { Component } from '@angular/core';
import { AdminService, User } from '../admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ngModel support

@Component({
 selector: 'app-user-managment',
standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-managment.component.html',
  styleUrl: './user-managment.component.scss'
})
export class UserManagmentComponent {
  users: User[] = [];
  pageNumber = 1;
  pageSize = 10;
  totalCount = 0;
  totalPagesArray: number[] = [];
  searchTerm: string = ''; // 🔍 For input
  Math = Math;
  selectedRole: string = '';
  selectedStatus: string = '';
  activeUser:number=0;
  inactiveUser:number=0;
  constructor(private userService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pageNumber, this.pageSize, this.searchTerm,this.selectedRole, this.selectedStatus).subscribe((res) => {
      this.users = res.users;
     
      this.totalCount = res.totalCount;
      const totalPages = Math.ceil(this.totalCount / this.pageSize);
      this.totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
    });
  }

  searchUsers() {
    this.pageNumber = 1;
    this.loadUsers();
  }

  goToPage(page: number) {
    this.pageNumber = page;
    this.loadUsers();
  }

  prevPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadUsers();
    }
  }

  nextPage() {
    if (this.pageNumber < this.totalPagesArray.length) {
      this.pageNumber++;
      this.loadUsers();
    }
  }

  toggle(id: string) {
    this.userService.toggleDisable(id).subscribe(() => this.loadUsers());
  }

  editUser(id: string) {
    console.log('Edit user:', id);
  }
}
