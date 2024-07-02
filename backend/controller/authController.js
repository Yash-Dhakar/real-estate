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




export const google = async (req, res) => {
    const { email, name, avatar } = req.body;

    // Validate request body
    if (!email || !name || !avatar) {
        return res.status(400).json({ status: "Bad Request", message: "Missing required fields" });
    }

    try {
        let user = await User.findOne({ email: email });

        if (!user) {
            // New user
            const username = name.replaceAll(" ", "_") + Math.floor(Math.random() * 1000) + 1;
            const password = rs.generate();

            user = await User.create({
                username: username,
                email: email,
                password: password,
                avatar: avatar
            });
        }

        // Common logic for both existing and new users
        const payload = { id: user._id }; // Use user ID as payload
        const key = rs.generate();
        const token = jwt.sign(payload, key);

        return res.cookie('access_token', token, { httpOnly: true })
                  .status(200)
                  .json(user);

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ status: "Internal Server Error", message: err.message });
    }
};

export const signOut = async (req, res, next) => {
    try {
      res.clearCookie('access_token');
      res.status(200).json('User has been logged out!');
    } catch (error) {
      res.status(500).json({"status":"Internal server err"});
    }
  };
