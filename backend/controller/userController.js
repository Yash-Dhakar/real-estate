import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";



export const update = async (req, res) => {
  const userData = req.body;

  if (!userData || !userData._id) {
    return res
      .status(400)
      .json({ status: "Bad Request", message: "Invalid data" });
  }

  try {
    const user = await User.findById(userData._id);

    if (!user) {
      return res.status(404).json({ status: "User not found" });
    }

    if (userData.password) {
      const hashedPassword = await bcryptjs.hash(userData.password, 10);
      userData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userData._id,
      { $set: userData },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "Internal server error" });
  }
};


export const deleteUser = async (req, res) => {
    const { _id } = req.body;
    console.log(req.body);
  
    if (!_id) {
      return res.status(400).json({ status: "Bad Request", message: "Missing user ID" });
    }
  
    try {
      const user = await User.findById(_id);
  
      if (!user) {
        return res.status(404).json({ status: "User not found" });
      }
  
      await User.findByIdAndDelete(_id);
  
      res.clearCookie('access_token');
      res.status(200).json({ status: 'User deleted successfully' });
  
    } catch (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ status: "Internal server error" });
    }
  };


  export const getUser = async (req, res, next) => {
    try {
      
      const user = await User.findById(req.params.id);
    
      if (!user) return res.status(404).json({ status: "User not found" });
    
      const { password: pass, ...rest } = user._doc;
    
      res.status(200).json(rest);
    } catch (error) {
      res.status(500).json({ status: "Internal server error" });
    }
  }; 
  