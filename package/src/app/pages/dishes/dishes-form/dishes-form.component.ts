import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Dish } from 'src/app/models/dish.model';
import { User } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/Alert/alert.service';
import { DishService } from 'src/app/services/Dish/dish.service';

@Component({
  selector: 'app-dishes-form',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './dishes-form.component.html',
  styleUrl: './dishes-form.component.scss'
})
export class DishesFormComponent {

  form!: FormGroup;
  editMode: boolean | false;
  dishId: string;
  
  constructor(
    private route: ActivatedRoute,
    private router:Router, 
    private dishService: DishService, 
    private fb: FormBuilder,
    private alertService: AlertService
  ){}

  initForm():void{
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z\s]+$/)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(40)]],
      price: ['', [Validators.required, Validators.min(1000), Validators.pattern(/^\d+$/)]], 
      preparationTime: ['', [Validators.required, Validators.min(5), Validators.pattern(/^\d+$/)]],
      categoryName: ['', Validators.required]
    });
  }
  ngOnInit(): void{
    this.initForm();

    this.route.paramMap.subscribe(params=>{
      const id = params.get('id');
      if(id){
        this.dishId = id;
        this.editMode = true;
        this.getDishById(id);
      }else{
        this.editMode = false;
      }
    })
  }

  getDishById(id: string){
    this.dishService.getDishById(id).subscribe({
      next:(dish:Dish)=>{
        this.form.patchValue({
          name: dish.name,
          description: dish.description,
          price: dish.price,
          preparationTime: dish.preparationTime,
          categoryName: dish.categoryName
        })
      }, error:()=>{
        console.log("Error en el llenado automático de los datos");
      }
    })
  }
  guardarInfo(){
    if(this.form.invalid){
      this.form.markAllAsTouched()
      this.alertService.AlertaNegativo("Oops!", "Revisa los datos ingresados")
      return;
    }

    const dish: Dish = {
      name: this.form.value.name!,
      description: this.form.value.description,
      price: this.form.value.price!,
      preparationTime: this.form.value.preparationTime!,
      categoryName: this.form.value.categoryName!,
      active: true
    }

    console.log(dish.name);
    if(this.editMode && this.dishId){
      this.dishService.udpateDish(this.dishId, dish).subscribe({
        next:(dish:Dish)=>{
          this.alertService.AlertaCorfirmacion("Excelente!!", "Ahora el plato estará más delicioso").then((result) =>{
            if(result.isConfirmed)
              this.router.navigate(["/dashboard/dishes"])
          });
        }, error:()=>{
          console.log("No se pudo actualizar el plato");
        }
      })
    }else{
      this.dishService.createDish(dish).subscribe({
        next:(res)=>{
          this.alertService.AlertaPositivo("Excelente", "Nuevos sabores siempre salen de la cocina").then((result) =>{
              if(result.isConfirmed)
                this.router.navigate(["/dashboard/dishes"])
            });
        },
        error:(err)=>{
          console.log(err);
          this.alertService.AlertaNegativo("Oops!", "No fue posible crear el plato");
        }
      })
    }
  }
}
