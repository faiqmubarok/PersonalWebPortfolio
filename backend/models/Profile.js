import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: [String], default: [] },
  socialMedia: [
    {
      media: {
        type: String,
        enum: ["discord", "instagram", "linkedin", "github"],
      },
      link: { type: String },
    },
  ],
  contact: [
    {
      type: { type: String, enum: ["phone", "email", "location", "age"] },
      name: { type: String },
    },
  ],
  photoProfile: { type: String },
  bio: { type: [String], maxlength: 500 }, 
  curiculumVitae: { type: String }, 
  createdAt: { type: Date, default: Date.now }, 
});

export default mongoose.model("Profile", profileSchema);



