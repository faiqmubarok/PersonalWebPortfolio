import express from "express";
const router = express.Router();

import {
  login,
  sendPasswordResetLink,
  resetPassword,
  refreshAccessToken,
  logout,
} from "../controller/authController.js";
import {
  verifyResetPassword,
  refreshTokenLimiter,
  validateRefreshToken,
  resetPasswordLimiter,
} from "../middleware/authMiddleware.js";

router.post("/login", login);
router.post(
  "/refresh-token",
  refreshTokenLimiter,
  validateRefreshToken,
  refreshAccessToken
); 
router.get("/send-reset-password", resetPasswordLimiter, sendPasswordResetLink);
router.post("/reset-password", verifyResetPassword, resetPassword);
router.post("/logout", logout);

export default router;
