import express from "express";
import {getFollow,sendFollow} from "../controllers/follow.js";
import {isAuthenticated} from "../controllers/registration.js";

const router=express.Router();

router.get("/",isAuthenticated,getFollow);
router.post("/",isAuthenticated,sendFollow);

export default router;
