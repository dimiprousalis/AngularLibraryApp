import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../Book';

// HTTP options for specifying JSON content type
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // API endpoint for books
  private apiUrl = 'http://localhost:3001/books';

  constructor(private http: HttpClient) { }

  // Function to retrieve books from the server for a specific page
  getBooks(page: number): Observable<{ books: Book[], totalPages: number }> {
    // Set the 'page' parameter in the request URL
    const params = new HttpParams().set('page', page.toString());
    // Send GET request to the API endpoint with pagination parameters
    return this.http.get<{ books: Book[], totalPages: number }>(this.apiUrl, { params });
  }

  // Function to delete a book from the server
  deleteBook(book: Book): Observable<Book> {
    // Construct URL for the specific book using its ID
    const url = `${this.apiUrl}/${book._id}`; // URL for the specific task
    // Send DELETE request to the specific book URL
    return this.http.delete<Book>(url);
  }

  // Function to add a new book to the server
  addBook(book: Book): Observable<Book> {
    // Send POST request to the API endpoint with the new book data and HTTP options
    return this.http.post<Book>(this.apiUrl, book, httpOptions)
  }
}
