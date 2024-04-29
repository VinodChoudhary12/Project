import { Router } from "express";

// import { body } from "express-validator";
import { acceptrequest, checkallRequest, genRequest, workDone, MemberLogin, forgetPassword, resetPassword } from "../controllers/rescueTeam.controller.js";
const router = Router();

router.post("/Rescue/:userId", genRequest,);
router.get("/Checkall", checkallRequest);
router.get("/Accept/:userId/:resId", acceptrequest);
router.put("/Done/:resId", workDone);
router.post("/MemberLogin", MemberLogin)
router.post('/forgetPassword' / forgetPassword)
router.post('resetPassword' / resetPassword)

export default router;