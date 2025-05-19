import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Dish } from 'src/app/models/dish.model';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Supplier } from 'src/app/models/supplier.model';
import { AlertService } from 'src/app/services/Alert/alert.service';
import { IngredientService } from 'src/app/services/Ingredient/ingredient.service';

@Component({
  selector: 'app-dishes-form',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './ingredient-form.component.html',
  styleUrl: './ingredient-form.component.scss'
})
export class IngredientFormComponent {

  form!: FormGroup;
  editMode: boolean | false;
  ingredientId: string;
  suppliers: Supplier[];
  supplier: Supplier;
  ingredient: Ingredient;
  
  constructor(
    private route: ActivatedRoute,
    private router:Router, 
    private ingredientService: IngredientService, 
    private fb: FormBuilder,
    private alertService: AlertService    
  ){}  

  initForm():void{
    this.form = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(50),Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      stock: ['',[Validators.required,Validators.min(1),Validators.max(10000),Validators.pattern(/^\d+$/)]],
      price: ['',[Validators.required,Validators.min(100),Validators.max(100000),Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      stockUnits: ['',[ Validators.required]],
      supplier: ['',[Validators.required]]});
  }
  ngOnInit(): void{
    this.initForm();    
    this.getSuppliers();

    this.route.paramMap.subscribe(params=>{
      const id = params.get('id');
      if(id){
        this.ingredientId = id;
        this.editMode = true;
        this.getIngredientById(id);
      }else{
        this.editMode = false;
      }
    })
  }

  getSuppliers(){
    this.ingredientService.getAllSuppliers().subscribe({
      next:(suppliers:Supplier[])=>{
        this.suppliers = suppliers;
      }, error:()=>{
        console.log("Error en el llamdo de los proveedores");
      } 
    })
  }

  getIngredientById(id: string){
    this.ingredientService.getIngredientById(id).subscribe({
      next:(ingredient:Ingredient)=>{
        this.ingredientService.getSupplierById(ingredient.supplierId).subscribe({
          next:(supplier:Supplier)=>{
            console.log(supplier.name);
            this.form.patchValue({
              name: ingredient.name,
              stock: ingredient.stock,
              price: ingredient.price,
              stockUnits: ingredient.stockUnits,  
              supplier: supplier.name        
            })
          }, error:()=>{
          }
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
    
    this.ingredient = {
      name: this.form.value.name!,
      stock: this.form.value.stock!,
      price: this.form.value.price!,
      stockUnits: this.form.value.stockUnits!,
      supplierId: this.form.value.supplier.supplierId!
    }
    console.log(this.ingredient);
    if(this.editMode && this.ingredientId){
      this.ingredientService.udpateIngredient(this.ingredientId, this.ingredient).subscribe({
        next:(ingredient: Ingredient)=>{
          this.alertService.AlertaConfirmacion("Excelente!!", "Ahora el plato estará más delicioso").then((result) =>{
            if(result.isConfirmed)
              this.router.navigate(["/dashboard/ingredients"])
          });
        }, error:()=>{
          console.log("No se pudo actualizar el ingrediente");
        }
      })
    }else{
      this.ingredientService.createIngredient(this.ingredient).subscribe({
        next:(res)=>{
          this.alertService.AlertaPositivo("Excelente", "Más fresco, mucho mejor").then((result) =>{
              if(result.isConfirmed)
                this.router.navigate(["/dashboard/ingredients"])
            });
        },
        error:(err)=>{
          console.log(err);
          this.alertService.AlertaNegativo("Oops!", "No fue posible ingresar el ingrediente");
        }
      })
    }
      
  }
}
