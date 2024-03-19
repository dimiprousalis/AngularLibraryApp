import express from "express";
import { createBook, getAllBooks, getBookById, updateBookById, deleteBookById, searchBooks, getStats } from "../controllers/books.js";

const router = express.Router();

// Route to retrieve a list of all books
router.get("/books", getAllBooks);

// Route to add a new book to the collection
router.post("/books", createBook);

// Route to search for books by title or author
router.get("/books/search", searchBooks);

// Route to get statistics about the collection of books
router.get("/books/stats", getStats);

// Route to retrieve a specific book by its ID
router.get("/books/:id", getBookById);

// Route to update details of a specific book by its ID
router.put("/books/:id", updateBookById);

// Route to delete a specific book by its ID
router.delete("/books/:id", deleteBookById);



export default router