import { Schema, model } from "mongoose";

const AvgRatingSchema = new Schema(
    {
        propertyId: {
            type: Schema.Types.ObjectId,
            ref: "Properties",
            required: true,
        },
        rating: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

export default model("AvgRatings", AvgRatingSchema);
