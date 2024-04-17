import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Article } from '../../article';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [NgFor,RouterLink],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent implements OnInit {

  articles: Article[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Article[]>("http://localhost/projet_web/getArticle.php").subscribe(
      (data) => {
        this.articles = data;
      }
    );
  }
verify(){
  Swal.fire({
    title: 'Delete Article?',
    text: "This action isn't reversible",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    allowOutsideClick: false
  }).then((result) => {
    if (result.isConfirmed) {
      this.http.delete("http://localhost/projet_web/deleteArticle.php").subscribe(
        data => console.log(data)
        
      )
    }
  });
}
}
