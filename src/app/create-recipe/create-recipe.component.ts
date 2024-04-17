import { Component, ElementRef, ViewChild } from "@angular/core";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FormsModule } from "@angular/forms";
import { NgFor } from "@angular/common";
import { UserService } from "../user.service";
import { Recipe } from "../recipe";
import { Title } from "@angular/platform-browser";
@Component({
  selector: "app-create-recipe",
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: "./create-recipe.component.html",
  styleUrl: "./create-recipe.component.css",
})
export class CreateRecipeComponent {
  @ViewChild("fileInput") fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild("image") image!: ElementRef<HTMLImageElement>;

  constructor(private _recipe: UserService) {}
  selectedPhoto: string = "";


  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  generatePDF() {
    const elementToPrint = document.getElementById("elementToPrint");
    if (elementToPrint) {
      html2canvas(elementToPrint, {
        scale: 2,
        allowTaint: true,
        useCORS: true,
      }).then((canvas) => {
        const pdf = new jsPDF("p", "mm", "a4"); // Specify document size as A4
        const imgData = canvas.toDataURL("image/png", 1.0); // Set quality to 1.0 for maximum quality
        const imgWidth = 210; // Width of A4 page in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const offsetX = 10; // Adjust as needed
        const offsetY = 10; // Adjust as needed
        pdf.addImage(
          imgData,
          "PNG",
          offsetX,
          offsetY,
          imgWidth,
          imgHeight,
          undefined,
          "FAST"
        ); // 'FAST' rendering for better performance
        pdf.save("myFile.pdf");
      });
    } else {
      console.error('Element with ID "elementToPrint" not found.');
    }
  }

  ingredients: string[] = [];
  newItem: string = "";

  addItem() {
    if (this.newItem.trim() !== "") {
      this.ingredients.push(this.newItem.trim());
      this.newItem = ""; // Clear the input field
    }
  }



  getContent() {
    // Create a new Recipe instance
    let recipe: Recipe = new Recipe(); // Initialize the recipe object
    let contentObject: any = {};

// Get the img element
let imgElement = document.querySelector("img") as HTMLImageElement;

  
// Get all li elements
let liElements = document.querySelectorAll(".item");


// Get all editable elements
let editableElements = document.querySelectorAll('[contenteditable="true"]') as NodeListOf<HTMLElement>;

// Iterate over editable elements and add their content to the recipe object
editableElements.forEach((element) => {
    // Check if textContent is not null before adding
    if (element.textContent !== null) {
        // Get the value of the name attribute
        let attributeName = element.getAttribute("name");

        // Assign content to corresponding keys based on element's name attribute
        if (attributeName === "titre") {
            recipe.titre = element.textContent.trim();
        } else if (attributeName === "description") {
            recipe.description = element.textContent.trim();
        } else if (attributeName === "preparation") {
            recipe.preparation = element.textContent.trim();
        } else if (attributeName === "cuisson") {
            recipe.cuisson = element.textContent.trim();
        } else if (attributeName === "portions") {
            recipe.portions = element.textContent.trim();
        } else if (attributeName === "info") {
            contentObject["info"] = element.textContent.trim();
        } else if (attributeName === "kcal") {
            recipe.kcal = element.textContent.trim();
        } else if (attributeName === "comment") {
            recipe.comment = element.textContent.trim();
        } else if (attributeName === "lip") {
            recipe.lip = element.textContent.trim();
        } else if (attributeName === "glu") {
            recipe.glu = element.textContent.trim();
        } else if (attributeName === "pro") {
            recipe.pro = element.textContent.trim();
        }else if (attributeName === "info") {
          recipe.info = element.textContent.trim();
      }
    }
});



// Array to store the content of li elements
let liContentArray: string[] = [];

// Iterate over li elements and add their content to the array
liElements.forEach((element) => {
    // Check if textContent is not null before adding
    if (element.textContent !== null) {
        liContentArray.push(element.textContent.trim());
    }
});

// Assign the content of li elements to the liContent property of the recipe object
recipe.ingredients = liContentArray;
recipe.image = this.selectedPhoto;
// Check if 'titre' field is present


    // Convert the recipe object to JSON format
    let recipeJSON = JSON.stringify(recipe);

    // Log the recipe object as JSON
    console.log("Recipe JSON:", recipe);
    this._recipe.uploadRecipe(recipe).subscribe(data=> console.log(data))

}

  deleteIngredient(ingredient: string): void {
    // Find the index of the ingredient in the array
    const index = this.ingredients.indexOf(ingredient);
    if (index !== -1) {
      // Remove the ingredient from the array
      this.ingredients.splice(index, 1);
    }
  }
}
