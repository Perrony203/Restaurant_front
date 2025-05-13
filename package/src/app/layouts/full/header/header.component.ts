import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { BrandingComponent } from '../sidebar/branding.component';
import { AlertService } from 'src/app/services/Alert/alert.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
    BrandingComponent
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();

  constructor(private router: Router, private alertService: AlertService){}

  logOut(){
    this.alertService.AlertaCorfirmacion("Cuidadooo!!", "Estás seguro de cerrar sesión?").then((objAlert) =>{
      if(objAlert.isConfirmed){
        localStorage.removeItem('AuthToken');
        localStorage.removeItem('UserName');
        this.router.navigate(['/authentication/login'])
      }
    })
  }
}