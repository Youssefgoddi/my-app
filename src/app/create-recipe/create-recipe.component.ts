import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { UserService } from '../user.service';
@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [FormsModule,NgFor],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css'
})
export class CreateRecipeComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('image') image!: ElementRef<HTMLImageElement>;

  constructor(private _recipe :UserService){}
  selectedPhoto: string | ArrayBuffer | null = "../../assets/fff.png";

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPhoto = reader.result;
        this.image.nativeElement.src = reader.result as string;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  generatePDF() {
    const elementToPrint = document.getElementById('elementToPrint');
    if (elementToPrint) {
      html2canvas(elementToPrint, { scale: 2, allowTaint: true, useCORS: true }).then((canvas) => {
        const pdf = new jsPDF('p', 'mm', 'a4'); // Specify document size as A4
        const imgData = canvas.toDataURL('image/png', 1.0); // Set quality to 1.0 for maximum quality
        const imgWidth = 210; // Width of A4 page in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const offsetX = 10; // Adjust as needed
        const offsetY = 10; // Adjust as needed
        pdf.addImage(imgData, 'PNG', offsetX, offsetY, imgWidth, imgHeight, undefined, 'FAST'); // 'FAST' rendering for better performance
        pdf.save('myFile.pdf');
      });
    } else {
      console.error('Element with ID "elementToPrint" not found.');
    }
  
}

ingredients: string[] = [];
newItem: string = '';

addItem() {
  if (this.newItem.trim() !== '') {
    this.ingredients.push(this.newItem.trim());
    this.newItem = ''; // Clear the input field
  }
}

getContent() {
  let editableElements = document.querySelectorAll('[contenteditable="true"]') as NodeListOf<HTMLElement>;
  
  // Get the img element
  let imgElement = document.querySelector('img') as HTMLImageElement;

  // Get all li elements
  let liElements = document.querySelectorAll('.item');

  // Get the value of the selected rating stars
  let ratingInput = document.querySelector('input[name="rate"]:checked') as HTMLInputElement;
  let ratingValue = ratingInput ? ratingInput.value : '';

  // Array to store the content
  let contentArray: (string | string[] | HTMLImageElement)[] = [];

  // Iterate over editable elements and push their content to the array
  editableElements.forEach(element => {
      // Check if textContent is not null before pushing
      if (element.textContent !== null) {
          contentArray.push(element.textContent.trim());
      }
  });

  // Push the image element itself to the array if imgElement is not null
  if (imgElement && imgElement.src) {
      contentArray.push(imgElement);
  }

  // Array to store the content of li elements
  let liContentArray: string[] = [];

  // Iterate over li elements and push their content to the array
  liElements.forEach(element => {
      // Check if textContent is not null before pushing
      if (element.textContent !== null) {
          liContentArray.push(element.textContent.trim());
      }
  });

  // Push the content of li elements array to the main content array
  contentArray.push(liContentArray);

  // Push the value of the selected rating stars to the array
  contentArray.push(ratingValue);

  // Log the content array
  console.log(contentArray);

this._recipe.uploadRecipe(contentArray).subscribe(
  data => console.log(data)
  
)

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
