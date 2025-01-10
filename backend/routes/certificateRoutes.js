import express from "express";
const router = express.Router();

import {
  createCertificate,
  getCertificates,
  updateCertificate,
  deleteCertificate,
} from "../controller/certificateController.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import { createMulterUpload } from "../middleware/multerConfig.js";

const uploadCertificates = createMulterUpload("uploads/certificates");

router.post(
  "/",
  verifyAccessToken,
  uploadCertificates.single("image"),
  createCertificate
);
router.put(
  "/:id",
  verifyAccessToken,
  uploadCertificates.single("image"),
  updateCertificate
);
router.get("/", getCertificates);
router.delete("/:id", verifyAccessToken, deleteCertificate);

export default router;
