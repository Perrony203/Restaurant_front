import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Ingredient } from 'src/app/models/ingredient.model';
import { AlertService } from 'src/app/services/Alert/alert.service';
import { IngredientService } from 'src/app/services/Ingredient/ingredient.service';

@Component({
  selector: 'app-ingredient-list',
  imports: [MaterialModule, CommonModule, RouterLink],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.scss'
})
export class IngredientListComponent {

  ingredientList: Ingredient[] = [];

  constructor(private ingredientService: IngredientService, private router: Router, private alertService: AlertService){

  }

  ngOnInit(){
    this.getIngredients();    
  }

  getIngredients(){
    this.ingredientService.getIngredients().subscribe(
      {
        next: (res) =>{
          this.ingredientList = res;
          if (this.ingredientList.length == 0){
            this.alertService.AlertaInfo("Es una lástima", "la nevera quedó vacía")
          }
        },
        error: (err)=>{
          this.alertService.AlertaNegativo("Oops!!!", "Algo inesperado sucedió en la despensa")
        }
      }
    )
  }


}
