import Joi from "joi";

const propertyJoiSchema = Joi.object({
	name: Joi.string().required(),
	description: Joi.string().required(),
	ownerContact: Joi.number().required(),
	address: Joi.string().required(),
	rent: Joi.number().required(),
	specialOffers: Joi.string(),
	photos: Joi.array().items(Joi.string()).required(),
	furnished: Joi.string().valid("Furnished", "Semi Furnished", "Non Furnished").default("Non Furnished"),
	rooms: Joi.number().required(),
	bathroom: Joi.string().valid("Attached", "Common").required(),
	facilities: Joi.object({
		wifi: Joi.boolean().default(false),
		parking: Joi.boolean().default(false),
		laundry: Joi.boolean().default(false),
		ac: Joi.boolean().default(false),
		lift: Joi.boolean().default(false),
		food: Joi.boolean().default(false),
		hotWater: Joi.boolean().default(false),
		powerBackup: Joi.boolean().default(false),
	}),
	nerbyColleges: Joi.array().items(Joi.string()).required(),
	nearbyCollegesDistances: Joi.array().items(Joi.number()).required(),
});

const interestedPropertySchema = Joi.object({
	name: Joi.string().required(),
	contact: Joi.string().required(),
	email: Joi.string().required(),
	gender: Joi.string().required(),
	currentYear: Joi.string().required(),
	collegeName: Joi.string().required(),
	propertyId: Joi.string().required()
});

export default {
	propertyJoiSchema,
	interestedPropertySchema
};
