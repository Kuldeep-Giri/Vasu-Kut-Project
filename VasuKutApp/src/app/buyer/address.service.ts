import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
export interface Address {
    id?: number;
    userId: string;
    name: string;
    mobile: string;
    streetAddress: string;
    streetAddress2?: string;
    country: string;
    state: string;
    district: string;
    zipCode: string;
  }
@Injectable({
  providedIn: 'root'
})


export class AddressService {
  constructor(private http: HttpClient) {}
   private GetAddressApiURl = `${environment.apiBaseUrl}/address`

   createAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.GetAddressApiURl}`, address);
  }
  getCountries(): Observable<any> {
    return this.http.get<any>('https://restcountries.com/v3.1/all');
  }

  getAllAddressesByUserId(userId: string): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.GetAddressApiURl}/getAll/${userId}`);
  }

  getStates(country: string): Observable<any> {
    return this.http.post<any>('https://countriesnow.space/api/v0.1/countries/states', { country });
  }

  getCities(country: string, state: string): Observable<any> {
    return this.http.post<any>('https://countriesnow.space/api/v0.1/countries/state/cities', { country, state });
  }

}
