import express from "express";
import User from "../models/signup.js";
import Post from "../models/post.js";
import Comment from "../models/comment.js";


var user=""
export const postLike=(req,res)=>{
  Post.findById(req.body.id,function(err,post){
    if(err)
    console.log(err);
    else
    {
      User.findOne({email:req.session.passport.user},(err,foundUser)=>{
        User.findById(post.user,(err,fo)=>{

          if(!req.body.isLiked && post.like.indexOf(foundUser._id)==-1){

            foundUser.activity=["You liked a post by "+fo.username,...foundUser.activity];
            fo.notification=[foundUser.username+" liked your post",...fo.notification];
            foundUser.save();
            if(!fo._id.equals(foundUser._id)){
            fo.save();}
          post.like=[foundUser._id,...post.like];
          post.save();
          res.json({
            success:true,
            message:"Liked this pic"
          });}
          else{
            var pos=post.like.indexOf(foundUser._id);
            post.like.splice(pos,1);
            post.save();
            res.json({
              success:true,
              message:"disliked this pic"
            });
          }
        });

      });
    }
  });
}

export const postComment=(req,res)=>{
  console.log(req.body.id);
  Post.findById(req.body.id,function(err,foundPost){
    if(err)
    console.log(err);
    else
    {
      User.findOne({email:req.session.passport.user},(err,foundUser)=>{
        User.findById(post.user,(err,fo)=>{
          foundUser.activity=["You commented on a post by "+fo.username,...foundUser.activity];
          fo.notification=[foundUser.username+" commented on your post",...fo.notification];
          foundUser.save();
          fo.save();
        var comment=new Comment({
          user:foundUser,
          post:foundPost,
          body:req.body.comment
        });
        comment.save();
        foundPost.comment=[comment,...foundPost.comment];
        foundPost.save();
        res.json({
          success:true,
          message:"Comment done on this pic"
        });
      });
    });
    }
  });
}

export const postSave=(req,res)=>{
  User.findOne({email:req.session.passport.user},(err,foundUser)=>{
    if(foundUser.savedPost.indexOf(req.body.id)==-1){
      foundUser.savedPost=[req.body.id,...foundUser.savedPost];
      foundUser.save();
    }
    res.json({
      success:true,
      message:"Post saved successfully"
    });
  });
}
