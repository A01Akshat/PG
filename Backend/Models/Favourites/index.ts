import mongoose from "mongoose";

const favouritesSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Users",
		},
		propertyId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Properties",
		},
	},
	{ timestamps: true }
);

export default mongoose.model("favourites", favouritesSchema);
