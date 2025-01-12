import express from "express";
const router = express.Router();

import authRoutes from "./authRoutes.js";
import messageRoutes from "./messageRoutes.js";
import experienceRoutes from "./experienceRoutes.js"
import organizationRoutes from "./organizationRoutes.js"
import certificateRoutes from "./certificateRoutes.js"
import portfolioRoutes from "./portfolioRoutes.js"
import skillRoutes from "./skillRoutes.js";
import profileRoutes from "./profileRoutes.js";

router.use("/auth", authRoutes);
router.use("/messages", messageRoutes);
router.use("/experiences", experienceRoutes);
router.use("/organizations", organizationRoutes);
router.use("/certificates", certificateRoutes);
router.use("/portfolios", portfolioRoutes);
router.use("/skills", skillRoutes);
router.use("/profiles", profileRoutes);

export default router;