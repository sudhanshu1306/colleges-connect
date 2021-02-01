import React from "react";
import Username from "./search";
import './popup.css';
import { Link,useHistory } from 'react-router-dom';


export default function Popup(props){
  var history=useHistory();
  function handleData(data){
    console.log(data);
    if(data.user._id===data.current._id)
    history.push("/profile");
    else
    {// eslint-disable-next-line no-restricted-globals
    history.push({pathname:"/searchProfile",state:{ data:data}})}
  }
  function showSearch(user){
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
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.follow.map(showSearch)}
      </div>
    </div>
  );
}
