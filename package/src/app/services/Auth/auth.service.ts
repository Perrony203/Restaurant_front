import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api_url='http://localhost:3000/restaurant/auth/clients'
  
    constructor(private http: HttpClient) { }
  
  
    authenticate(clientId:string, password:string): Observable<any>{
      const endpoint = `${this.api_url}/login`;
      const body = {clientId, password};
      return this.http.post(endpoint, body);
    }
}
