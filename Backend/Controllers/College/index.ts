import CollegeVal from "../../Validators/CollegeVal";
import College from "../../Models/College";
import { Request, Response, NextFunction } from "express";

const addCollege = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const collegeRequest = await CollegeVal.collegeSignupSchema.validateAsync(
			req.body
		);
		const college = new College({
			...collegeRequest,
		});
		await college.save();
		return res.status(201).json();
	} catch (err: any) {
		const errMsg = err.message || "Internal Server Error";
		return res
			.status(err.status || 500)
			.json({ message: errMsg, success: false });
	}
};

const getCollege = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(404).json();
		}

		const college = await College.findById(id);
		return res.status(200).json(college);
	} catch (err: any) {
		return res
			.status(500)
			.json({ message: "Internal Server Error!!", success: false });
	}
};

const getAllCollege = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const college = await College.find();
		return res.status(200).json(college);
	} catch (err: any) {
		return res
			.status(500)
			.json({ message: "Internal Server Error!!", success: false });
	}
};

export default {
	addCollege,
	getCollege,
	getAllCollege,
};
