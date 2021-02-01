import express from "express";
import {isAuthenticated} from "../controllers/registration.js";
import {getHome} from "../controllers/follow.js";
import {postComment,postLike,postSave} from "../controllers/like.js";

const router=express.Router();

router.get("/",isAuthenticated,getHome);
router.post("/like",isAuthenticated,postLike);
router.post("/comment",isAuthenticated,postComment);
router.post("/save",isAuthenticated,postSave);

export default router;
