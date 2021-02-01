import React,{useState,useEffect} from 'react'
import '../College.css'
import Navhome from '../Navhome';
import News from '../News';
import Exam from '../Exam';
import Event from '../Event';
import Time from '../Timetable';
import axios from "axios";
import Addnews from '../Addnews';
import Broadcast from '../Broadcast';
const api=axios.create({
  withCredentials: true,
  baseURL:'http://localhost:5000/api/college'
});


export default function College() {
const [news,changeNews]=useState({});
const [users,changeUsers]=useState({});
const [current,changeCurrent]=useState();
const [isClicked,setisClicked] = useState("1");

function handleClick1(){
setisClicked("1");
}
function handleClick2(){
    setisClicked("2");
}
function handleClick3(){
    setisClicked("3");
}
function handleClick4(){
    setisClicked("4");
}
function handleClick5(){
    setisClicked("5");
}
function handleClick6(){
    setisClicked("6");
}

function setRight(){
  // console.log(news);
switch(isClicked){
    case "1": return <div />; break;
    case "2": return <Time news={news} users={users} current={current}/>; break;
    case "3": return <News news={news} users={users} current={current}/>; break;
    case "4": return <Event news={news} users={users} current={current} />; break;
    case "5": return <Broadcast />; break;
    case "6": return <Addnews />; break;
    default: return 0;
}
}

useEffect(()=>{api.get("/")
 .then(function (res) {
  console.log(res.data);
  if(res.data.success){
    changeNews(res.data.posts);
    changeUsers(res.data.users);
    changeCurrent(res.data.current);
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
        <div>
        <Navhome />

            <div className="sidenav">
            <div className={ isClicked==1? "linkdiv active":"linkdiv"} onClick={handleClick1}>Random</div>
            <div className={ isClicked==2? "linkdiv active":"linkdiv"} onClick={handleClick2}>Timetable</div>
            <div className={ isClicked==3? "linkdiv active":"linkdiv"} onClick={handleClick3}>News</div>
            <div className={ isClicked==4? "linkdiv active":"linkdiv"} onClick={handleClick4}>Events</div>
            <div className={ isClicked==5? "linkdiv active":"linkdiv"} onClick={handleClick5}>Broadcast</div>
            <div className={ isClicked==6? "linkdiv active":"linkdiv"} onClick={handleClick6}>Add news</div>
            </div>
            <div className="rightdiv">{setRight()
            }</div>
        </div>
    )
}


// switch(isClicked){
//     case "1": return <News /> ; break;
//     case "2": return <News /> ; break;
//     case "3": return <News /> ; break;
//     case "4": return <News /> ; break;
// }
