import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environments";

export interface User {
    id: string;
    role: string;
    userName: string;
    email: string;
    phoneNumber: string;
    isDisable: boolean;
  }


  @Injectable({ providedIn: 'root' })
export class AdminService {
  private GetUsers = `${environment.apiBaseUrl}/usermanagement/getUsers`;
  private ActiveInactiveUser = `${environment.apiBaseUrl}/usermanagement/togle`;
  private GetUserById = `${environment.apiBaseUrl}/usermanagement/user`;

  constructor(private http: HttpClient) {}

//   getUsers(pageNumber: number = 1, pageSize: number = 10) {
//     return this.http.get<{ users: User[], totalCount: number }>(
//       `${this.GetUsers}?pageNumber=${pageNumber}&pageSize=${pageSize}`
//     );
//   }
getUsers(pageNumber: number = 1, pageSize: number = 10, search: string = '', role: string = '', status: string = '') {
    return this.http.get<{ users: User[], totalCount: number }>(
      `${this.GetUsers}?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}&role=${role}&status=${status}`
    );
  }
   getUserById(id: string) {
    return this.http.get<User>(`${this.GetUserById}/${id}`);
  }

//   updateUser(id: string, user: User) {
//     return this.http.put(`${this.baseUrl}/${id}`, user);
//   }

  toggleDisable(id: string) {
    return this.http.patch(`${this.ActiveInactiveUser}/${id}`, {});
  }
}