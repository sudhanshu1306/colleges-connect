import express from "express";
import Post from "../models/post.js";
import User from "../models/signup.js";

var user="";
var getTimeString = function(input, separator) {
    var pad = function(input) {return input < 10 ? "0" + input : input;};
    var pad2=function(input){
      if(input<10)
      return "00"+input;
      else if(input<100)
        return "0"+input;
      else
         return input;
    }
    var date = input ? new Date(input) : new Date();
    var value = date.getFullYear()+"-"+pad(date.getMonth()+1)+"-"+pad(date.getDate())+"T"+pad(date.getHours())+":"+pad(date.getMinutes())+":"+pad(date.getSeconds())+"."+pad2(date.getMilliseconds());
    return value;

}

export const getNews=(req,res)=>{
      User.findOne({email:req.session.passport.user},function(err,foundUser){
        if(err)
        {
          console.log(err);
          res.json({
            success:false,
            message:"Not found",
          });
        }
        else{
          user=foundUser;
          // res.render("post",{user:user.username});
          res.json({
            success:true,
            message:"Welcome to news Update Section",
            user:user.username
          });
        }
      });
}

export const sendNews=(req,res)=>{
      const post=new Post({
        user:user,
        pic:req.file.path,
        category:req.body.category,
        caption:req.body.caption,
        time:getTimeString(),
      });
      post.save();
      user.news=[post,...user.news];
      User.findById(user._id,function(err,foundUser){
        if(err){
          console.log(err);
        }
        else{
          foundUser.news=user.news;
          foundUser.save();
        }
      });
      // res.send("Successfully posted a pic by "+post.user.username+" at "+post.time);
      res.json({
        success:true,
        message:"Successfully posted a news by "+post.user.username+" at "+post.time
      });
}
