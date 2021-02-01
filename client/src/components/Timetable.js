import React from 'react'
import Post from './Post'

export default function Timetable(props) {
  console.log(props);
  const news=props.news.filter((news)=> news.category==="Timetable");
  function newsEvent(photo){
    var User=[];
    props.users.forEach((user)=>{
      if(user._id===photo.user)
      User=user;
    });
    return (
     <Post
     key={photo._id}
     src={photo.pic}
     caption={photo.caption}
     name={User.fullName}
     like={photo.like}
     comment={photo.comment}
     current={props.current._id}
     id={photo._id}
     />)
  }
  console.log(news);
    return (
        <div>
          {news.map(newsEvent)}
        </div>
    )
}
