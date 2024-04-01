
import { Router } from "express";
import { deleteUser, userRegistraion, GetAnimalForAdoption } from "../controllers/userController.js";
const router = Router()

router.post("/", userRegistraion)
router.delete('/:id', deleteUser)
router.get("/adoption", GetAnimalForAdoption)


export default router;