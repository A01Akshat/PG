import CollegeVal from "../../Validators/CollegeVal";
import College from "../../Models/College";
import { Request, Response, NextFunction } from "express";
import Fuse from "fuse.js";

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

async function searchColleges(query: string) {
	// Fetch all colleges from the database
	const allColleges = await College.find();

	// Set up Fuse options
	const fuseOptions = {
		keys: ["collegeName", "collegeAddress"], // Fields to search
		threshold: 0.4, // Adjust as needed
	};

	// Create a new Fuse instance with the colleges and options
	const fuse = new Fuse(allColleges, fuseOptions);

	// Perform the search
	const result = fuse.search(query);

	return result;
}

const searchCollege = async (req: Request, res: Response, next: NextFunction) => {
	const query = req.query.q as string; // Assuming the query parameter is named "q"
	try {
		const searchResults = await searchColleges(query);
		res.json(searchResults);
	} catch (error) {
		console.error("Error searching colleges:", error);
		res.status(500).json({ error: "Internal server error" });
	}
}

export default {
	addCollege,
	getCollege,
	getAllCollege,
	searchCollege
};
