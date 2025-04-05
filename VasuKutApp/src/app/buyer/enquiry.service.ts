import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';


@Injectable({ providedIn: 'root' })
export class EnquiryService {
    
private AddEnquiryUrl = `${environment.apiBaseUrl}/enquiry/add`;
constructor(private http: HttpClient) {}

  AddEnquiry(enquiry: any): Observable<any> {
    return this.http.post<any>("https://localhost:7024/api/Enquiry/add", enquiry);
  }

}