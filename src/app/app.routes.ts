import { Routes } from '@angular/router';
import { ProfilComponent } from './profil/profil.component';
import { HeaderComponent } from './header/header.component';
import { AddComponent } from './recipes/recipes.component';
import { CheckComponent } from './check/check.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';

export const routes: Routes = [
    {
        path:"", 
        component: HeaderComponent
    },
    {
        path:"user", 
        component: ProfilComponent,
    },
    {
        path:"user/recipes", 
        component: AddComponent,
        children:[{
            path: "check",
            component : CheckComponent,
        },
        {
            path: "add",
            component : CreateRecipeComponent,
        }
    ]
    }
];
