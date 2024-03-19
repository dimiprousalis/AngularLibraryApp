import mongoose from "mongoose";

/*------------------------BOOK MODEL SCHEMA------------------------- */
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    // Must be a number, should be less than or equal to the current year
    publicationYear: { type: Number, required: true, max: new Date().getFullYear() },
});

export const BookModel = mongoose.model("books", bookSchema)