import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './user';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  getUser() {
    return this.http.get<User>('http://localhost/projet_web/produit.php?id=11');
  }
  

  enroll(user : User ){
    return this.http.post('http://localhost/projet_web/insert.php',user)
  }
  
  updateUser(user :User): Observable<any> {
    const url = 'http://localhost/projet_web/update.php';

    return this.http.put<any>(url, user);
}

uploadRecipe(content: any): Observable<any> {
  return this.http.post<any>('http://localhost/projet_web/insert_recipes.php', { content });
}
  
}
