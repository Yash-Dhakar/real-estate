import express from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from "cors";

import authRouter from "./routes/authRoute.js"; // Corrected import path
import userRouter from "./routes/userRoute.js";
import listingRouter from "./routes/listingRoute.js";
import path from 'path';
// Load environment variables from .env file
dotenv.config();

const app = express();

const __dirname = path.resolve();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
// Register the authRouter middleware
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/listing',listingRouter);

app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
})



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
