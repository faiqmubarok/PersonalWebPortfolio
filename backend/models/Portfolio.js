import mongoose from "mongoose";

const portfolioSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["web_app", "ui/ux_design"], required: true },
  client: { type: String },
  tech: { type: [String], required: true },
  images: { type: [String], required: true },
  link: { type: String },
  paragraphs: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Portfolio", portfolioSchema);
