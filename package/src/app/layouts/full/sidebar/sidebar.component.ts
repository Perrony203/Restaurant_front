import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { AlertService } from 'src/app/services/Alert/alert.service';

@Component({
  selector: 'app-sidebar',
  imports: [TablerIconsModule, MaterialModule, RouterModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {  
  @Input() showToggle = true;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  constructor(private router: Router, private alertService: AlertService){}
  
  ngOnInit(): void {}
  
  logOut(){
    this.alertService.AlertaCorfirmacion("Cuidadooo!!", "Estás seguro de cerrar sesión?").then((objAlert) =>{
      if(objAlert.isConfirmed){
        localStorage.removeItem('AuthToken');
        this.router.navigate(['/authentication/login'])
      }
    })
  }
}
