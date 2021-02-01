import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import Post from "./post.js";
const Schema=mongoose.Schema;


const userSchema=new mongoose.Schema({
  username:String,
  fullName:String,
  email:String,
  phone:Number,
  college:String,
  password:String,
  profileImage:{type:String,default:"uploads\\man.png"},
  bio:String,
  gender:String,
  post:[{type:Schema.Types.ObjectId,ref:'Post'}],
  follower:[{type:Schema.Types.ObjectId,ref:'User'}],
  following:[{type:Schema.Types.ObjectId,ref:'User'}],
  pending:[{type:Schema.Types.ObjectId,ref:'User'}],
  notification:[{type:String}],
  activity:[{type:String}],
  news:[{type:Schema.Types.ObjectId,ref:'Post'}],
  department:String,
  year:String
});
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});
const User=new mongoose.model('User',userSchema);
export default User;
