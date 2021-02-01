import express from "express";
import multer from "multer";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    console.log(file.mimetype.substring(file.mimetype.indexOf("/")));
    var ext=file.mimetype.substring(file.mimetype.indexOf("/")+1);
    cb(null, Date.now() +"."+ ext) //Appending extension
  }
});

const upload=multer({storage:storage});
const image=upload.single('profileImage');

import {getEditProfile,sendEditProfile} from "../controllers/editProfile.js";
import {isAuthenticated} from "../controllers/registration.js";
const router=express.Router();

router.get("/",isAuthenticated,getEditProfile);
router.post("/",image,sendEditProfile);

export default router;
