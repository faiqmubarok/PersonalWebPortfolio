import express from "express";
const router = express.Router();

import { getProfile, updateSocialMedia } from "../controller/profileController.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";

router.get("/", getProfile);
router.put("/socialmedia", verifyAccessToken, updateSocialMedia);

export default router;
