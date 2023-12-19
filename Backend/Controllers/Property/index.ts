import propertyValidator from "../../Validators/Property";
import Property from "../../Models/Property";
import { Request, Response, NextFunction } from "express";
import Favourites from "../../Models/Favourites";
interface customRequest extends Request {
	user_id: string;
	_id: string;
	username: String;
	token: String;
	email: String;
	role: String;
	verified: Boolean;
}

const addProperty = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const propertyRequest =
			await propertyValidator.propertyJoiSchema.validateAsync(req.body);

		const property = new Property({
			...propertyRequest,
		});

		await property.save();
		return res.status(201).json();
	} catch (err: any) {
		let errMsg = err.message || "Internal Server Error";
		return res.status(err.status || 500).json({
			message: errMsg,
			success: false,
		});
	}
};

const getProperty = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(404).json();
		}

		const property = await Property.findById(id).populate("nerbyColleges");
		return res.status(200).json(property);
	} catch (err: any) {
		return res
			.status(500)
			.json({ message: "Internal Server Error!!", success: false });
	}
};

const getAllProperty = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const property = await Property.find().populate("nerbyColleges");
		return res.status(200).json(property);
	} catch (err: any) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "Internal Server Error!!", success: false });
	}
};

const addFavourite = async (
	req: customRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { propertyId } = req.params;
		const existingFavourite = await Favourites.findOne({
			userId: req._id,
			propertyId: propertyId,
		});
		if (!existingFavourite) {
			const favourite = new Favourites({
				userId: req._id,
				propertyId: propertyId,
			});
			await favourite.save();
		}

		res.status(201).json();
	} catch (err: any) {
		return res
			.status(500)
			.json({ message: "Internal Server Error", success: false });
	}
};

const getFavourite = async (
	req: customRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const favourites = await Favourites.find({ userId: req._id }).populate(
			"propertyId"
		);
		return res.status(200).json(favourites);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "Internal Server Error",
			success: false,
		});
	}
};


const getDashboardProperty = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		// Extract page number and records per page from query parameters
		const page = parseInt(req.query.page as string) || 1;
		const perPage = parseInt(req.query.perPage as string) || 10;

		// Calculate the skip value based on the page number and records per page
		const skip = (page - 1) * perPage;

		// Query the database with pagination if page is specified, otherwise get all records
		const query = Property.find()
			.select("name rent rooms nearbyColleges nearbyCollegesDistances")
			.populate({
				path: "nerbyColleges",
				select: "-_id collegeName"
			});

		const properties = page ? await query.skip(skip).limit(perPage) : await query;
		const totalCount = await Property.countDocuments();
		const totalPages = Math.ceil(totalCount / perPage);

		return res.status(200).json({ properties, totalPages, currentPage: page, perPage, totalCount });
	} catch (err: any) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "Internal Server Error!!", success: false });
	}
};



const controllers = {
	addProperty,
	getProperty,
	getAllProperty,
	addFavourite,
	getFavourite,
	getDashboardProperty,
};

export default controllers;
