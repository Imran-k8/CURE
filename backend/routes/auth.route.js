import express from "express";
import { signup, login, logout, verifyEmail, checkVerified, getRole, checkAuth, resendVerificationEmail } from "../controllers/auth.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js"
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify-email/:token", verifyEmail)
router.get("/check", protectRoute, checkAuth);
router.get("/verified", protectRoute, checkVerified);
router.get("/role", protectRoute, getRole);
router.post("/send-verification-email", protectRoute, resendVerificationEmail);



export default router;