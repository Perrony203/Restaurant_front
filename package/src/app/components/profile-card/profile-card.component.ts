import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { Dish } from 'src/app/models/dish.model';

@Component({
  selector: 'app-profile-card',
  imports: [MaterialModule, TablerIconsModule, CommonModule],
  templateUrl: './profile-card.component.html',
})
export class AppProfileCardComponent {
  @Input() dishData: Dish;
}
