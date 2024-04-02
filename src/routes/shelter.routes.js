import { Router } from "express";
import { addAnimal, getAllAnimal, getRescuedAnimal } from '../controllers/shelter.controller.js'

const router = Router()

router.post('/addAnimal', addAnimal)
router.get('/AllAnimal', getAllAnimal)
router.get('/RescuedAnimal', getRescuedAnimal)

export default router;