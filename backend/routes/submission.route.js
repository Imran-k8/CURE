import express from "express";
import multer from "multer";
import {protectRoute, protectRouteAdmin, protectRouteVerified} from "../middleware/auth.middleware.js"
import {submit, list} from "../controllers/submission.controller.js"

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/submit", protectRouteVerified, upload.single("file"), submit);
router.get("/submissionlist", protectRouteAdmin, list);


export default router;