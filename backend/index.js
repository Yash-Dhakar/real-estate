import express from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from "cors";

import authRouter from "./routes/authRoute.js"; // Corrected import path
import userRouter from "./routes/userRoute.js";
import listingRouter from "./routes/listingRoute.js";
// Load environment variables from .env file
dotenv.config();

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
// Register the authRouter middleware
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/listing',listingRouter);



// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/realEstate").then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000!!');
});
