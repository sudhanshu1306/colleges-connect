import express from "express";
import {isAuthenticated} from "../controllers/registration.js";
import {getNews} from "../controllers/college.js";

const router=express.Router();

router.get("/",isAuthenticated,getNews);

export default router;
