import express from "express";
const router = express.Router();

import {
  createOrganization,
  getOrganization,
  updateOrganization,
  deleteOrganization,
} from "../controller/organizationController.js";
import {verifyAccessToken} from "../middleware/authMiddleware.js"

router.post("/", verifyAccessToken, createOrganization);
router.put("/:id", verifyAccessToken, updateOrganization);
router.get("/", getOrganization);
router.delete("/:id", verifyAccessToken, deleteOrganization);

export default router;


