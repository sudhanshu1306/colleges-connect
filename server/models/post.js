import mongoose from "mongoose";
import User from "./signup.js";
import Comment from "./comment.js";
const Schema=mongoose.Schema;

const postSchema=new mongoose.Schema({
  user:{type:Schema.Types.ObjectId,ref:'User'},
  pic:String,
  caption:String,
  time:String,
  category:{type:String,default:"casual"},
  like:[{type:Schema.Types.ObjectId,ref:'User'}],
  comment:[{type:Schema.Types.ObjectId,ref:'Comment'}]
});
const Post=new mongoose.model('Post',postSchema);
export default Post;
