import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getAllArticles() {
    return this.http.get<any>(`${BASE_URL}api/articles`);
  }

  getArticle(slug: string) {
    return this.http.get<any>(`${BASE_URL}api/articles/${slug}`);
  }

  getComments(slug: string) {
    return this.http.get<any>(`${BASE_URL}api/articles/${slug}/comments`);
  }
}
