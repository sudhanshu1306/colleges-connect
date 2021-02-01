import express from "express";
import User from "../models/signup.js";
import Post from "../models/post.js";

var user=[];
export const getSearch=(req,res)=>{
  User.findOne({email:req.session.passport.user},(err,foundUser)=>{
    user=foundUser;
  User.find({},(err,users)=>{
    res.json({
      success:true,
      message:"Welcome to search section",
      users:users
    });
  });
});
}

export const postSearch=(req,res)=>{
  User.findOne({email:user.email},(err,fo)=>{
    User.findById(req.body.id,(err,foundUser)=>{
      Post.find({'_id':{$in:foundUser.post}},function(err,posts){
        if(err)
        console.log(err);
        else{
        // console.log(posts);
        // res.render("profile",{user:foundUser,posts:posts});
        posts.sort((a,b)=>{
          var keyA=new Date(a.time);
          var keyB=new Date(b.time);
          if(keyA<keyB) return +1;
          if(keyA>keyB) return -1;
          return 0;
        });

      res.json({
        success:true,
        message:"successfully searched the user",
        user:foundUser,
        post:posts,
        current:fo
      });
    }
  });
    });
  });

}
