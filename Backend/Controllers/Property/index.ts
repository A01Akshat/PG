import propertyValidator from "../../Validators/Property";
import Property from "../../Models/Property";
import College from "../../Models/College";
import { Request, Response, NextFunction } from "express";
import Favourites from "../../Models/Favourites";
import mongoose from "mongoose";
import InterestedProperty from "../../Models/InterestedProperty";
import { faker } from "@faker-js/faker"
import Ratings from "../../Models/Ratings";
import AvgRatings from "../../Models/AvgRatings";
import Reviews from "../../Models/Reviews";
interface customRequest extends Request {
	user_id: string;
	_id: string;
	username: String;
	token: String;
	email: String;
	role: String;
	verified: Boolean;
}

const addProperty = async (req: customRequest, res: Response, next: NextFunction) => {
	try {
		const propertyRequest =
			await propertyValidator.propertyJoiSchema.validateAsync(req.body);

		const property = new Property({
			...propertyRequest,
			owner: req._id
		});

		const rating = new AvgRatings({
			propertyId: property._id,
			rating: 0
		});

		property.rating = rating._id;
		await property.save();
		await rating.save();
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

		const property = await Property.findById(id).populate("nerbyColleges rating");
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
		const property = await Property.find().populate("nerbyColleges rating");
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
		const favourites = await Favourites.find({ userId: req._id })
			.populate("propertyId")
			.populate({
				path: "propertyId",
				populate: {
					path: "nerbyColleges",
					model: "Colleges",
				},
			}).populate({
				path: "propertyId",
				populate: {
					path: "rating",
					model: "AvgRatings"
				}
			});
		return res.status(200).json(favourites);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "Internal Server Error",
			success: false,
		});
	}
};

const removeFavourite = async (
	req: customRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { propertyId } = req.params;
		const deleted = await Favourites.findOneAndDelete({ propertyId: propertyId, userId: req._id });
		return res.status(200).json();
	} catch (err) {
		return res.status(500).json(err);
	}
}

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
				path: "nerbyColleges rating",
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


const propertySearch = async (req: Request, res: Response, next: NextFunction) => {
	try {
		// Define filters based on query parameters
		const filters: any = {};

		if (typeof req.query.city === 'string') {
			filters['address'] = { $regex: new RegExp(req.query.city, 'i') };
		}

		if (req.query.minPrice || req.query.maxPrice) {
			filters['rent'] = {};
			if (typeof req.query.minPrice === 'string') filters['rent'].$gte = parseInt(req.query.minPrice, 10);
			if (typeof req.query.maxPrice === 'string') filters['rent'].$lte = parseInt(req.query.maxPrice, 10);
		}

		if (typeof req.query.minRooms === 'string') {
			filters['rooms'] = { $gte: parseInt(req.query.minRooms, 10) };
		}

		if (typeof req.query.furnished === 'string') {
			filters['furnished'] = req.query.furnished;
		}

		if (typeof req.query.nearbyCollege === 'string') {
			const colleges = await College.find({ collegeName: req.query.nearbyCollege });
			console.log(colleges);
			if (colleges.length > 0) {
				filters['nerbyColleges'] = { $in: colleges.map(college => college._id) };
				// You may want to add a geospatial query for distance, depending on your data model.
			} else {
				return res.status(404).json({ success: false, message: 'No matching colleges found.' });
			}
		}

		// Pagination parameters
		const page = parseInt(req.query.page as string, 10) || 1;
		const pageSize = parseInt(req.query.pageSize as string, 10) || 100;

		// Create separate queries for results and count
		const queryResults = Property.find(filters).populate("nerbyColleges rating").skip((page - 1) * pageSize).limit(pageSize);
		const totalCount = await Property.countDocuments(filters);

		// Calculate total pages for pagination info
		const totalPages = Math.ceil(totalCount / pageSize);

		// Add pagination metadata to the response
		const metadata: any = { currentPage: page, perPage: pageSize, totalPages };
		if (page > 1) metadata.prevPage = page - 1;
		if (page < totalPages) metadata.nextPage = page + 1;

		// Execute the property search query with pagination
		const results = await queryResults;

		res.status(200).json({ success: true, results, metadata });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, error: 'Internal Server Error' });
	}
};

const interestedGet = async (req: customRequest, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		let properties
		if (id) {
			properties = await Property.find({ owner: req._id, _id: id }).select("_id");
		} else {
			properties = await Property.find({ owner: req._id }).select("_id");
		}
		const interested = await InterestedProperty.find({ propertyId: { $in: properties } }).populate("propertyId", "name address");
		res.json(interested);
	} catch (error) {
		return res.status(500).json({
			reason: "server",
			message: "Internal Server Error",
			success: false,
		});
	}
};

const interestedPut = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const interestedData = await propertyValidator.interestedPropertySchema.validateAsync(req.body);
		const interested = new InterestedProperty({
			...interestedData,
		});
		await interested.save();
		return res.status(201).json();

	} catch (e: any) {
		let errorMsg = "Internal Server Error";
		if (e.isJoi === true) {
			e.status = 403;
			errorMsg = e.message;
		}
		return res.status(e.status || 500).json({
			reason: "server",
			message: errorMsg,
			success: false,
		});
	}
};

const updateDb = async (req: Request, res: Response, next: NextFunction) => {
	// try {
	// 	// You can set the owner field to a specific value or use any logic to determine its value
	// 	const ownerValue = '654b53c2db93916cf4aaafb7';

	// 	// Update all documents that don't have the owner field
	// 	const result = await Property.updateMany(
	// 		{ owner: { $exists: false } },
	// 		{ $set: { owner: ownerValue } }
	// 	);

	// 	res.json({ success: true, message: `${result} records updated successfully.` });
	// } catch (error) {
	// 	console.error('Error updating records:', error);
	// 	res.status(500).json({ success: false, message: 'Internal server error' });
	// }

	// try {
	// 	// Find all properties in the database
	// 	const properties = await Property.find();

	// 	// Loop through each property
	// 	for (const property of properties) {
	// 		// Update the property with the new schema changes and random data
	// 		enum furnish { "Furnished", "Semi Furnished", "Non Furnished" }
	// 		enum bathroom { "Attached", "Common" }
	// 		enum facilities { true, false }
	// 		property.furnished = furnish[faker.helpers.enumValue(furnish)] as any;
	// 		property.bathroom = bathroom[faker.helpers.enumValue(bathroom)] as any;
	// 		if (property.facilities) {
	// 			property.facilities.powerBackup = facilities[faker.helpers.enumValue(facilities)] as any;
	// 		}


	// 		// Save the updated property
	// 		await property.save();
	// 	}

	// 	console.log("Properties updated successfully");
	// 	return res.json();
	// } catch (error) {
	// 	console.error("Error updating properties:", error);
	// 	return res.status(500).json("Internal Server Error");
	// }


	try {
		const properties = await Property.find();
		for (const property of properties) {
			const rating = new AvgRatings({
				propertyId: property._id,
				rating: 0
			});

			await rating.save();
			property.rating = rating._id;
			await property.save();
		}
		return res.status(200).json();
	} catch (err) {
		return res.status(500).json();
	}

}

const getUserProperties = async (req: customRequest, res: Response, next: NextFunction) => {
	const owner = req._id;
	try {
		const properties = await Property.find({ owner: owner }).populate("nerbyColleges rating");
		return res.status(200).json(properties);
	} catch (err) {
		return res.status(500).json({ message: "Internal Server Error!!" });
	}
}

const addRatings = async (req: customRequest, res: Response, next: NextFunction) => {
	try {
		const { propertyId, rating } = req.body;
		const { _id } = req;
		if (!propertyId) {
			return res.status(404).json({ message: "No Property Id found", success: false });
		}
		const isExisting = await Ratings.findOne({ propertyId: propertyId, userid: _id });
		if (isExisting) {
			isExisting.rating = rating;
			await isExisting.save();
		} else {
			const ratings = new Ratings({
				userid: _id,
				propertyId: propertyId,
				rating: rating
			});
			await ratings.save();
		}

		const allRatings: any = await Ratings.find({ propertyId: propertyId });
		let sum = 0, count = 0;
		for (let i = 0; i < allRatings.length; i++) {
			sum += allRatings[i].rating;
			count++;
		}

		const avg = sum / count;
		const avgRating = await AvgRatings.findOne({ propertyId: propertyId });
		if (avgRating) {
			avgRating.rating = avg;
			await avgRating.save();
		}

		return res.status(200).json();
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "Internal server Error",
			reason: "Server/Database",
			problem: err
		});
	}
}

const getUserRating = async (req: customRequest, res: Response, next: NextFunction) => {
	try {
		const { propertyId } = req.params;
		const { _id } = req;
		const rating = await Ratings.findOne({ propertyId: propertyId, userid: _id });
		if (rating) {
			return res.status(200).json(rating);
		} else {
			return res.status(404).json();
		}
	} catch (err) {

	}
}


const addUserReview = async (req: customRequest, res: Response, next: NextFunction) => {
	try {
		const { _id } = req;
		const { review } = req.body;
		const { id } = req.params;
		if (!review) {
			return res.status(404).json({ message: "Please write something to add a review" });
		}

		const userRating = await Ratings.findOne({ propertyId: id, userid: _id });
		if (!userRating) {
			return res.status(404).json({ message: "Please first add a rating then try adding a review!!" });
		}

		const existingProperty = await Reviews.findOne({
			userid: _id,
			propertyId: id
		});
		if (existingProperty) {
			existingProperty.review = review;
			await existingProperty.save();
		} else {
			const propertyReview = new Reviews({
				userid: _id,
				propertyId: id,
				rating: userRating._id,
				review: review
			});
			await propertyReview.save();
		}
		return res.status(200).json();
	} catch (err) {
		console.log(err);
		return res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}


const getUserReview = async (req: customRequest, res: Response, next: NextFunction) => {
	try {
		const { propertyId } = req.params;
		const userReview = await Reviews.findOne({
			userid: req._id,
			propertyId: propertyId
		}).populate("rating");
		if (!userReview) {
			return res.status(404).json();
		}
		return res.status(200).json(userReview);
	} catch (err) {
		return res.status(500).json();
	}
}

const getPropertyReview = async (req: customRequest, res: Response, next: NextFunction) => {
	try {
		const { propertyId } = req.params;
		const propertyReview = await Reviews.find({
			propertyId: propertyId
		}).populate({
			path: "userid",
			select: "name" // Select only the name field from the User model
		}).populate("rating");;
		return res.status(200).json(propertyReview);
	} catch (err) {
		return res.status(500).json();
	}
}


const controllers = {
	addProperty,
	getProperty,
	getAllProperty,
	addFavourite,
	getFavourite,
	removeFavourite,
	getDashboardProperty,
	propertySearch,
	interestedPut,
	interestedGet,
	updateDb,
	getUserProperties,
	addRatings,
	getUserRating,
	addUserReview,
	getUserReview,
	getPropertyReview
};

export default controllers;
