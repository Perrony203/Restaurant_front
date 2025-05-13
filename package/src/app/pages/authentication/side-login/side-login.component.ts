import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { AlertService } from 'src/app/services/Alert/alert.service';

@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {

  constructor( private router: Router, private authService: AuthService, private alertService: AlertService) {}

  form = new FormGroup({
    clientId: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{6,15}$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/)
    ]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    const { clientId, password } = this.form.value;
    this.authService.authenticate(clientId || '', password || '').subscribe({
      next:(res)=>{
        localStorage.setItem("AuthToken", res.token);
        this.router.navigate(['/']);
      }, 
      error:(err)=>{
        if(err.status == "400"){
          this.alertService.AlertaNegativo("Ooops!", "Verifica tus credenciales");
        }else{        
          this.alertService.AlertaNegativo("Ooops!", "No fue posible iniciar sesión");
        }
      }

    })
  }
}
