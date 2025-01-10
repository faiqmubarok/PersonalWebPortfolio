import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isRead: {type: Boolean, default: false},
  isImportant: {type: Boolean, default: false}
});

export default mongoose.model("Message", MessageSchema);
