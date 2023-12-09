import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
	{
		collegeName: {
			type: String,
			required: true,
		},
		collegeAddress: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Colleges", collegeSchema);
