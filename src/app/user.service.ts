import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  deleteUser(){
    return this.http.delete<User>('http://localhost/projet_web/produit.php');

  }
  getUser() {
    return this.http.get<User>('http://localhost/projet_web/produit.php?id=18');
  }
  updateUser(user :any): Observable<any> {
    const url = 'http://localhost/projet_web/update.php';

    return this.http.put(url, user);
}

setUser(id: string): void {
  localStorage.setItem('userID', id);
}
  getRecipe() {
    return this.http.get('http://localhost/projet_web/get_recipes.php');
  }
  

uploadRecipe(content: any) {
  return this.http.post<any>('http://localhost/projet_web/insert_recipes.php', JSON.stringify( content) );
}
  
}
