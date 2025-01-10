import express from "express";
const router = express.Router();

import {
  createExperience,
  updateExperience,
  getExperiences,
  deleteExperience,
} from "../controller/experienceController.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";

router.post("/", verifyAccessToken, createExperience);
router.put("/:id", verifyAccessToken, updateExperience);
router.get("/", getExperiences);
router.delete("/:id", verifyAccessToken, deleteExperience);

export default router;
