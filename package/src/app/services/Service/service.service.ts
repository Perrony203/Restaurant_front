import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private api_url = 'http://localhost:3000/restaurant/services';

  constructor(private http: HttpClient) { }

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    };
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.api_url, { headers: this.getHeaders() });
  }

  createService(service: any): Observable<any> {
    return this.http.post(this.api_url, service, { headers: this.getHeaders() });
  }

  updateServiceCloseDate(id: string, closeDate: Date): Observable<any> {
    return this.http.put(`${this.api_url}/close/${id}`, { closeDate }, { headers: this.getHeaders() });
  }

  updateServiceBill(id: string, bill: number): Observable<any> {
    return this.http.put(`${this.api_url}/bill`, { id, bill }, { headers: this.getHeaders() });
  }

  deleteService(id: string): Observable<any> {
    return this.http.delete(`${this.api_url}/${id}`, {
      headers: this.getHeaders()
    });
  }

  getServiceById(id: string): Observable<Service> {
    return this.http.get<Service>(`${this.api_url}/${id}`, { headers: this.getHeaders() });
  }

  updateService(id: string, data: Partial<Service>): Observable<any> {
    return this.http.put(`${this.api_url}/${id}`, data, { headers: this.getHeaders() });
  }
} 