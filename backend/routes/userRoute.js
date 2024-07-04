import express from 'express';
import { deleteUser, getUser, update } from '../controller/userController.js';

const router=express.Router();

router.post("/update",update);
router.post("/delete",deleteUser);
router.get('/getDetails', getUser)


export default router;