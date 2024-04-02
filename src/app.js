import express from "express";
const app = express()
import userrouter from "./routes/user.routes.js";
import shelterRouter from "./routes/shelter.routes.js"

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("/public"));

app.use('/', userrouter)
app.use('/shelter', shelterRouter)



export { app }

