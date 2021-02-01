import express from "express";
import User from "../models/signup.js";

var id="";
export const getEditProfile=(req,res)=>{
  User.findOne({email:req.session.passport.user},(err,foundUser)=>{
    if(err){
      console.log(err);
    }else{
      id=foundUser._id;
      res.json({
        success:true,
        message:"Edit-profile-section",
        user:foundUser
      });
    }
  });
}

export const sendEditProfile=(req,res)=>{
  User.findById(id,(err,foundUser)=>{
    if(err){
      console.log(err);
    }
    else{
      foundUser.fullName=req.body.fullName;
      foundUser.phone=req.body.phone;
      console.log(req.file);
      if(req.file!=null){
      foundUser.profileImage=req.file.path;}
      foundUser.gender=req.body.gender;
      foundUser.bio=req.body.bio;
      foundUser.department=req.body.department;
      foundUser.year=req.body.year;
      foundUser.save();
    }
  });
  res.json({
    success:true,
    message:"Edited profile successfully"
  });
}
