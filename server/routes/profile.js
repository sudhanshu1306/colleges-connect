import express from "express";
import {isAuthenticated} from "../controllers/registration.js";
import {getProfile,getFollower,getFollowing} from "../controllers/profile.js";

const router=express.Router();

router.get("/",isAuthenticated,getProfile);
router.get("/follower",isAuthenticated,getFollower);
router.get("/following",isAuthenticated,getFollowing);

export default router;
