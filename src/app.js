import express from "express";
const app = express();
import userrouter from "./routes/user.routes.js";
import shelterRouter from "./routes/shelter.routes.js";
import adminRouter from "./routes/admin.routes.js";
import resrouter from "./routes/rescue.routes.js";
import { cors } from "cors";

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("/public"));
app.use("/", userrouter);
app.use("/shelter", shelterRouter);
app.use("/rescue", resrouter);
app.use("/admin", adminRouter);
export { app };
