import bcryptjs from 'bcryptjs';
import User from '../model/user.model.js';
import jwt from 'jsonwebtoken';
import rs from 'randomstring';


export const signup=async (req,res)=>{
   const userDetails=req.body;

   userDetails.password= await bcryptjs.hash(userDetails.password,10);

   try{
    const user=await User.create(userDetails);
    res.status(201).json({status:"User created successfully"})
   }
   catch(err){
    console.log(err);
    res.status(500).json({status:"Error in creating User"})

   }
   
}

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email: email }).lean();

        if (!user) {
            return res.status(404).json({ status: "User not found" });
        }

        // Compare provided password with stored hashed password
        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ status: "Invalid Password" });
        }

        // Remove password from user data
        const userData = { ...user, password: "" };

        // Generate JWT token
        const payload = { id: user._id }; // Use user ID as payload
        const key = rs.generate();
        const token = jwt.sign(payload, key);

        // Return token in cookie and user data
        return res.cookie('access_token', token, { httpOnly: true })
                  .status(200)
                  .json(userData);
    } catch (err) {
        console.error('Error during signin:', err);
        return res.status(500).json({ status: "Internal Server Error" });
    }
};
