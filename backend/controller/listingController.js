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


  export const getListingById = async (req, res) => {
    try {
        const {_id} = req.query; 
  
      if (!_id) {
        return res.status(400).json({ status: "Bad Request", message: "Missing listing id " });
      }
  
      const listing = await Listing.findById(_id);
  
      if (listing ) {
        return res.status(200).json(listing);
      } else {
        return res.status(404).json({ error: "No listing found for the provided user Id" });
      }
    } catch (error) {
      return res.status(500).json({ status: "Internal Server Error", message: error.message });
    }
  };
 

  
  export const updateListing = async (req, res) => {
    try {
      const { userRef, _id, ...updateData } = req.body;
  
      if (!userRef || !_id) {
        return res.status(400).json({ status: "Bad Request", message: "Missing userRef or listing Id" });
      }
  
      const listing = await Listing.findById(_id);
  
      if (listing) {
        const updatedListing = await Listing.findByIdAndUpdate(
          _id,
          { $set: updateData },
          { new: true }
        );
        return res.status(200).json(updatedListing);
      } else {
        return res.status(404).json({ error: "No listing found for the provided listing Id" });
      }
    } catch (error) {
      return res.status(500).json({ status: "Internal Server Error", message: error.message });
    }
  };
  

  
  export const deleteListing = async (req, res) => {
    try {
      const { userRef, _id } = req.body;
  
      if (!userRef || !_id) {
        return res.status(400).json({ status: "Bad Request", message: "Missing userRef or listing Id" });
      }
  
      const listing = await Listing.findById(_id);
  
      if (listing) {
        const deletedListing = await Listing.findByIdAndDelete(_id);
        return res.status(200).json({status:"Listing deleted successfully"});
      } else {
        return res.status(404).json({ error: "No listing found for the provided listing Id" });
      }
    } catch (error) {
      return res.status(500).json({ status: "Internal Server Error", message: error.message });
    }
  };


  export const getFilteredListings = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      let offer = req.query.offer;
  
      if (offer === undefined || offer === 'false') {
        offer = { $in: [false, true] };
      }
  
      let furnished = req.query.furnished;
  
      if (furnished === undefined || furnished === 'false') {
        furnished = { $in: [false, true] };
      }
  
      let parking = req.query.parking;
  
      if (parking === undefined || parking === 'false') {
        parking = { $in: [false, true] };
      }
  
      let type = req.query.type;
  
      if (type === undefined || type === 'all') {
        type = { $in: ['sale', 'rent'] };
      }
  
      const searchTerm = req.query.searchTerm || '';
  
      const sort = req.query.sort || 'createdAt';
  
      const order = req.query.order || 'desc';
  
      const listings = await Listing.find({
        name: { $regex: searchTerm, $options: 'i' },
        offer,
        furnished,
        parking,
        type,
      })
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);
  
      return res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  };
  


  
  
