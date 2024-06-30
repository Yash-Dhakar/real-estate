import express from 'express';
import { signup ,signin} from '../controller/authController.js'; // Example import from controller

const router = express.Router();

router.post('/signup', signup); // Example route definition
router.post('/signin',signin);

export default router;
