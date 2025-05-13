import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dish } from 'src/app/models/dish.model';


@Injectable({
  providedIn: 'root'
})
export class DishService {
  private api_url='http://localhost:3000/restaurant/dishes'

  constructor(private http: HttpClient) { }

  createDish(dish: Dish): Observable<any>{
    const endpoint = this.api_url;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.post(endpoint,dish,{headers});
  }

  getDishes(): Observable<Dish[]>{
    const endpoint = this.api_url;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.get<Dish[]>(endpoint,{headers});
  }

  deleteDish(dishId?: string){
    const endpoint = `${this.api_url}/${dishId}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.delete(endpoint,{headers});
  }

  getDishById(id:string){
    const endpoint = `${this.api_url}/${id}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.get<Dish>(endpoint,{headers});
  }

  udpateDish(userId:string, userData: Dish){
    const endpoint = `${this.api_url}/${userId}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.put<Dish>(endpoint,userData,{headers});
  }
}
