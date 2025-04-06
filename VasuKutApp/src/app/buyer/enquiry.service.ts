import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';


@Injectable({ providedIn: 'root' })
export class EnquiryService {
    
private AddEnquiryUrl = `${environment.apiBaseUrl}/Enquiry/add`;
private getEnquiryUrl = `${environment.apiBaseUrl}/enquiry/getEnquiry`;
private DeleteEnquiryUrl = `${environment.apiBaseUrl}/enquiry/delete`;
private MarkasContactEnquiryUrl = `${environment.apiBaseUrl}/enquiry/ContactEnquiry`;

constructor(private http: HttpClient) {}

  AddEnquiry(enquiry: any): Observable<any> {
    return this.http.post<any>(this.AddEnquiryUrl, enquiry);
  }
  getEnquiries(page: number = 1, size: number = 10, isContacted?: boolean): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', size.toString());
  
    if (isContacted !== null && isContacted !== undefined) {
      params = params.set('isContacted', isContacted.toString());
    }
  
    return this.http.get<any>(this.getEnquiryUrl, { params });
  }
  markAsContacted(id: number): Observable<any> {
    return this.http.post(`${this.MarkasContactEnquiryUrl}/${id}`, {});
  }
  removeEnquiry(id: number): Observable<any> {
    return this.http.delete<any>(`${this.DeleteEnquiryUrl}/${id}`);
  }
}