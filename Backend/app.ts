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
		origin: ["https://frontend.unknownclub.me", "http://localhost:5173"],
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
	res.send({
		data: {
			appName: "Get-Me-Through",
			developedBy: "Aditya Choudhury",
			maintainedBy: "Aditya Choudhury",
			version: "1.0.0.0",
		},
		success: true,
	});
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
