import Joi from "joi";

const propertyJoiSchema = Joi.object({
	name: Joi.string().required(),
	description: Joi.string().required(),
	ownerContact: Joi.number().required(),
	address: Joi.string().required(),
	rent: Joi.number().required(),
	specialOffers: Joi.string(),
	photos: Joi.array().items(Joi.string()).required(),
	furnished: Joi.boolean().default(false),
	rooms: Joi.number().required(),
	bathroom: Joi.number().required(),
	facilities: Joi.object({
		wifi: Joi.boolean().default(false),
		parking: Joi.boolean().default(false),
		laundry: Joi.boolean().default(false),
		ac: Joi.boolean().default(false),
		lift: Joi.boolean().default(false),
		food: Joi.boolean().default(false),
		hotWater: Joi.boolean().default(false),
	}),
	nerbyColleges: Joi.array().items(Joi.string()).required(),
	nearbyCollegesDistances: Joi.array().items(Joi.number()).required(),
});

export default {
	propertyJoiSchema,
};
