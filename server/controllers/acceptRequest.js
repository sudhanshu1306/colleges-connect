import express from "express";
import User from "../models/signup.js";;

var id='';
export const sendAccept=(req,res)=>{
  //Searching for currently logged in user
  var name="";
  User.findOne({email:req.session.passport.user},(err,foundUser)=>{
    if(err)
    console.log(err);
    else{
      id=foundUser._id;
      //adding the accepted user to followers of user
      foundUser.follower=[req.body.id,...foundUser.follower];
      //removing the accepted request from pending list of user
      var pos=foundUser.pending.indexOf(req.body.id);
      if(pos!==-1)
      foundUser.pending.splice(pos,1);
      foundUser.save();
      name=foundUser.username;
    }
  });
  //Searching for user whose request has been accepted
  User.findById(req.body.id,(err,foundUser)=>{
    if(err)
    console.log(err)
    else{
      //adding the currentlylogged in user to following list of accepted user's profile
      foundUser.following=[id,...foundUser.following];
     User.findById(id,(err,fo)=>{
       //adding started following you to activity of logged in user
       var act=" Started following you";
       act=foundUser.username+act;
       fo.activity=[act,...foundUser.activity];
       fo.save();
     });
      //adding accepted your request to notification of user
      var not=name+" accepted your follow request";
      foundUser.notification=[not,...foundUser.notification];
      foundUser.save();
    }
  });
  res.json({
    success:true,
    message:"You have successfully accepted the follow request"
  });
}
