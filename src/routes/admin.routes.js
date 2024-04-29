import { Router } from "express";
import {
    addemploye, deleteByEmail, updateByEmail, getAllEmployee, addTeam, deleteById, updateById, loginController, signupController,
    forgetPasswordController, getEmployeeById, deleteEmployeeById, editEmployeeDetails, changePassword
} from "../controllers/admin.controller.js";

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


http://localhost:8000/admin/AdminSignUp
router.post('/AdminSignUp', signupController)
http://localhost:8000/admin/AdminLogin
router.post('/AdminLogin', loginController)
router.post('/ForgotPassword', forgetPasswordController)
router.post('/ResetPasssword', changePassword)
router.post('/GetEmployeeById', getEmployeeById)
router.post('/deleteEmployeeById', deleteEmployeeById)
router.post('/editEmployeeDetails', editEmployeeDetails)

export default router;