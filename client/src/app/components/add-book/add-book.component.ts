import { Component, EventEmitter, Output } from '@angular/core';
import { Book } from '../../Book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss'
})
export class AddBookComponent {
  // Define an event emitter to emit the new book when added
  @Output() onAddBook: EventEmitter<Book> = new EventEmitter

  // Define properties for the form fields
  author: string = ''
  title: string = ''
  publicationYear: number = 0

  // Function to handle form submission
  onSubmit() {
    // Validate form fields
    if (!this.author) {
      alert('Please add author!')
      return
    }
    if (!this.title) {
      alert('Please add title!')
      return
    }
    if (!this.publicationYear) {
      alert('Please add publication year!')
      return
    }

    // Create a new book object
    const newBook = {
      author: this.author,
      title: this.title,
      publicationYear: this.publicationYear
    }

    // Emit the new book using the event emitter
    this.onAddBook.emit(newBook)

    // Display a success message
    alert("Book added!")

    // Clear form fields
    this.author = "",
      this.title = "",
      this.publicationYear = 0
  }
}