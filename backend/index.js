import express from 'express';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import listingRouter from './routes/listingRoute.js';



const app = express();
const __dirname = path.resolve();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Register the authRouter middleware
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/listing', listingRouter);

app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});


// Connect to MongoDB
mongoose.connect("mongodb+srv://yash19me137:timeline%40123@estate-elite-real.kswfbfd.mongodb.net/?retryWrites=true&w=majority&appName=estate-Elite-real")
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000!!');
});

