import {Routes} from '@angular/router';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';
import { authGuard } from 'src/app/guards/auth.guard';



export const IngredientRoutes: Routes = [{
    path:'',
    children: [
        {
            path:'',
            component: IngredientListComponent
        },
        {
            path:'create',
            component: IngredientFormComponent
        },
        {
            path:'create/:id',
            component: IngredientFormComponent
        }
    ], canActivate: [authGuard]
}];