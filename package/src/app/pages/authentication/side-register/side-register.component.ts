import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/User/user.service';
import { AlertService } from 'src/app/services/Alert/alert.service';

@Component({
  selector: 'app-side-register',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './side-register.component.html',
  standalone: true,
})
export class AppSideRegisterComponent {
  options = this.settings.getOptions();

  tiposId: string[] = ['CC', 'CE', 'Pas', 'NIT', 'TI'];
  tipoSeleccionado: string = '';

  constructor(private settings: CoreService, private router: Router, private userService: UserService, private alertService: AlertService) {}

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z\s]+$/),
    ]),

    clientId: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{6,15}$/),
    ]),

    idType: new FormControl('', [
      Validators.required,
    ]),

    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^3\d{9}$/),
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

  addUser() {
    if(this.form.invalid) return;

    const user: User = {
      name: this.form.value.name!,
      clientId: this.form.value.clientId!,
      idType: this.form.value.idType!,
      password: this.form.value.password!,
      phoneNumber: this.form.value.phoneNumber!
    }

    this.userService.addUser(user).subscribe({
      next:(res)=>{
        console.log(res);
        console.log(res.id)
        this.alertService.AlertaPositivo("Excelente", "El usuario ha sido modificado correctamente").then((result) =>{
            if(result.isConfirmed)
              this.router.navigate(["/authentication/login"])
          });
      },
      error:(err)=>{
        console.log(err);
        this.alertService.AlertaNegativo("Ooops!", "No fue posible registrarte");
      }
    })
  }
}
