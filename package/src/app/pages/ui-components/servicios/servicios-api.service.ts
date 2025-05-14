import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Servicio {
  serviceId?: string;
  bill?: number;
  clientId?: string;
  datetimeOpen?: string;
  datetimeClose?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiciosApiService {
  private apiUrl = 'http://localhost:3000/restaurant/services'; // Cambia la URL según tu backend

  constructor(private http: HttpClient) {}

  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.apiUrl);
  }

  createServicio(servicio: Partial<Servicio>): Observable<Servicio> {
    return this.http.post<Servicio>(this.apiUrl, servicio);
  }

  updateServicioBill(serviceId: string, bill: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/bill/${serviceId}`, { bill });
  }

  updateServicioCloseDate(serviceId: string, datetimeClose: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/close/${serviceId}`, { datetimeClose });
  }

  deleteServicio(serviceId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${serviceId}`);
  }
} 