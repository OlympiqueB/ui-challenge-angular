import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ArticleCardComponent } from './components/home/article-card/article-card.component';

@NgModule({
  declarations: [HomeComponent, ArticleCardComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
