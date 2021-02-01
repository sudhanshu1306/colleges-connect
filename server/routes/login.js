import express from "express";
import {getLogin,signin} from "../controllers/login.js";

const router=express.Router();

router.get("/",getLogin);
router.post("/",signin);

export default router;
