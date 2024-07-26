import { Component } from '@angular/core';
import { SearchComponent } from "../../partials/search/search.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  question: string = '';

  onSubmit() {
    if (this.question.trim()) {
      console.log('Question submitted:', this.question);
      // Here you can add logic to send the question to the server or handle it as needed
      this.question = '';
    }
  }
}
