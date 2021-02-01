import mongoose from "mongoose";
import User from "./signup.js";
const Schema=mongoose.Schema;

const messageSchema=new Schema({
  content:String,
  from:{type:Schema.Types.ObjectId,ref:'User'},
  to:{type:Schema.Types.ObjectId,ref:'User'}
},{
  timestamps:true,
});
const Message=new mongoose.model('Message',messageSchema);
export default Message;
