import express from "express";
const router = express.Router();

import {
  createPortfolio,
  getPortfolios,
  updatePortfolio,
  deletePortfolio,
  getPortfolioById,
} from "../controller/portfolioController.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import { createMulterUpload } from "../middleware/multerConfig.js";

const uploadPortfolios = createMulterUpload("uploads/portfolios");

// router.post("/", (req, res, next) => {
//   uploadPortfolios.array("images", 10)(req, res, (err) => {
//     if (err) {
//       console.error("Multer error:", err);
//       return res.status(400).json({ error: err.message });
//     }
//     console.log("Files:", req.files); // Log file yang diterima
//     console.log("Body:", req.body); // Log data body
//     res.status(200).json({ message: "Received successfully!" });
//   });
// });
router.post("/", verifyAccessToken, uploadPortfolios.array("images", 10), createPortfolio);
router.get("/", getPortfolios);
router.get("/:id", verifyAccessToken, getPortfolioById);
router.put(
  "/:id",
  verifyAccessToken,
  uploadPortfolios.array("images", 10),
  updatePortfolio
);
router.delete("/:id", verifyAccessToken, deletePortfolio);

export default router;
