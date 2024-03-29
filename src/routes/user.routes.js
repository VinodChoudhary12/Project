import express from "express";
import { addUsers } from "../controllers/userController.js";
const userrouter = express.Router();

userrouter.post("/", addUsers);

export default userrouter;