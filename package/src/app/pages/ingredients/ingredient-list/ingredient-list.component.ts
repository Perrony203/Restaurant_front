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
  Delete(ingredientId: string){
    this.alertService.AlertaConfirmacion("Cuidadooo!!", "Estás seguro de dejar vacía la despensa??").then((objAlert) =>{
        if(objAlert.isConfirmed){
          this.ingredientService.deleteIngredient(ingredientId).subscribe(
          {
            next: () =>{          
              this.alertService.AlertaInfo("No hay problema", "Luego tendremos más").then((objAlert) =>{
                if(objAlert.isConfirmed){   
                  window.location.reload();
                }
              })   
            },
            error: (err)=>{
              this.alertService.AlertaNegativo("Oops!!!", "El ingrediente se resiste a irse")
            }
          })        
        }
      })



    
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
