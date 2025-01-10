import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  type: { type: String, enum: ["tech_stack", "tools"], required: true },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Skill", skillSchema);
