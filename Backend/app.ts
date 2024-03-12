import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import consola from "consola";
import Config from "./Config";
import Auth from "./Routes/Auth";
import College from "./Routes/College";
import Property from "./Routes/Property";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
	cors({
		credentials: true,
		origin: ["http://localhost:5173", "http://localhost:5000","https://65ef425af01d7e08003b1ce3--preeminent-marigold-78291b.netlify.app"],
	})
);

app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ limit: '1000mb', extended: true }));
app.use(cookieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
})

app.get("/", (req: Request, res: Response, next: NextFunction) => {
	res.send({
		data: {
			appName: "PG | Backend",
			developedBy: "Aditya Choudhury",
			maintainedBy: "Aditya Choudhury",
			version: "1.0.0.0",
		},
		success: true,
	});
});

app.get("/health", (req: Request, res: Response) => {
	return res.status(200).json({
		status: 200,
		message: "Server is up and running"
	})
});

app.use("/api/auth", Auth);
app.use("/api/college", College);
app.use("/api/property", Property);

app.use((req: Request, res: Response, next: NextFunction) => {
	res.send({
		reason: "invalid-request",
		message:
			"The endpoint you wanna reach is not available! Please check the endpoint again",
		success: false,
	});
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
	await connectToDB();
	const port = Config.PORT || 5000;
	app.listen(port, () => {
		consola.success({
			message: `Server is running at http://localhost:${port}`,
			badge: true,
		});
	});
};

startServer();
