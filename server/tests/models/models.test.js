import mongoose from 'mongoose';
import { it, expect, beforeEach, afterEach} from 'vitest';
import { BookModel } from '../../models/book'
import express from 'express';
import router from '../../routes/book';
import { MongoMemoryServer } from 'mongodb-memory-server';

const app = express();
app.use(express.json());
app.use('/', router);

let server;

const bookData = {
    title: 'MockDonalds',
    author: 'Ronald MockDonald',
    publicationYear: 1955 
};

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


it('inserts and reads a book document', async () => {
    const book = new BookModel(bookData);
    await book.save();

    const foundBook = await BookModel.findOne({ title: 'MockDonalds' });

    expect(foundBook).toHaveProperty('title');
    expect(foundBook).toHaveProperty('author');
    expect(foundBook).toHaveProperty('publicationYear');
    expect(foundBook?.title).toBe('MockDonalds');
    expect(foundBook?.author).toBe('Ronald MockDonald');
    expect(foundBook?.publicationYear).toBe(1955); 
});

