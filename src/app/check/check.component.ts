import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-check',
  standalone: true,
  imports: [NgFor],
  templateUrl: './check.component.html',
  styleUrl: './check.component.css'
})
export class CheckComponent implements OnInit {
  recipe: any = []; // Declare recipes as an array

  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.user.getRecipe().subscribe(
      data => {
console.log(data);
        this.recipe = data;
      },
      error => {
        console.error('Error fetching recipes:', error);
      }
    );
  }
}
