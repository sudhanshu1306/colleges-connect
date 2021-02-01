import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";

import User from "../models/signup.js";



const app=express();


//Setting up nodemailer
var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: process.env.Node_Email,
        pass: process.env.Node_Pass
    }
});

//get method for regsitration route
export const getRegistration=(req,res)=>{
  User.find({},(err,foundUsers)=>{
    res.json({
      success:true,
      message:"Welcome to registrationRoute",
      users:foundUsers
    });
  });
}

//otp generation
var details=null,otp='',password=null;
var digits='0123456789';
for(let i=0;i<6;i++)
{
  otp+=digits[Math.floor(Math.random()*10)];
}


// post method for registration route
export const createUser= (req,res)=>{
   //details sent from form in registration route stored in JSON
   details={
     username:req.body.username,
     fullName:req.body.fullName,
     email:req.body.email,
     phone:req.body.phone,
     college:req.body.college
   }
   console.log(otp);
   console.log(details);
   // console.log(req.body);
   password=req.body.password;
   //sending mail with an otp to user
   const mailOptions = {
   from: process.env.Node_Email, // sender address
   to: req.body.email, // list of receivers
   subject: 'OTP verification for College Connect', // Subject line
   text: 'Hi there,'+otp+' is your Signup OTP for College-Connect '    // plain text body
 };
 transporter.sendMail(mailOptions, function (err, info) {
    if(err)
    {  console.log(err);
      res.json({
        success:false,
        message:err
    });}
    else
    {
      // console.log(info);
    res.json({
      success:true,
      message:"OTP sent"
    });}
 });

}

//get method for verification route
export const verify=(req,res)=>{
  res.json({
    success:true,
    message:"Enter OTP"
  });
}



//post method for verification route
export const verifyUser=(req,res)=>{
  const enteredOTP=req.body.otp;
  if(enteredOTP==otp)
  {
    User.register(details,password,function(err,user){
      if(err)
      {
        console.log(err);
        res.json({
          success:false,
          message:"Something went wrong"
        });
      }
      else{
         console.log("Successfull");
         res.json({
           success:true,
           message:"Successfully registered"
         });

      }
    });

  }
  else
  {
    console.log("error while signing in ");
    res.json({
      success:false,
      message:"Incorrect OTP"
    })
  }
}



//method to check whether user is authenticated to see the page
export const isAuthenticated=(req,res,next)=>{
  if(req.isAuthenticated())
    next();
  else{
    // console.log("Not logged in");
    res.json({
      success:false,
      message:"User not logged in"
    });
  }
}
