
import express from 'express';
import { createListing, getListing } from '../controller/listingController.js';

const router=express.Router();

router.post("/create",createListing);
router.get('/getListing',getListing);

export default router;