import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import Users from "../../Models/Users";

interface customRequest extends Request {
	user_id: string;
	_id: string;
	username: String;
	token: String;
	email: String;
	role: String;
	verified: Boolean;
}

const signupSchema = Joi.object({
	name: Joi.string().required().min(1),
	email: Joi.string().required(),
	username: Joi.string().required(),
	password: Joi.string()
		.pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*()_]{3,30}$"))
		.min(8)
		.required(),
	mobile: Joi.number().min(10).required(),
});

const loginSchema = Joi.object({
	// name: Joi.string().required().min(1),
	// email: Joi.string().email().required(),
	username: Joi.string().required(),
	password: Joi.string()
		.pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*()_]{3,30}$"))
		.min(8)
		.required(),
});

const signupValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const signupRequest = await signupSchema.validateAsync(req.body);
		next();
	} catch (err: any) {
		return res.status(err.status || 403).json({
			message: err.message || "An error occurred",
			success: false,
		});
	}
};

const validateEmail = async (email: string) => {
	const user = await Users.findOne({ email: email }).select("email");
	return user ? true : false;
};

const validateUsername = async (username: String) => {
	const user = await Users.findOne({ username: username }).select("username");
	return user ? true : false;
};

const verification = async (
	req: customRequest,
	res: Response,
	next: NextFunction
) => {
	if (req.verified) {
		return res.status(200).json({
			reason: "verified",
			message: "user already verified",
			success: false,
		});
	} else {
		next();
	}
};
const isOTP = (req: customRequest, res: Response, next: NextFunction) => {
	if (req.body.otp) {
		next();
	} else {
		return res.status(200).json({
			reason: "no-OTP",
			message: "no OTP was provided! Enter otp and try again!",
			success: false,
		});
	}
};

const isAdmin = (req: customRequest, res: Response, next: NextFunction) => {
	if (req.role === "admin") {
		next();
	} else {
		return res.status(401).json({
			success: false,
			message: "Unauthorized",
			reason: "Need elevated permission to access this API! If this is a mistake please contact the administrator!!"
		})
	}
}

export default {
	signupValidator,
	validateEmail,
	validateUsername,
	loginSchema,
	verification,
	isOTP,
	isAdmin
};
