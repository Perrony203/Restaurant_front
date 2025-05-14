import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Supplier } from 'src/app/models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private api_url='http://localhost:3000/restaurant/ingredients'
  private api_suppliers_url = 'http://localhost:3000/restaurant/suppliers'

  constructor(private http: HttpClient) { }

  createIngredient(ingredient: Ingredient): Observable<any>{
    const endpoint = this.api_url;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.post(endpoint,ingredient,{headers});
  }

  getIngredients(): Observable<Ingredient[]>{
    const endpoint = this.api_url;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.get<Ingredient[]>(endpoint,{headers});
  }

  deleteIngredient(ingredientId: string){
    const endpoint = `${this.api_url}/${ingredientId}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.post(endpoint,{headers});
  }

  getIngredientById(ingredientId:string){
    const endpoint = `${this.api_url}/${ingredientId}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.get<Ingredient>(endpoint,{headers});
  }

  udpateIngredient(ingredientId:string, ingredientData: Ingredient){
    const endpoint = `${this.api_url}/${ingredientId}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.put<Ingredient>(endpoint,ingredientData,{headers});
  }

  getSupplierById(supplierId:String){
    const endpoint = `${this.api_suppliers_url}/${supplierId}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.get<Supplier>(endpoint,{headers});
  }

  getSupplierByName(supplierName:string){
  const endpoint = `${this.api_suppliers_url}/name/${supplierName}`;
  const headers = {
    'Content-Type':"application/json",
    'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
  }
  return this.http.get<Supplier>(endpoint,{headers});
  }

  getAllSuppliers(){
    const endpoint = `${this.api_suppliers_url}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.get<Supplier[]>(endpoint,{headers});
  }

}