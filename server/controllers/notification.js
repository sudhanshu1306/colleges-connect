import express from "express";
import User from "../models/signup.js";

var user=[];
export const getNotification=(req,res)=>{
  User.findOne({email:req.session.passport.user},(err,foundUser)=>{
    user=foundUser;
    res.json({
      success:true,
      message:"Notification section",
      notification:user.notification,
      pic:user.profileImage
    });
  });

}

export const getActivity=(req,res)=>{
  User.findOne({email:req.session.passport.user},(err,foundUser)=>{
    user=foundUser;
    res.json({
      success:true,
      message:"Notification section",
      notification:user.activity,
      pic:user.profileImage
    });
  });
}
