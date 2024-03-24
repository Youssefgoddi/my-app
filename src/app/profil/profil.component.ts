import { CommonModule, NgIf } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';
import { User } from '../user';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [NgIf, CommonModule, FormsModule,RouterLink,RouterOutlet],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
 
export class ProfilComponent implements OnInit{
  
  isEditMode: boolean = false;
  
  fullName :string ="";
  about_me : string ="";
  constructor(private http: HttpClient, private _update: UserService) { }

  ngOnInit(): void {
    this._update.getUser().subscribe(
      {
      }
    )
  }
  
  toggleEditMode() {
    this.isEditMode = !this.isEditMode; // Toggle the value of isEditMode
  }
  
  showAlert() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn w-40 p-2 btn-danger',
        cancelButton: 'w-40 p-2 btn btn-outline-success ms-2',
      },
    }).then((result: any) => {
      if (result.isConfirmed) {
        // Perform delete operation
        Swal.fire('Deleted!', 'Your account has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Do nothing or provide feedback
        Swal.fire('Cancelled', 'Your account is safe', 'info');
      }
    });
  }
  
  saved() {
    let user1 = new User(this.fullName,this.about_me)
    this._update.updateUser(user1)
    .subscribe({
      next: data => {
        console.log('Success!', data);
        // Optionally, perform any other actions upon success
      },
      error: err => {
        console.error('Error:', err);
        // Optionally, handle the error (e.g., display an error message to the user)
      }
    });
    
    this.isEditMode = !this.isEditMode; // Toggle the value of isEditMode
    Swal.fire({
      position: 'center',
      icon: 'success',
  title: 'Your informations have been saved',
  showConfirmButton: false,
  timer: 1500,
}); 
      }

  changeAvatar(id: number) {
    let photo = document.querySelector('#photo') as HTMLImageElement;
    switch (id) {
      case 1:
        photo.src = '../../assets/femme1.svg';
        break;
      case 2:
        photo.src = '../../assets/femme2.svg';
        break;
      case 3:
        photo.src = '../../assets/femme3.svg';
        break;
      case 4:
        photo.src = '../../assets/homme1.svg';
        break;
      case 5:
        photo.src = '../../assets/homme2.svg';
        break;
      case 6:
        photo.src = '../../assets/homme3.svg';
        break;
    }
  }
}
