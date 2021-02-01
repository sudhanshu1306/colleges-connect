import express from "express";
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";

import User from "../models/signup.js";

export const getLogin=(req,res)=>{
  res.json({
    success:true,
    message:"welcome to login page"
  });
}
export const signin=(req,res)=>{

  const user=new User({
    email:req.body.email,
    password:req.body.password
  });
  // console.log(req.body.email);
  req.login(user,function(err){
    if(err){
      console.log(err);
    }
    else{
      passport.authenticate("local")(req,res,function(){
        // res.redirect("/home")
        res.json({
          success:true,
          message:"Successfully logged in"
        });
      });
    }
  })
}
