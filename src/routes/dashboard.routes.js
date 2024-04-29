// dashboard.routes.js

import { Router } from "express";
import {
    getEmployeesCount,
    getDoctorsCount,
    getShelterWorkerCount,
    getShelterManagerCount,
    getReleasedAnimalsCount,
    getStayAnimalsCount,
    getTreatmentCount,
    getTreatmentInProcess,
    getTreatmentDoneByRescueTeam,
    getRescueTeamCount
} from "../controllers/dashBoard.controller.js";

const router = Router();

router.get('/employees/count', getEmployeesCount);
router.get('/doctors/count', getDoctorsCount);
router.get('/shelterWorkers/count', getShelterWorkerCount);
router.get('/shelterManagers/count', getShelterManagerCount);
router.get('/releasedAnimals/count', getReleasedAnimalsCount);
router.get('/stayAnimals/count', getStayAnimalsCount);
router.get('/treatment/count', getTreatmentCount);
router.get('/treatment/inProcess', getTreatmentInProcess);
router.get('/treatment/doneByRescueTeam', getTreatmentDoneByRescueTeam);
router.get('/rescueTeams/count', getRescueTeamCount);

export default router;
