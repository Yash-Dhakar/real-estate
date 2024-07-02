import express from 'express';
import { signup ,signin,google,signOut} from '../controller/authController.js'; // Example import from controller

const router = express.Router();

router.post('/signup', signup); // Example route definition
router.post('/signin',signin);
router.post('/google',google);
router.get('/signout',signOut);

export default router;
