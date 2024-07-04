
import express from 'express';
import { createListing, deleteListing, getListing, getListingById, updateListing } from '../controller/listingController.js';

const router=express.Router();

router.post("/create",createListing);
router.get('/getListing',getListing);
router.get('/getListingById',getListingById);
router.post('/updateListing',updateListing);
router.post('/deleteListing',deleteListing);

export default router;