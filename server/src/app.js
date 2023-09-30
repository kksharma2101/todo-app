import express from "express";
import "dotenv/config";
import connectToDb from "../config/db.config.js";
import router from "../routers/user.router.js";
import cors from "cors";

const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", router);

// connect database
connectToDb();

export default app;
