import express from "express";
import {isAuthenticated} from "../controllers/registration.js";
import {getNews,sendNews} from "../controllers/news.js";
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
const image=upload.single('pic');


const router=express.Router();

router.get("/",isAuthenticated,getNews);
router.post("/",image,sendNews);
export default router;
