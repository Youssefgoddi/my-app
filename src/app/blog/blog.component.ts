import { Component } from '@angular/core';
import { Article } from '../article';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink,NgFor],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  articles: Article[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Article[]>("http://localhost/projet_web/getArticle.php").subscribe(
      (data) => {
        this.articles = data;
      }
    );
  }
  debug(article: any) {
    console.log('Article ID:', article.id);
  }
  
}
