import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticlePageComponent } from './article-page/article-page.component';

@NgModule({
  declarations: [
    ArticlePageComponent
  ],
  imports: [CommonModule, ArticleRoutingModule],
})
export class ArticleModule {}
