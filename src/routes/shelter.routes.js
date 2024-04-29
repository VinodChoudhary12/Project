import { Router } from "express";
import {
    addAnimal, getAllAnimal, getRescuedAnimal, signup, login, forgetPassword, changePassword, getAnimalByid,
    getAnimalByName, getAnimalByBreed, getAnimalByType, getAnimalRescueRequestsByRescueTeam, getAnimalRescueRequestsByStatus, getAllAnimalRescueRequests, editAnimal
} from '../controllers/shelter.controller.js'

const router = Router()

router.post('/addAnimal', addAnimal)
router.get('/AllAnimal', getAllAnimal)
router.get('/RescuedAnimal', getRescuedAnimal)
router.get('/signup', signup)
router.post('/login', login)
router.post('/forgetPassword', forgetPassword)
router.post('/changePassword', changePassword)
router.get('/animals/:id', getAnimalByid);
router.post('/animals/name', getAnimalByName);
router.post('/animals/breed', getAnimalByBreed);
router.post('/animals/type', getAnimalByType);
router.post('/getAnimalRescueRequestsByRescueTeam', getAnimalRescueRequestsByRescueTeam)
router.get('/getAllAnimalRescueRequests', getAllAnimalRescueRequests)
router.post('/getAnimalRescueRequestsByStatus', getAnimalRescueRequestsByStatus)
router.post('/editAnimal', editAnimal)
export default router;