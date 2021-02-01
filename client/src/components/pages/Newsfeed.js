import React, {useState,useEffect} from 'react';
import '../../App.css';
import Navhome from '../Navhome';
import Footer from '../Footer';
import Post from "../Post";
import axios from "axios";


const api=axios.create({
  withCredentials: true,
  baseURL:'http://localhost:5000/api/home'
});



 function Newsfeed() {

  const [user,changeUser]=useState([]);
   const [post,changePost]=useState([]);
   const [postUser,changePostUser]=useState([]);
   const [current,changeCurrent]=useState([]);
   const [news,changeNews]=useState([]);
   var loggedIn="";
     function createPost(photo,postUser,current){
     var User=[];
     postUser.forEach((user)=>{
       if(user._id==photo.user)
       User=user;
     });

    //  console.log(current);
      return (
       <Post
       key={photo._id}
       src={photo.pic}
       caption={photo.caption}
       name={User.fullName}
       like={photo.like}
       comment={photo.comment}
       current={current._id}
       id={photo._id}
       />
     );
   }



       useEffect(()=>{api.get("/")
        .then(function (res) {
         console.log(res.data);
         if(res.data.success){
           changeUser(res.data.Users);
           changePost(res.data.Posts);
           changePostUser(res.data.postUser);
           changeCurrent(res.data.current);
           changeNews(res.data.news);
         }
         else{
           window.location="/sign-in";
         }
     })
     .catch(function (error) {
       console.log(error);
     });
   },[]);

  return (
    <>

    <Navhome />
    <div className="newsfeed">
        <div  className="postsection">
        <h1 className="newshead">Post Section</h1>
      {post.map((photo)=>  createPost(photo,postUser,current))}
      </div>
      <div className="newssection">
        <h1 className="newshead">News Updates</h1>
        {news.map((photo)=>  createPost(photo,postUser,current))}
      </div>
      </div>
      <Footer />

    </>
  );
}

export default Newsfeed;
