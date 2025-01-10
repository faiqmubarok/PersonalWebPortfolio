import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  year: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Certificate", certificationSchema);
