import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UsersComponent } from './admin-page/user-management/users/users.component';
import { ArticlesComponent } from './admin-page/article-management/articles/articles.component';
import { NewArticleComponent } from './admin-page/article-management/new-article/new-article.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
