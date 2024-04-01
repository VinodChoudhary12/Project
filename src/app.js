import express from "express";
const app = express()
import userrouter from "./routes/user.routes.js";


app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("/public"));

app.use('/', userrouter)


export { app }

