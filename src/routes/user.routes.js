
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { deleteUser, userRegistraion, GetAnimalForAdoption, requestForrescue, updateProfile, userLogin } from "../controllers/userController.js";
const router = Router()

router.post("/", userRegistraion)
router.delete('/:id', deleteUser)
router.get("/ViwAnimalforadoption", GetAnimalForAdoption)
// router.post('/requestForRescue', upload.single("avtar"), requestForrescue)
router.post('/requestForRescue', upload.single('avtar'), requestForrescue)

router.post('/updateProfile', updateProfile)
router.post('/userLogin', userLogin)


export default router;