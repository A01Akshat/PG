import mongoose from "mongoose";

const interestedProperty = new mongoose.Schema(
    {
        propertyId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Properties",
        },
        name: {
            type: String,
            required: true,
        },
        contact: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        currentYear: {
            type: String,
            required: true,
        },
        collegeName: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

export default mongoose.model("InterestedProperty", interestedProperty);
