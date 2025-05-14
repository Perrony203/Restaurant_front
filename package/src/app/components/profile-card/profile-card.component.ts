import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { Dish } from 'src/app/models/dish.model';
import { AlertService } from 'src/app/services/Alert/alert.service';
import { DishService } from 'src/app/services/Dish/dish.service';

@Component({
  selector: 'app-profile-card',
  imports: [MaterialModule, TablerIconsModule, CommonModule],
  templateUrl: './profile-card.component.html',
})
export class AppProfileCardComponent {
  @Input() dishData: Dish;
  category:string;
  
  constructor(private router: Router, private dishService: DishService, private alertService: AlertService){}

  redirectUpdate(){
    this.router.navigate(['/dashboard/dishes/create', this.dishData.dishId])
  }
  Delete(){
    this.alertService.AlertaConfirmacion("Cuidadooo!!", "Estás seguro de Borrar el plato??").then((objAlert) =>{
          if(objAlert.isConfirmed){
            console.log(this.dishData.dishId)
            this.dishService.deleteDish(this.dishData.dishId!).subscribe({
              next:()=>{
                this.alertService.AlertaPositivo("Excelente!!","No más paladares tristes")
              }, error:()=>{
                console.log("No se pudo actualizar el plato");
              }
          })
          }
        })
  }
}
