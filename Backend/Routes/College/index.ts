import express from "express";
import Auth from "../../Controllers/Auth";
import College from "../../Controllers/College";

const router = express.Router();

router.post("/add", Auth.verifytoken as any, College.addCollege);
router.get("/:id", College.getCollege);
router.get("/", College.getAllCollege);

export default router;
