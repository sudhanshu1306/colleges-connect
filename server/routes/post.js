import express from "express";
import multer from "multer";
const upload=multer({dest:'uploads/'});
const image=upload.single('pic');

import {getPostPic,sendPostPic} from "../controllers/post.js";
import {isAuthenticated} from "../controllers/registration.js";
const router=express.Router();

router.get("/",isAuthenticated,getPostPic);
router.post("/",image,sendPostPic);
export default router;
