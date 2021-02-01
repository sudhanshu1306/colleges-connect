import express from "express";
import User from "../models/signup.js";
import Post from "../models/post.js";

export const getNews=(req,res)=>{
  User.findOne({email:req.session.passport.user},(err,foundUser)=>{
    User.find({college:foundUser.college},(err,fo)=>{
      var arr=[];
      fo.forEach((user)=>{
        if(user.news.length!==0)
        {
          user.news.forEach((ne)=>{
            arr.push(ne);
          });
        }
      });
      console.log(arr);
      Post.find({'_id':{$in:arr}},function(err,foundPost){
        foundPost.sort((a,b)=>{
          var keyA=new Date(a.time);
          var keyB=new Date(b.time);
          if(keyA<keyB) return +1;
          if(keyA>keyB) return -1;
          return 0;
        });
      console.log(foundPost);
      User.find({},(err,allUser)=>{
        res.json({
          success:true,
          message:"We got the posts",
          posts:foundPost,
          users:allUser,
          current:foundUser
        });
      });

    });
  });
});
}
