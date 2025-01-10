import express from "express";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";

const app = express();
app.use(cookieParser());
app.use(express.json());
dotenv.config();

// CORS Configuration
const corsOptions = {
  // origin: [process.env.FRONTEND_URL, "http://192.168.18.191:5173"],
  origin: process.env.FRONTEND_URL,
  methods: "GET,POST,PUT,DELETE",
  credentials: true, // Mengizinkan cookies untuk dikirim
};
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.json({ message: "Server is running successfully" });
});
app.use("/api", routes);  
app.use("/uploads", express.static("uploads"));

const PORT = process.env.APP_PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
