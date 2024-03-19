# Library App
This is a full-stack application for managing a collection of books. It consists of a backend server built with Node.js and Express.js, and a frontend client built with Angular.

## Backend

### Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose

## Frontend

### Technologies Used
- Angular
- Scss

### Setup Instructions

1. Clone the repository to your local machine: git clone https://github.com/dimiprousalis/AngularLibraryApp.git
2. Backend Setup:
    - Navigate to the `server` directory inside the project folder.
    - Install dependencies
        - Open a terminal and run `npm install`
    - Set up environment variables
        - Create a `.env` file in the `config` directory
        - Add the following variables to the `.env` file
            - `PORT`: Port number for the server to listen on.
            - `DB_URI`: MongoDB connection URI.
    - Start the server
        - Run `npm start`
3. Frontend Setup:
    - While the backend is running, open a second terminal
    - Navigate to the `client` directory
    - Install dependencies
          - Run `npm install`
    - Run `ng serve` inside the `client` directory
4. Open your browser and navigate to `http://localhost:4200/` to view the application

### Backend Testing

- The backend API is tested using:
    - vitest
    - supertest
    - mongodb-memory-server. 
- To run the backend tests, navigate to the server directory and run `npm test`

### API Endpoints

- GET /books: Retrieve a list of all books.
- POST /books: Add a new book to the collection.
- GET /books/search: Search for books by title or author.
- GET /books/stats: Get statistics about the collection of books.
- GET /books/:id: Retrieve a specific book by its ID.
- PUT /books/:id: Update details of a specific book by its ID.
- DELETE /books/:id: Delete a specific book by its ID.

## Usage Instructions

- Adding a Book:
    - Click on the "Add a new Book" button.
    - Enter the book's title, author, and publication year.
    - Click on the "Add Book" button to add the book to the collection.
- Viewing All Books:
    - The list of all books will be displayed on the homepage.
    - Use pagination buttons to navigate through multiple pages.
- Deleting a Book:
    - Click on the trash icon next to the book you want to delete.
    - Confirm the deletion when prompted.
