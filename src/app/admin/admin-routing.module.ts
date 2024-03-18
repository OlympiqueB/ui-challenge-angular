import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UsersComponent } from './admin-page/user-management/users/users.component';
import { ArticlesComponent } from './admin-page/article-management/articles/articles.component';
import { NewArticleComponent } from './admin-page/article-management/new-article/new-article.component';
import { authGuard } from '../core/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    data: { requiresLogin: true },
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'articles',
        component: ArticlesComponent,
      },
      {
        path: 'create-new-article',
        component: NewArticleComponent,
      },
    ],
  },
  {
    path: 'edit-article/:slug',
    component: NewArticleComponent,
    data: { loginRequired: true },
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
