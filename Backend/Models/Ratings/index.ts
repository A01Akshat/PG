import { Schema, model } from "mongoose";

const RatingSchema = new Schema(
    {
        userid: {
            type: Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
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

export default model("Ratings", RatingSchema);
