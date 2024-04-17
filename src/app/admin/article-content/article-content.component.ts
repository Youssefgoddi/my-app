import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../article';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-article-content',
  standalone: true,
  imports: [NgIf],
  templateUrl: './article-content.component.html',
  styleUrl: './article-content.component.css'
})
export class ArticleContentComponent implements OnInit {

    articleId: number=0;
    article: Article = new Article;
    content: any
    constructor(private route: ActivatedRoute, private http: HttpClient) { }
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.articleId = +params['id']; // Retrieve the article ID from route parameters
        if (this.articleId) {
          this.fetchArticle(); // Call fetchArticle() to get article data
        }
      });
    }
  
    fetchArticle(): void {
      this.http.get<Article>(`http://localhost/projet_web/getArticle.php?id=${this.articleId}`).subscribe(
        (data) => {

          this.article = data; // Assign fetched article data to article property
          this.content =data.content
        },
        (error) => {
          console.error('Error fetching article:', error);
          // Handle error (e.g., show error message to user)
        }
      );
    }
}
