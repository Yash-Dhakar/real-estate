import express from 'express';
import { signup } from '../controller/authController.js'; // Example import from controller

const router = express.Router();

router.get('/signup', signup); // Example route definition

export default router;
