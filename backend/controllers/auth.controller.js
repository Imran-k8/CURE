import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const {fullName, email, password, affiliation, adminCode} = req.body;
    let role = 'User';
    try{
        if(!fullName || !email || !password || !affiliation){
            return res.status(400).json({message: "All fields are required"})
        }

        if(password.length <8){
            return res.status(400).json({message: "Password must be atleast 8 characters"})
        }

        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: "Email already in use"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        if(adminCode === process.env.ADMIN_CODE){
            role = "Admin";
        }
        const newUser = new User({
            fullName, 
            email,
            role,
            password: hashedPassword,
            affiliation,
        })
        
        if(newUser){
            generateToken(newUser._id,res)
            await newUser.save()
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                role: newUser.role,
                affiliation: newUser.affiliation,
                verified: newUser.verified,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
      } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
}