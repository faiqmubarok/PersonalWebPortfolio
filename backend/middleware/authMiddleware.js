import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";

export const verifyResetPassword = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    // Verifikasi token menggunakan secret key yang sama dengan yang digunakan untuk membuat token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Menyimpan informasi user (misalnya email) dalam req.user
    next(); // Lanjutkan ke handler berikutnya
  } catch (error) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

export const resetPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 3, // Maksimum 3 permintaan
  message: "You can only request a password reset link 3 times in 15 minutes.",
  handler: (req, res) => {
    res
      .status(429)
      .json({ message: "Too many requests, please try again later." });
  },
});

export const refreshTokenLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 5, // Maksimal 5 request dalam 15 menit
  message: {
    message: "Too many refresh token requests. Please try again later.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    res
      .status(429)
      .json({ message: "Too many requests, please try again later." });
  },
});

export const validateRefreshToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
  
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }
  
    req.refreshToken = refreshToken;
    next();
  };
  

export const verifyAccessToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Tambahkan data user ke request
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired access token" });
  }
};
