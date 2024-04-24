
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { deleteUser, userRegistraion, GetAnimalForAdoption, requestForrescue } from "../controllers/userController.js";
const router = Router()

router.post("/", userRegistraion)
router.delete('/:id', deleteUser)
router.get("/ViwAnimalforadoption", GetAnimalForAdoption)
router.post('/requestForRescue', upload.single("avtar"), requestForrescue)


export default router;