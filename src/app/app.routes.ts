import { Routes } from '@angular/router';
import { ProfilComponent } from './profil/profil.component';
import { HeaderComponent } from './header/header.component';
import { AddComponent } from './recipes/recipes.component';
import { CheckComponent } from './check/check.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ArticleComponent } from './admin/article/article.component';
import { ArticlesComponent } from './admin/articles/articles.component';
import { ArticleContentComponent } from './admin/article-content/article-content.component';
import { BlogComponent } from './blog/blog.component';

export const routes: Routes = [
    {
        path:"", 
        component: HomeComponent
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
    },
    {
        path :"home",
        component : HomeComponent,

    },
    {
        path:"admin",
        component : AdminComponent,
    },
    {
        path:"admin/article",
        component: ArticleComponent,
    },
    {
        path:"admin/articles",
        component: ArticlesComponent,
    },
    {
        path:"blog",
        component:BlogComponent
    },
    { path: 'article/:id', component: ArticleContentComponent }
];
