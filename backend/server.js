import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js"
import submissionRoutes from "./routes/submission.route.js"
import searchRoutes from "./routes/search.route.js"

import paymentRoutes from './routes/paymentRoutes.js';

import path from "path";




dotenv.config();

const __dirname = path.resolve();





const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
      origin: "http://localhost:5173", // Allow your frontend origin
      credentials: true, // Allow credentials (cookies, sessions, etc.)
    })
  );

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

app.use("/api/auth/", authRoutes);
app.use("/api/sub/", submissionRoutes);
app.use("/api/search/", searchRoutes);
app.use('/api/payment/', paymentRoutes);


if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "..frontend/dist")));
  app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  })
}



const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
