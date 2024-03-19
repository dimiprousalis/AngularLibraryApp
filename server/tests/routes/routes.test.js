import mongoose from 'mongoose';
import { it, expect, beforeEach, afterEach } from 'vitest';
import { BookModel } from '../../models/book'
import supertest from 'supertest';
import request from 'supertest';
import express from 'express';
import router from '../../routes/book';
import { bookData } from '../data/book-data'
import { MongoMemoryServer } from 'mongodb-memory-server';

// Create an Express application
const app = express();
app.use(express.json());
app.use('/', router);

let server;

beforeEach(async () => {
    server = await MongoMemoryServer.create();
    process.env.DB_URI = server.getUri();

    await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterEach(async () => {
    await mongoose.disconnect();
    await server.stop();
});

it('GET /books should return all books', async () => {
    await BookModel.create(bookData);

    const response = await request(app)
        .get('/books')
        .expect('Content-Type', /json/)
        .expect(200);

    const books = response.body.books;

    expect(books).toEqual(expect.arrayContaining([
        expect.objectContaining({
            title: 'MockDonalds',
            author: 'Ronald MockDonald',
            publicationYear: 1955
        })
    ]));
});


it('POST /books adds a new book to the collection', async () => {
    const newBookData = {
        title: 'New Book',
        author: 'New Author',
        publicationYear: 2024
    };

    const response = await supertest(app)
        .post('/books')
        .send(newBookData)
        .expect('Content-Type', /json/)
        .expect(201);

    const addedBook = await BookModel.findOne({ title: 'New Book' });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newBookData);
    expect(addedBook).toBeTruthy();
});

it('POST /books only if year is less than current year', async () => {
    const newBookData = {
        title: 'New Book',
        author: 'New Author',
        publicationYear: 2025
    };

    const response = await supertest(app)
        .post('/books')
        .send(newBookData)
        .expect('Content-Type', /json/)
        .expect(500);

    const addedBook = await BookModel.findOne({ title: 'New Book' });

    expect(response.status).toBe(500);
});

it('GET /books/search searches for books by title or author', async () => {
    await BookModel.create(bookData);

    // Send a GET request to search for books by title
    const responseByTitle = await request(app)
        .get('/books/search')
        .query({ title: 'MockDonalds' })
        .expect('Content-Type', /json/)
        .expect(200);

    expect(responseByTitle.body).toEqual(expect.arrayContaining([
        expect.objectContaining({
            title: 'MockDonalds',
            author: 'Ronald MockDonald',
            publicationYear: 1955
        })
    ]));

    // Send a GET request to search for books by author
    const responseByAuthor = await request(app)
        .get('/books/search')
        .query({ author: 'Harper Lee' })
        .expect('Content-Type', /json/)
        .expect(200);

    expect(responseByAuthor.body).toEqual(expect.arrayContaining([
        expect.objectContaining({
            title: 'To Mock a Mockingbird',
            author: 'Harper Lee',
            publicationYear: 1960
        })
    ]));
});

it('GET /books/stats should provide statistics about the collection of books', async () => {
    await BookModel.create(bookData);

    const response = await supertest(app)
        .get('/books/stats')
        .expect('Content-Type', /json/)
        .expect(200);

    expect(response.body).toMatchObject({
        totalBooks: bookData.length,
        earliestYear: Math.min(...bookData.map(book => book.publicationYear)),
        latestYear: Math.max(...bookData.map(book => book.publicationYear))
    });
});

it('GET /books/:id should retrieve a specific book by its ID', async () => {
    const insertedBook = await BookModel.create(bookData[0]);

    const response = await request(app)
        .get(`/books/${insertedBook._id}`)
        .expect('Content-Type', /json/)
        .expect(404);

    expect(response.body).toEqual(expect.objectContaining({
        title: insertedBook.title,
        author: insertedBook.author,
        publicationYear: insertedBook.publicationYear
    }));
});

it('PUT /books/:id should update details of a specific book by its ID', async () => {
    await BookModel.create(bookData);

    const bookToUpdateId = (await BookModel.findOne({}))._id;

    const updatedBookData = {
        title: 'Updated Title',
        author: 'Updated Author',
        publicationYear: 2021
    };

    const response = await request(app)
        .put(`/books/${bookToUpdateId}`)
        .send(updatedBookData)
        .expect('Content-Type', /json/)
        .expect(200);

    expect(response.body).toEqual(expect.objectContaining({
        _id: bookToUpdateId.toString(),
        title: updatedBookData.title,
        author: updatedBookData.author,
        publicationYear: updatedBookData.publicationYear
    }));

    const updatedBook = await BookModel.findById(bookToUpdateId);
    expect(updatedBook).toEqual(expect.objectContaining(updatedBookData));
});

it('DELETE /books/:id should delete a specific book by its ID', async () => {
    await BookModel.create(bookData);

    const bookToDeleteId = (await BookModel.findOne({}))._id

    const response = await request(app)
        .delete(`/books/${bookToDeleteId}`)
        .expect(200);

    const deletedBook = await BookModel.findById(bookToDeleteId);
    expect(deletedBook).toBeNull()
});