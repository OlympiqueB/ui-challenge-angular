import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticleService } from 'src/app/core/services/article/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  articles!: any[];

  articlesSubscription!: Subscription;

  constructor(private articleService: ArticleService) {
    this.articlesSubscription = this.articleService.getAllArticles().subscribe({
      next: (reply) => {
        this.articles = reply.articles;
      },
    });
  }

  ngOnDestroy(): void {
      if (this.articlesSubscription) {
        this.articlesSubscription.unsubscribe();
      }
  }
}
