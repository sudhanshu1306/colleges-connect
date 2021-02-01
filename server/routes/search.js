import express from "express";
import {isAuthenticated} from "../controllers/registration.js";
import {getSearch,postSearch} from "../controllers/search.js";

const router=express.Router();

router.get("/",isAuthenticated,getSearch);
router.post("/",postSearch);

export default router;
