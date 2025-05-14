import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Empleado {
  employeeId?: string;
  idType?: string;
  name?: string;
  phoneNumber?: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmpleadosApiService {
  private apiUrl = 'http://localhost:3000/restaurant/employees';

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  createEmpleado(empleado: Partial<Empleado>): Observable<Empleado> {
    return this.http.post<Empleado>(this.apiUrl, empleado);
  }

  updateEmpleado(employeeId: string, empleado: Partial<Empleado>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${employeeId}`, empleado);
  }

  deleteEmpleado(employeeId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${employeeId}`);
  }
} 