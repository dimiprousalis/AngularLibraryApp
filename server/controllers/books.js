import { BookModel } from '../models/book.js';

/*-------------------------------CREATE BOOK-------------------------------- */
export const createBook = async (req, res) => {
    const { title, author, publicationYear, } = req.body
    const newBook = new BookModel({ title, author, publicationYear })
    try {
        // Save the new book to the database
        const response = await newBook.save()
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

/*---------------------------RETRIEVE ALL BOOKS---------------------------- */

export const getAllBooks = async (req, res) => {
    try {
        // Extract page and pageSize from the query parameters, default to 1 and 10 respectively
        const { page = 1, pageSize = 10 } = req.query
        const books = await BookModel.find().limit(pageSize * 1).skip((page - 1) * pageSize)
        const count = await BookModel.countDocuments()
        // Return the list of books along with pagination information
        res.status(200).json({
            books,
            totalPages: Math.ceil(count / pageSize),
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

/*----------------------------GET BOOKS STATS------------------------------ */
export const getStats = async (req, res) => {
    try {
        // Retrieve total number of books
        const totalBooks = await BookModel.countDocuments();
        // Find the earliest publication year
        const earliestYear = await BookModel.findOne({}, {}, { sort: { 'publicationYear': 1 } }).select('publicationYear');
        // Find the latest publication year
        const latestYear = await BookModel.findOne({}, {}, { sort: { 'publicationYear': -1 } }).select('publicationYear');

        res.status(200).json({
            totalBooks,
            earliestYear: earliestYear ? earliestYear.publicationYear : null,
            latestYear: latestYear ? latestYear.publicationYear : null,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/*---------------------------RETRIEVE BOOK BY ID----------------------------- */
export const getBookById = async (req, res) => {
    try {
        // Find a book by its ID
        const book = await BookModel.findById({ _id: req.params.id })
        if (!book) {
            return res.status(404).json({ error: 'Book not found' })
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

/*------------------------------UPDATE BOOK BY ID----------------------------- */
export const updateBookById = async (req, res) => {
    try {
        // Extract the update data from the request body
        const update = req.body
        // Find and update a book by its ID
        const book = await BookModel.findOneAndUpdate({ _id: req.params.id }, update, {
            new: true
        })
        if (!book) {
            return res.status(404).json({ error: 'Book not found' })
        }
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

/*-----------------------------DELETE BOOK BY ID------------------------------- */
export const deleteBookById = async (req, res) => {
    try {
        // Find and delete a book by its ID
        const book = await BookModel.findByIdAndDelete({ _id: req.params.id });
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

/*------------------------SEARCH BOOK BY TITLE OR AUTHOR------------------------- */
export const searchBooks = async (req, res) => {
    try {
        // Extract title and author from the query parameters
        const { title, author } = req.query
        // Search for books by title or author
        const book = await BookModel.find({ $or: [{ title }, { author }] });
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};



