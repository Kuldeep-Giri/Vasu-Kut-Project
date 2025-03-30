import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environments";
import { Observable } from "rxjs";

export interface User {
    id: string;
    role: string;
    userName: string;
    email: string;
    phoneNumber: string;
    isDisable: boolean;
    // activeUserTotalcount: number;
    // inactiveUserTotalcount: number;
  }


  @Injectable({ providedIn: 'root' })
export class AdminService {
  private GetUsers = `${environment.apiBaseUrl}/usermanagement/getUsers`;
  private ActiveInactiveUser = `${environment.apiBaseUrl}/usermanagement/togle`;
  private GetUserById = `${environment.apiBaseUrl}/usermanagement/user`;
  private GetAllBannerUrl = `${environment.apiBaseUrl}/banner/GetallBanners`;
  private DeleteBannerUrl = `${environment.apiBaseUrl}/banner/deletebanner`;
  private UploadBannerUrl = `${environment.apiBaseUrl}/banner/upload`;
  constructor(private http: HttpClient) {}

//   getUsers(pageNumber: number = 1, pageSize: number = 10) {
//     return this.http.get<{ users: User[], totalCount: number }>(
//       `${this.GetUsers}?pageNumber=${pageNumber}&pageSize=${pageSize}`
//     );
//   }
getUsers(pageNumber: number = 1, pageSize: number = 10, search: string = '', role: string = '', status: string = '') {
    return this.http.get<{ users: User[], totalCount: number,activeUserCount:number,inactiveUserCount:number }>(
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
  uploadBanner(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(this.UploadBannerUrl, formData);
  }
  getAllBanners(): Observable<any> {
    return this.http.get(this.GetAllBannerUrl);
  }

  // ✅ Delete Banner
  deleteBanner(bannerId: number): Observable<any> {
    return this.http.delete(`${this.DeleteBannerUrl}/${bannerId}`);
  }

}