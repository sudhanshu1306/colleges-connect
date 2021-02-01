import mongoose from "mongoose";
import User from "./signup.js";
import Post from "./post.js";
const Schema=mongoose.Schema;

const commentSchema=new Schema({
  user:{type:Schema.Types.ObjectId,ref:'User'},
  post:{type:Schema.Types.ObjectId,ref:'Post'},
  body:String,
},{
  timestamps:true
});
const Comment=new mongoose.model('Comment',commentSchema);
export default Comment;
