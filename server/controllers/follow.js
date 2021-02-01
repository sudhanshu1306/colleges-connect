import express from "express";
import User from "../models/signup.js";
import Post from "../models/post.js";


var user="";
let pending=[];

// showing the pending requests of logged in user
export const getFollow=(req,res)=>{
  User.findOne({email:req.session.passport.user},(err,foundUser)=>{

    if(err)
    console.log(err);
    else{
      user=foundUser;
        pending=foundUser.pending;
        //Searching for details of user whose id is stored in pending array of logges in user
         User.find({
           '_id':{$in : pending}
         },
         function(err,users){
           if(err){
             console.log(err);
           }
           else{
             console.log(users);
             // res.render("pending",{Users:users});
             res.json({
               success:true,
               message:"Pending follows",
               Users:users
             });
           }
         }
       );
    }
  });


}

// send follow request to a user
export const sendFollow=(req,res)=>{
  User.findById(req.body.id,(err,foundUser)=>{
    if(err)
    console.log(err);
    else{
      console.log(req.session.passport);
      User.findOne({email:req.session.passport.user},(err,found)=>{
        if(err)
        console.log(err)
        else{
          foundUser.pending.push(found);
          foundUser.save();
        }
      });
      res.json({
        success:true,
        message:"Follow request sent successfully"
      });
    }
  });
}


//showing the home page of logged in user
export const getHome=(req,res)=>{
   User.findOne({email:req.session.passport.user},(err,foundUser)=>{
     user=foundUser;
   });




    //Finding users whom currently logged in user has not sent a request
   User.find({},(err,Users)=>{
     if(err)
     console.log(err);
     else{
       var remainingUser=Users.filter(foundUser=> foundUser.email!==req.session.passport.user );
      remainingUser=remainingUser.filter(foundUser=>  !user.pending.includes(foundUser._id) && !user.following.includes(foundUser._id));
          //Finding posts of all the users whom currently logged in User is following.
          User.find({
            '_id':{$in:user.following}  //searching for all users whom logged in user is following
          },(err,followings)=>{
            var arr=[];
            //for each logged in user get the post array
            followings.forEach((following)=>{
              //for each post array getting invidual post ids
              following.post.forEach((foundPost)=>{
                arr.push(foundPost);
              });
            });
            // searching details of every post  made by users whom current user is following
            Post.find({'_id':{$in:arr}},(err,posts)=>{
               posts.sort((a,b)=>{
                 var keyA=new Date(a.time);
                 var keyB=new Date(b.time);
                 if(keyA<keyB) return +1;
                 if(keyA>keyB) return -1;
                 return 0;
               });
               // console.log(posts);
               // res.render("home",{Users:remainingUser,Posts:posts});
              var fu=[];
              posts.forEach((post)=>{
                fu.push(post.user);
              });
              User.find({'_id':{$in:fu}},(err,postUser)=>{
                User.find({college:user.college},(err,fo)=>{
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
                res.json({
                  success:true,
                  message:"Welcome to home page",
                  Users:remainingUser,
                  Posts:posts,
                  postUser:postUser,
                  current:user,
                  news:foundPost
                });
              });
            });
              });

            });
          }
        );

        }
      });


}
