import { ArticleService } from 'src/app/core/services/article/article.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss'],
})
export class ArticlePageComponent {
  articleData: any;

  activeRouteSubscription!: Subscription;

  constructor(
    private articleService: ArticleService,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRouteSubscription = this.activeRoute.params
      .pipe(
        switchMap((params) => {
          const slug = params['slug'];
          if (slug) {
            return this.articleService.getArticle(slug);
          } else {
            return of(null);
          }
        })
      )
      .subscribe({
        next: (data) => {
          this.articleData = data.article;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
