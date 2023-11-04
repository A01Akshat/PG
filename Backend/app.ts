import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import consola from "consola";
import Config from "./Config";
const app = express();
app.get("/", (req: Request, res: Response, next: NextFunction) => {
	res.send({
		name: "Aditya Choudhury",
	});
	next();
});

async function connectToDB() {
	try {
		await mongoose.connect(Config.DB, {
			serverSelectionTimeoutMS: Config.REQUEST_TIMEOUT,
			writeConcern: { w: "majority" },
		});
		consola.success({
			message: `Suceessfully connected to the DB`,
			badge: true,
		});
	} catch (err) {
		console.error({
			message: `Error connecting to the DB ${err}`,
			badge: true,
		});
		await connectToDB();
	}
}

const startServer = async () => {
	// await connectToDB();
	const port = Config.PORT || 5000;
	app.listen(port, () => {
		consola.success({
			message: `Server is running at http://localhost:${port}`,
			badge: true,
		});
	});
};

startServer();
