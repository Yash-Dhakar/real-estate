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


export const getListing = async (req, res) => {
    try {
        const { userRef } = req.query; 
  
      if (!userRef) {
        return res.status(400).json({ status: "Bad Request", message: "Missing user Ref" });
      }
  
      const listings = await Listing.find({ userRef });
  
      if (listings.length > 0) {
        return res.status(200).json(listings);
      } else {
        return res.status(404).json({ error: "No listings found for the provided user Ref" });
      }
    } catch (error) {
      return res.status(500).json({ status: "Internal Server Error", message: error.message });
    }
  };
  