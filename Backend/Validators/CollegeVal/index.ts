import Joi from "joi";

const collegeSignupSchema = Joi.object({
	collegeName: Joi.string().required(),
	collegeAddress: Joi.string().required(),
});

export default {
	collegeSignupSchema,
};
