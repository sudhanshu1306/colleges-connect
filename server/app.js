import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
const app=express();
import http from 'http';
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
import cors from "cors";
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import mongoose from "mongoose";
import * as socket from "socket.io";
mongoose.connect(process.env.Mongoose_URL,{useUnifiedTopology:true,useNewUrlParser:true});
mongoose.set('useFindAndModify',false);
mongoose.set('useCreateIndex',true);
import User from "./models/signup.js";
import Message from "./models/message.js";


const Port=process.env.Port;

const server=http.Server(app);

server.listen(Port,(req,res)=>{
  console.log("Server started on port "+Port);
});


//Load all Routes
import registrationRoute from "./routes/registration.js";
import verificationRoute from "./routes/verification.js";
import loginRoute from "./routes/login.js";
import postPicRoute from "./routes/post.js";
import editProfileRoute from "./routes/editProfile.js";
import followRoute from "./routes/follow.js";
import homeRoute from "./routes/home.js";
import acceptRequestRoute from "./routes/acceptRequest.js";
import profileRoute from "./routes/profile.js";
import messageRoute from "./routes/message.js";
import notificationRoute from "./routes/notification.js";
import newsRoute from "./routes/news.js";
import collegeRoute from "./routes/college.js";
import broadcastRoute from "./routes/broadcast.js";
import searchRoute from "./routes/search.js";
import logoutRoute from './routes/logout.js';

app.set("view engine","ejs");
app.use(express.static("public"));
app.use('/uploads',express.static("uploads"));

app.use(session({
  secret:process.env.Session_Secret,
  resave:false,
  saveUninitialized:false,
}));
app.use(passport.initialize());
app.use(passport.session());

//Config for only development
if(process.env.NODE_ENV==='development'){
  app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials: true
  }))
  app.use(morgan('dev'))

}
//
// app.use(function(req, res, next) {
// res.header('Access-Control-Allow-Credentials', true);
// res.header('Access-Control-Allow-Origin', req.headers.origin);
// res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
// res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
// if ('OPTIONS' == req.method) {
//      res.send(200);
//  } else {
//      next();
//  }
// });

//Use all routes
app.use("/api/registration",registrationRoute);
app.use("/api/verification",verificationRoute);
app.use("/api/login",loginRoute);
app.use("/api/postPic",postPicRoute);
app.use("/api/editProfile",editProfileRoute);
app.use("/api/follow",followRoute);
app.use("/api/home",homeRoute);
app.use("/api/accept",acceptRequestRoute);
app.use("/api/profile",profileRoute);
app.use("/api/message",messageRoute);
app.use("/api/noti",notificationRoute);
app.use("/api/news",newsRoute);
app.use("/api/college",collegeRoute);
app.use("/api/broadcast",broadcastRoute);
app.use("/api/search",searchRoute);
app.use("/api/logout",logoutRoute);

app.use((req,res)=>{
  res.status(404).json({
    success:false,
    message:"Page Not Found"
  })
});


passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


var io=new socket.Server(server ,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true}
  });
io.on('connection',function(socket){
  console.log("We made a successfull socket connection on ",socket.id);
  socket.on('disconnect',()=>{
    console.log("User disconnected");
  });
  socket.on('chat',function(data){
    console.log(data);
    const message=new Message({
      content:data.message,
      from:data.from,
      to:data.to
    });
    message.save();
    io.sockets.emit('chat',message);
  });
  socket.on("typing",function(data){
    socket.broadcast.emit("typing",data);
  })
});
