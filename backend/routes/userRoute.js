import express from 'express';
import { deleteUser, update } from '../controller/userController.js';

const router=express.Router();

router.post("/update",update);
router.post("/delete",deleteUser);

export default router;