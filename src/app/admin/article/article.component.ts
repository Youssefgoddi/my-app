import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import {
  AngularEditorConfig,
  AngularEditorModule,
} from "@kolkov/angular-editor";
@Component({
  selector: "app-article",
  standalone: true,
  imports: [RouterOutlet, AngularEditorModule, FormsModule],
  templateUrl: "./article.component.html",
  styleUrl: "./article.component.css",
})
export class ArticleComponent {
  constructor(private http: HttpClient) {}

  editorConfig: AngularEditorConfig = {
    editable: true,
    height: "250px",
  };
  articleData = {
    title: "",
    content: "",
    desc:"",
    url:""
  };

  submit() {
    const { title, content,desc,url } = this.articleData;
    if (!title.trim() || !content.trim() || !desc.trim() || !url.trim()) {
      console.error("Title and content and description and url must not be empty");
      return;
    }
  
    const dataToSend = { articleData: { title, content,desc,url } };
    this.http.post("http://localhost/projet_web/uploadArticle.php", dataToSend)
      .subscribe(
        (data) => console.log(data),
        (error) => console.error("Error:", error)
      );
  }
  
  
  
  
}
