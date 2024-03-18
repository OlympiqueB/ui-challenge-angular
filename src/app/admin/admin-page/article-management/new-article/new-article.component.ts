import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/core/services/article/article.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ArticleModel } from 'src/app/core/models/article.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, of, switchMap, tap } from 'rxjs';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss'],
})
export class NewArticleComponent implements OnInit, OnDestroy {
  articleForm!: FormGroup;

  editArticleData: any;

  isFormSent: boolean = false;

  submitSubscription!: Subscription;
  articleSubscription!: Subscription;

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private announcer: LiveAnnouncer,
    private toast: ToastService,
    private router: Router
  ) {
    this.articleForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.articleSubscription = this.activatedRoute.params
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
        next: (reply) => {
          if (reply) {
            this.editArticleData = reply.article;
            this.articleForm.setValue({
              title: this.editArticleData.title,
              description: this.editArticleData.description,
              body: this.editArticleData.body,
            });
            this.tags = this.editArticleData.tagList;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push(value);
    }

    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.announcer.announce(`Removed ${tag}`);
    }
  }

  edit(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(tag);
      return;
    }

    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index] = value;
    }
  }

  onSubmitNewArticle() {
    if (this.articleForm.invalid || this.isFormSent) return;

    this.isFormSent = true;

    if (this.articleForm.valid) {
      const newArticle: ArticleModel = {
        title: this.title?.value,
        description: this.description?.value,
        body: this.body?.value,
        tagList: this.tags,
      };

      this.submitSubscription = this.articleService
        .createArticle(newArticle)
        .subscribe({
          next: (reply) => {
            this.router.navigate(['/admin/articles']);
            this.toast.show({
              text: 'Article created',
              classname: 'bg-success text-light fs-5',
            });
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.isFormSent = false;
          },
        });
    }
  }

  onSubmitEdit() {
    if (this.articleForm.invalid || this.isFormSent) return;

    this.isFormSent = true;

    if (this.articleForm.valid) {
      const newArticle: ArticleModel = {
        title: this.title?.value,
        description: this.description?.value,
        body: this.body?.value,
        tagList: this.tags,
      };

      this.submitSubscription = this.articleService
        .updateArticle(this.editArticleData.slug, newArticle)
        .subscribe({
          next: (reply) => {
            this.router.navigate(['/admin/articles']);
            this.toast.show({
              text: 'Article successfully created.',
              classname: 'bg-success text-light fs-5',
            });
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.isFormSent = false;
          },
        });
    }
  }

  get title() {
    return this.articleForm.get('title');
  }

  get description() {
    return this.articleForm.get('description');
  }

  get body() {
    return this.articleForm.get('body');
  }

  ngOnDestroy(): void {
    if (this.submitSubscription) {
      this.submitSubscription.unsubscribe();
    }
    if (this.articleSubscription) {
      this.articleSubscription.unsubscribe();
    }
  }
}
