import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  type: { type: String, enum: ["experience", "education"], required: true },
  startMonth: { type: String, required: true },
  startYear: { type: String, required: true },
  endMonth: { type: String },
  endYear: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Experience", experienceSchema);
