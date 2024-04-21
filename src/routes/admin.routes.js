import { Router } from "express";
import { addemploye, deleteByEmail, updateByEmail, getAllEmployee, addTeam, deleteById, updateById } from "../controllers/admin.controller.js";

const router = Router()
//http://localhost:8000/employee/ad
router.post("/addEmployee", addemploye);
router.put("/updateByEmail", updateByEmail);
router.delete("/deleteByEmail", deleteByEmail);
router.get("/AllEmployees", getAllEmployee)
http://localhost:8000/rescue/addRescueTeam
router.post("/addRescueTeam", addTeam);
router.put("/update", updateById);
router.delete("/deleteRescueTeam", deleteById)
export default router;