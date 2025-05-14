import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppProfileCardComponent } from 'src/app/components/profile-card/profile-card.component';


@Component({
  selector: 'app-starter',
  imports: [
    MaterialModule,
    AppProfileCardComponent
  ],
  templateUrl: './starter.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent { }