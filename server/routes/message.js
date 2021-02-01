import express from "express";
import {isAuthenticated} from "../controllers/registration.js";
import {getMessage,postMessage} from "../controllers/message.js";

const router=express.Router();
router.get("/",isAuthenticated,getMessage);
router.post("/",postMessage);

export default router;
