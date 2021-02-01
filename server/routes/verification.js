import express from "express";
import {verify,verifyUser} from "../controllers/registration.js";

const router=express.Router();

router.get("/",verify);
router.post("/",verifyUser);

export default router;
