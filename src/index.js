import express from "express";
const app = express()
import userrouter from "./routes/user.routes.js";

import connectDB from "./db/db.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

connectDB().then(
    app.listen(800)
).catch(err => console.log("Connection faailed", err))
app.use("/", userrouter)

