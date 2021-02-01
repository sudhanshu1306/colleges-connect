import React,{useState,useEffect} from 'react'
import './Username.css'
import axios from "axios"

const api=axios.create({
    'Access-Control-Allow-Credentials': true,
    baseURL:'http://localhost:5000/api/message'
  });


export default function Username(props) {
  // const [from,changeFrom]=useState({});
  // const [to,changeTo]=useState({});
  // const [message,changeMessage]=useState({});
  async function handleSubmit(event) {
      event.preventDefault();
      // console.log(props);
      const user={
        chatWith:props.id
      }
      let obj={};
      await api.post("/", user)
      .then(function (res) {
          // console.log(res.data);
          if(res.data.success){
             obj=res.data;

            // // let obj1=res.data.to;
            //   changeFrom(obj.from);
            //   // changeTo(obj1);
            //   // changeMessage(obj2);
            //   console.log(from);
            //   // console.log(to);
            //   // console.log(message);
          }
        })
        .catch(function (error) {
          console.log(error);

        });
        console.log(obj);
        props.data(obj);

  }
    return (
        <div className="user" >
        <div className="name" onClick={handleSubmit}>
        <img src={"http://localhost:5000/"+props.pic} alt="profilepic" className="msgpic"/>
            {props.name}
        </div>
        </div>

    )
}
