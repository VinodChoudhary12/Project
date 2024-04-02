
import { Router } from "express";
import { deleteUser, userRegistraion, GetAnimalForAdoption, requestForrescue } from "../controllers/userController.js";
const router = Router()

router.post("/", userRegistraion)
router.delete('/:id', deleteUser)
router.get("/ViwAnimalforadoption", GetAnimalForAdoption)
router.post('/requestForRescue', requestForrescue)


export default router;