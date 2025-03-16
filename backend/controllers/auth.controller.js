import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "../lib/emails.js";
import crypto from "crypto";

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

        const verificationToken = crypto.randomBytes(32).toString("hex");



        if(adminCode === process.env.ADMIN_CODE){
            role = "Admin";
        }
        const newUser = new User({
            fullName, 
            email,
            role,
            password: hashedPassword,
            affiliation,
            verificationToken,
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
                verificationToken: newUser.verificationToken,
            });
            await sendVerificationEmail(email, verificationToken);
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
      } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"});
        }
        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            affiliation: user.affiliation,
            verified: user.verified,
        });


    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
      } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
}

export const verifyEmail = async (req, res) => {
    try {
        const { token: token } = req.params;

        // Find user with this token
        const user = await User.findOne({ verificationToken: token });

        if (!user) return res.status(400).json({ message: "Invalid or expired token." });

        // Mark user as verified
        user.verified = true;
        user.verificationToken = null;
        await user.save();

        res.status(200).json({ message: "Email verified successfully. You can now log in." });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


export const checkAuth = (req, res) => {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      console.log("Error in checkAuth controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

export const checkVerified = (req, res) =>{
    try {
        if(req.user.verified == true){
            return res.status(200).json({verified: true});
        }
    } catch (error) {
        console.log("Error in checkVerified controller", error.message);
        res.status("500").json({message: "internal server error"});
    }
}

export const getRole = (req, res) =>{
    try {
        if(req.user.role === "Admin"){
            return res.status(200).json({role: "Admin"});
        }
        if(req.user.role === "User"){
            return res.status(200).json({role: "User"});
        }
    } catch (error) {
        console.log("Error in getRole controller", error.message);
        res.status("500").json({message: "internal server error"});
    }
}

export const resendVerificationEmail = async (req, res) =>{
    try {
        await sendVerificationEmail(req.user.email, req.user.verificationToken);
    } catch (error) {
        console.log("error in resendVerificationEmail controller", error.message);
        res.status("500").json({message: "internal server error"});
    }
}