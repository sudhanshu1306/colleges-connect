import express from "express";
import {isAuthenticated} from "../controllers/registration.js";
import {sendAccept} from "../controllers/acceptRequest.js";

const router=express.Router();

router.post("/",isAuthenticated,sendAccept);
export default router;
