import express from "express";
const router = express.Router();

import {
  createMessage,
  updateMessage,
  getMessages,
  deleteMessage,
} from "../controller/messageController.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";

router.post("/", createMessage);
router.get("/", verifyAccessToken, getMessages);
router.put("/:id", verifyAccessToken, updateMessage);
router.delete("/:id", verifyAccessToken, deleteMessage);

export default router;
