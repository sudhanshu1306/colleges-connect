import express from "express";
import User from "../models/signup.js";
import Message from "../models/message.js";


var loggedIn="",sentBy="";
export const getMessage=(req,res)=>{
  User.findOne({email:req.session.passport.user},(err,foundUser)=>{
    if(err)
    console.log(err);
    else{
      loggedIn=foundUser._id;
      sentBy=foundUser;
      User.find({'_id':{$in:foundUser.following}},(err,Messages)=>{
        // res.render('messages',{Messages:Messages});
        res.json({
          success:true,
          message:"Users whom current user has sent message",
          Messages:Messages
        });
      });
    }
  });
}


export const postMessage=(req,res)=>{
     const chatWith=req.body.chatWith;
     User.findById(chatWith,(err,foundUser)=>{
       Message.find({
         $or:[
           {$and:[{from:loggedIn},{to:chatWith}]},
           {$and:[{from:chatWith},{to:loggedIn}]}
       ]}).sort({createdAt:1}).exec((err,messages)=>{
         console.log(messages);
         // res.render('chat',{from:sentBy,to:foundUser,messages:JSON.stringify(Object.assign({},messages))});
         res.json({
           success:true,
           message:"Chat between the two users",
           from:sentBy,
           to:foundUser,
           messages:JSON.stringify(Object.assign({},messages))
         });
       });
     });
}
