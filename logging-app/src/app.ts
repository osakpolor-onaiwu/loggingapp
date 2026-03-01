import express from 'express';
import mongoose from 'mongoose';
import { config } from "dotenv";
config();
import routes from './routes'; // Import routes from the routes directory
import { Request, Response, NextFunction } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(routes); // Use the imported routes

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';
mongoose
  .connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Error-handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});