import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticleModel } from 'src/app/core/models/article.model';
import { ArticleService } from 'src/app/core/services/article/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnDestroy {
  articles!: any[];

  articlesSubscription!: Subscription;

  constructor(private articleService: ArticleService) {
    this.getArticles();
  }

  getArticles() {
    this.articlesSubscription = this.articleService.getAllArticles().subscribe({
      next: (reply) => {
        this.articles = reply.articles;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  onDeleteClick(slug: string) {
    if (confirm('Are you sure?')) {
      this.articleService.deleteArticle(slug).subscribe({
        next: (reply) => {
          console.log(reply);
          alert('Article deleted');
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.getArticles();
        },
      });
    }
  }

  ngOnDestroy(): void {
    if (this.articlesSubscription) {
      this.articlesSubscription.unsubscribe();
    }
  }
}
