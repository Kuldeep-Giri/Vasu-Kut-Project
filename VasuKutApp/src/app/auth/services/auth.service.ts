import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://vasukutapp-frhybqeecpbsdve8.canadacentral-01.azurewebsites.net/api/auth';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }


  login(credentials: any) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('LoggedInUserId',this.getLoggedInUserId(response.token));
          
      })
    );
  }

  getLoggedInUserId(token: string): string {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.nameid;
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  
  getUserRole(token: string): string {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  }
  getUserName(token: string): string {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.unique_name;
  }
  logout(): void {
  localStorage.clear();
  }
}
