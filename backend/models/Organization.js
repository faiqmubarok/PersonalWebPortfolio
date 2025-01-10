import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: {type: String, required: true },
    startMonth: { type: String, required: true },
    startYear: { type: String, required: true },
    endMonth: { type: String, required: true },
    endYear: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Organization", OrganizationSchema);