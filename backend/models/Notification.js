import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, required: true },
    isRead: {type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Notification", NotificationSchema);