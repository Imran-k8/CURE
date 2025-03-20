import express from "express";
import {protectRoute, protectRouteAdmin, protectRouteVerified} from "../middleware/auth.middleware.js"
import { getSearchResults } from "../controllers/search.controller.js";

const router = express.Router();



router.get("/getSearchResults", getSearchResults);


export default router;