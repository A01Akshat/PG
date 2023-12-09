import express from "express";
import Auth from "../../Controllers/Auth";
import College from "../../Controllers/College";

const router = express.Router();

router.post("/add", Auth.verifytoken as any, College.addCollege);
router.get("/:id", Auth.verifytoken as any, College.getCollege);
router.get("/", Auth.verifytoken as any, College.getAllCollege);

export default router;
