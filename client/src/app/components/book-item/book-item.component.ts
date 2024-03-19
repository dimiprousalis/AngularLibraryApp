import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../Book';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.scss'
})
export class BookItemComponent {
  // Input property to receive the book object from the parent component
  @Input() book!: Book;

  // Output property to emit the delete event to the parent component
  @Output() onDeleteBook: EventEmitter<Book> = new EventEmitter()

  // Font Awesome trash can icon
  faTrashCan = faTrashCan;

  // Method to handle the delete action when the trash can icon is clicked
  onDelete(book: Book) {
    // Emit the delete event with the book object to the parent component
    this.onDeleteBook.emit(book)
  }

}
