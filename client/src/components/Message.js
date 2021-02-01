import React,{useState,useEffect} from 'react';
import './Message.css';


export default function Message(props) {
  console.log(props);
return(
    <>
        <div className="msg">
            <img src={"http://localhost:5000/"+props.pic} alt="profilepic" className="msgpic"/>
            <br/>
            <div className="msgtext">
               {props.noti}
            </div>
            <br/>
            <br/>

        </div>
     </>
);


}
