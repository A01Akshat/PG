import express from "express";
import Auth from "../../Controllers/Auth";
import Property from "../../Controllers/Property";
const router = express.Router();
router.post("/add", Auth.verifytoken as any, Property.addProperty as any);
router.post("/interested", Property.interestedPut);
router.get("/", Property.getAllProperty);
router.get("/:id", Property.getProperty);
router.get("/get/dashboard", Property.getDashboardProperty);
router.get("/get/favourite", Auth.verifytoken as any, Property.getFavourite as any);
router.post(
	"/favourite/add/:propertyId",
	Auth.verifytoken as any,
	Property.addFavourite as any
);

router.get("/get/search", Property.propertySearch);
router.get("/get/interested/:id?", Auth.verifytoken as any, Property.interestedGet as any);

router.put("/update/db", Property.updateDb);
export default router;
