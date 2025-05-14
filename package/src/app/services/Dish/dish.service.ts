import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dish } from 'src/app/models/dish.model';
import { Category } from 'src/app/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private api_url='http://localhost:3000/restaurant/dishes'
  private api_category_url = 'http://localhost:3000/restaurant/categories'

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

  deleteDish(dishId: string){
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

  udpateDish(dishId:string, dishData: Dish){
    const endpoint = `${this.api_url}/${dishId}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.put<Dish>(endpoint,dishData,{headers});
  }

  getCategory(categoryId:string){
    const endpoint = `${this.api_category_url}/${categoryId}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.get<Category>(endpoint,{headers});
  }
}
