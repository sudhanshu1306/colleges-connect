import React,{useState,useEffect} from 'react'
import io from 'socket.io-client'
import Navhome from '../Navhome'
import '../Chat.css'
import Username from '../Username'
import ChatMsg from '../ChatMsg'
import axios from "axios"

const api=axios.create({
    withCredentials: true,
    baseURL:'http://localhost:5000/api/message'
  });


  const proxyurl = "https://protected-tundra-67357.herokuapp.com/";

export default function Chat() {
  // var socket = io('http://127.0.0.1:5000/');
  // console.log(socket);
  // socket.on('connection',()=>{
  //   console.log("socket connected");
  // });
  const [users,changeUsers]=useState([]);
  const [message,changeMessage]=useState({});
  const [arr,changeArr]=useState([]);


  useEffect(()=>{ api.get("/").then(res=>{
      console.log(res.data);
      if(res.data.success){
        var us=res.data.Messages;
         changeUsers(us);
         // console.log(users);
      }
  });
  // api.get("/").then(res=>{
  //     console.log(res.data);
  // });
  }, []);
  function handleData(data){
    changeMessage(data);
  }
  function showChats(user){
    // console.log(user);
    return (
      <Username
        key={user._id}
        name={user.username}
        pic={user.profileImage}
        id={user._id}
        data={handleData}
      />
    );
  }
   function showMessages(msg){
     console.log(msg[1]);
     var element = document.getElementById("chat");
     element.scrollTop = element.scrollHeight;
     var pic=msg[1].from===message.from._id?message.from.profileImage:message.to.profileImage;
     return(
       <>
       <ChatMsg content={msg[1].content} pic={pic}/><br/>
       </>
     )
   }
   function handleSend(){
     console.log("I was clicked");
     var msg=document.getElementById('message');
     // console.log(socket);
     // socket.emit('chat',{
     //   message:msg.value,
     //   handleFrom:message.from.username,
     //   from:message.from._id,
     //   to:message.to._id
     // });
   }



    return (
        <div>
            <Navhome />
            <div className="usernames">{users.map(showChats)}</div>
            <div className="chatdiv">
                <div className="chatbox" >
                <div className="chat" id="chat">
                   {message.to&& <>
                    <h5>{ message.to.username} </h5>
                    {/* random(message.messages)*/}

                    {
                     Object.keys(JSON.parse(message.messages)).map((key) => [Number(key), JSON.parse(message.messages)[key]]).map(showMessages)
                    }
                    {/*<ChatMsg className="left"/><br/>
                     <ChatMsg className="right" /><br/>
                    <ChatMsg className="left"/>*/} </>}
                </div>
                <div className="type"><input type="text" className="typemsg" id="message" placeholder="Type your message"/><i onClick={handleSend} class="fa fa-paper-plane" aria-hidden="true"></i></div>


                </div>
            </div>
        </div>
    )
}
