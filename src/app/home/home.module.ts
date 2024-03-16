import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ArticleComponent } from './components/home/article/article.component';

@NgModule({
  declarations: [HomeComponent, ArticleComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
