import React,{useState,useEffect} from 'react'
import Message from './Message.js';
import axios from "axios";


const api=axios.create({
    withCredentials: true,
    baseURL:'http://localhost:5000/api/noti/notification'
  });

export default function Activity() {
  const [notification, changeNotification] = useState([]);
  const [pic,changePic]=useState();
 var notif={};

 useEffect(()=>{ api.get("/").then(res=>{
     console.log(res.data);
     if(res.data.success){
        notif= res.data.notification;
        console.log(notification);
        changeNotification(notif);
        changePic(res.data.pic);
     }



 });
 }, []);
 function showNoti(x){
     // console.log(x);
      // console.log(x);
      // console.log(pic);
       return (
         <Message
         noti= {x}
         pic={pic}
         />
       );
     }
    return (
      <div>
          {notification.map(showNoti)}
      </div>
    )
}
