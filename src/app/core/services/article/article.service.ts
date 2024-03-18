import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../config';
import { ArticleModel } from '../../models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getAllArticles() {
    return this.http.get<any>(`${BASE_URL}api/articles`);
  }

  createArticle(article: ArticleModel) {
    return this.http.post<ArticleModel>(`${BASE_URL}api/articles`, article);
  }

  getArticle(slug: string) {
    return this.http.get<any>(`${BASE_URL}api/articles/${slug}`);
  }

  updateArticle(slug: string, updatedArticle: ArticleModel) {
    return this.http.put<any>(
      `${BASE_URL}api/articles/${slug}`,
      updatedArticle
    );
  }

  deleteArticle(slug: string) {
    return this.http.delete<any>(`${BASE_URL}api/articles/${slug}`);
  }

  getComments(slug: string) {
    return this.http.get<any>(`${BASE_URL}api/articles/${slug}/comments`);
  }
}
