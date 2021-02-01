import express from "express";

import {getRegistration,createUser} from "../controllers/registration.js";


const router=express.Router();
router.get("/",getRegistration);
router.post("/",createUser);

export default router;
