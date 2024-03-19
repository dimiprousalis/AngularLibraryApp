import { Component } from '@angular/core';
import { Book } from '../../Book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {
  // Array to hold the books retrieved from the backend
  books: Book[] = []

  // Variables to track the current page and total pages for pagination
  currentPage = 1;
  totalPages = 1;

  constructor(private bookService: BookService) { }

  // Lifecycle hook called after Angular initializes the component
  ngOnInit(): void {
    // Load books when the component is initialized
    this.loadBooks();
  }

  // Function to load books from the backend based on the current page
  loadBooks(): void {
    this.bookService.getBooks(this.currentPage).subscribe(response => {
      // Update books array and total pages based on the response from the backend
      this.books = response.books;
      this.totalPages = response.totalPages;
    });
  }

  // Function to go to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++; // Increment current page
      this.loadBooks(); // Load books for the next page
    }
  }

  // Function to go to the previous page
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--; // Decrement current page
      this.loadBooks(); // Load books for the previous page
    }
  }

  // Function to delete a book
  deleteBook(book: Book) {
    this.bookService
      .deleteBook(book)
      .subscribe(
        () => (this.books = this.books.filter((b) => b._id !== book._id))
      );
  }

  // Function to add a new book
  addBook(book: Book) {
    this.bookService.addBook(book).subscribe((books) => (this.books.push(book)));
  }
}

