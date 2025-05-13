import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppProfileCardComponent } from 'src/app/components/profile-card/profile-card.component';
import { MaterialModule } from 'src/app/material.module';
import { Dish } from 'src/app/models/dish.model';
import { AlertService } from 'src/app/services/Alert/alert.service';
import { DishService } from 'src/app/services/Dish/dish.service';

@Component({
  selector: 'app-dishes-list',
  imports: [CommonModule, AppProfileCardComponent, MaterialModule, RouterLink],
  templateUrl: './dishes-list.component.html',
  styleUrl: './dishes-list.component.scss'
})
export class DishesListComponent {

  dishList: Dish[] = [];

  constructor(private dishService: DishService, private router: Router, private alertService: AlertService){

  }

  ngOnInit(){
    this.getDishes();    
  }

    getDishes(){
      this.dishService.getDishes().subscribe(
        {
          next: (res) =>{
            this.dishList = res;
            if (this.dishList.length == 0){
              this.alertService.AlertaInfo("Lo sentimos", "No hay nadie en la cocina")
            }
          },
          error: (err)=>{
            this.alertService.AlertaNegativo("Oops!!!", "Algo inesperado sucedió en la cocina")
          }
        }
      )
    }


}
