import express from "express";
const router = express.Router();

import {
  createSkill,
  getSkills,
  updateSkill,
  deleteSkill,
} from "../controller/skillController.js";
import { createMulterUpload } from "../middleware/multerConfig.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";

const uploadSkills = createMulterUpload("uploads/skills");

router.post("/", uploadSkills.single("icon"), createSkill);
router.put("/:id", verifyAccessToken, uploadSkills.single("icon"), updateSkill);
router.get("/", getSkills);
router.delete("/:id", verifyAccessToken, deleteSkill);

export default router;
