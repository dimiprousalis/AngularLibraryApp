import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';
import router from './routes/book.js';

// Load environment variables from .env file
dotenv.config({ path: './config/.env' });

// Connect to the database
connectDB()

// Create an Express app instance
const app = express();

// Middleware for parsing JSON bodies and handling CORS
app.use(express.json());
app.use(cors());

// Mount the router middleware at the root path
app.use('/', router);

// Start the Express server
const server = app.listen(process.env.PORT || "3001", () => {
    console.log(`server is running on ${process.env.PORT}`);
});

export default server;