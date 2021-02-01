import express from "express";
import User from "../models/signup.js";

var user=[];
export const getBroadcast=(req,res)=>{
  User.findOne({email:req.session.passport.user},(err,foundUser)=>{
    user=foundUser;
    res.json({
      success:true,
      message:"Welcome to broadcast section",
      user:user
    });
  });
}

export const sendBroadcast=(req,res)=>{
  let college=req.body.college,year=req.body.year,dept=req.body.department;
  if(college==="All")
  {
    User.find({},(err,foundUsers)=>{
      foundUsers.forEach((fu)=>{
        User.findById(fu._id,(err,us)=>{
          var message=user.username+" broadcasted a message :- "+req.body.content+" for everyone";
          us.notification=[message,...us.notification];
          us.save();
        });
      });
      res.json({
        success:true,
        message:"Successfully broadcasted a message"
      });
    });
  }
  else if(dept==="All"){
    User.find({'college':college},(err,foundUsers)=>{
      foundUsers.forEach((fu)=>{
        User.findById(fu._id,(err,us)=>{
          var message=user.username+" broadcasted a message :- "+req.body.content+" for "+college+" students";
          us.notification=[message,...us.notification];
          us.save();
        });
      });
      res.json({
        success:true,
        message:"Successfully broadcasted a message"
      });
    });
  }
  else if(year==="All"){
    User.find({$and:[{'college':college},{'department':dept}]},(err,foundUsers)=>{
      foundUsers.forEach((fu)=>{
        User.findById(fu._id,(err,us)=>{
          var message=user.username+" broadcasted a message :- "+req.body.content+" for "+college+" "+dept+" students";
          us.notification=[message,...us.notification];
          us.save();
        });
      });
      res.json({
        success:true,
        message:"Successfully broadcasted a message"
      });
    });
  }
  else{
    User.find({$and:[{'college':college},{'department':dept},{'year':year}]},(err,foundUsers)=>{
      foundUsers.forEach((fu)=>{
        User.findById(fu._id,(err,us)=>{
          var message=user.username+" broadcasted a message :- "+req.body.content+" for "+college+" "+dept+" "+year+" year students";
          us.notification=[message,...us.notification];
          us.save();
        });
      });
      res.json({
        success:true,
        message:"Successfully broadcasted a message"
      });
    });
  }

}
