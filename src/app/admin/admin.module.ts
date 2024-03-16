import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './admin-page/user-management/users/users.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticlesComponent } from './admin-page/article-management/articles/articles.component';
import { NewArticleComponent } from './admin-page/article-management/new-article/new-article.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    UsersComponent,
    AdminPageComponent,
    ArticlesComponent,
    NewArticleComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbNavModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
  ],
})
export class AdminModule {}
