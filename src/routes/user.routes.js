
import { Router } from "express";
import { addUsers, userRegistraion } from "../controllers/userController.js";
const router = Router()
router.post("/a", addUsers);
router.post("/", userRegistraion)


export default router;