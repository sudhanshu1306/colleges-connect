import express from "express";
import {getNotification,getActivity} from "../controllers/notification.js";
import {isAuthenticated} from "../controllers/registration.js";

const router=express.Router();

router.get("/notification",isAuthenticated,getNotification);
router.get("/activity",isAuthenticated,getActivity);
export default router;
