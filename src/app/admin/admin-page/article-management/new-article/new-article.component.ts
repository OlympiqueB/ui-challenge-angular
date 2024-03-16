import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/core/services/article/article.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ArticleModel } from 'src/app/core/models/article.model';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss'],
})
export class NewArticleComponent {
  articleForm!: FormGroup;

  isFormSent: boolean = false;

  constructor(
    private articleService: ArticleService,
    private announcer: LiveAnnouncer
  ) {
    this.articleForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
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

  submitForm() {
    if (this.articleForm.invalid || this.isFormSent) return;

    this.isFormSent = true;

    if (this.articleForm.valid) {
      const newArticle: ArticleModel = {
        title: this.title?.value,
        description: this.description?.value,
        body: this.body?.value,
        tagList: this.tags,
      };

      this.articleService.createArticle(newArticle).subscribe({
        next: (reply) => {
          console.log(reply);
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
}
