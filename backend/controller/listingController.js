import Listing from "../model/listing.model.js";


export const createListing=async (req,res)=>{
    const listingDetails=req.body;
    try{
        const list=await Listing.create(listingDetails);
        res.status(201).json(list);
    }
    catch(err){
        console.log(err);
        res.status(500).json({"status":"Internal server error"})
    }
}