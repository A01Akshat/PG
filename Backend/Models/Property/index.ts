import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		ownerContact: {
			type: Number,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		rent: {
			type: Number,
			required: true,
		},
		specialOffers: {
			type: String,
		},
		photos: {
			type: [String],
			required: true,
		},
		furnished: {
			type: String, // Changed to string to accommodate options
			enum: ["Furnished", "Semi Furnished", "Non Furnished"], // Enum for options
			default: "Non Furnished", // Default value
		},
		rooms: {
			type: Number,
			required: true,
		},
		bathroom: {
			type: String, // Changed to string to accommodate options
			enum: ["Attached", "Common"], // Enum for options
			required: true,
		},
		facilities: {
			wifi: {
				type: Boolean,
				default: false,
			},
			parking: {
				type: Boolean,
				default: false,
			},
			laundry: {
				type: Boolean,
				default: false,
			},
			ac: {
				type: Boolean,
				default: false,
			},
			food: {
				type: Boolean,
				default: false,
			},
			hotWater: {
				type: Boolean,
				default: false,
			},
			powerBackup: { // Added powerBackup
				type: Boolean,
				default: false,
			},
		},
		nerbyColleges: {
			type: [mongoose.Schema.Types.ObjectId],
			required: true,
			ref: "Colleges",
		},
		nearbyCollegesDistances: {
			type: [Number],
			required: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Users",
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Properties", propertySchema);
