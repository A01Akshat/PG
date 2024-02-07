import { Schema, model } from "mongoose";

const ReviewSchema = new Schema(
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
        review: {
            type: String,
            required: true
        },
        rating: {
            type: Schema.Types.ObjectId,
            ref: "Ratings",
            required: true
        }
    },
    { timestamps: true }
);

export default model("Reviews", ReviewSchema);
