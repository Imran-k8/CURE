import express from "express";
import {protectRoute, protectRouteAdmin, protectRouteVerified} from "../middleware/auth.middleware.js"
import { getSearchResults, getSearchResultsByUserId } from "../controllers/search.controller.js";

const router = express.Router();



router.get("/getSearchResults", getSearchResults);
router.get("/getSearchResultsByUserId/:id", getSearchResultsByUserId);


export default router;