import express from "express";
import Auth from "../../Controllers/Auth";
import Property from "../../Controllers/Property";
const router = express.Router();
router.post("/add", Auth.verifytoken as any, Property.addProperty);
router.get("/:id", Auth.verifytoken as any, Property.getProperty);
router.get("/", Auth.verifytoken as any, Property.getAllProperty);
router.post("/favourite", Auth.verifytoken as any,Property.getFavourite as any);

router.post(
	"/favourite/add/:propertyId",
	Auth.verifytoken as any,
	Property.addFavourite as any
);
export default router;
