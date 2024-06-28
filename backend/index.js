import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();



const app = express();


// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/real-estate").then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000!!');
});
