import express from "express";
import {isAuthenticated } from "../controllers/registration.js";
import {getBroadcast,sendBroadcast} from "../controllers/broadcast.js";

const router=express.Router();

router.get("/",isAuthenticated,getBroadcast);
router.post("/",sendBroadcast);

export default router;
