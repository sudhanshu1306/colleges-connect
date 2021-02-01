import React, {useState, useEffect} from 'react'
import Navhome from '../Navhome';
import Follow from '../Followrequest';
import Activity from '../Activity';
import About from '../About';
import '../Notification.css';
import Message from '../Message.js';


export default function Notification() {
const [isClicked, setisClicked] = useState(false);
const [buttonText, setbuttonText] = useState("Notification");


function handleClick(){
    setisClicked(!isClicked);
    if(isClicked){
        setbuttonText("Notification");
    }
    else{
        setbuttonText("Activity");
    }


}



    return (
        <div className="notidiv">
        <Navhome />
            <h1>Notification</h1>

       <button className="btn btn-dark noti-btn" onClick ={handleClick} >{buttonText}</button>
       { isClicked ? <Follow /> : <Activity /> }






        </div>
    )
}
