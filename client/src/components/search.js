import React,{useState,useEffect} from 'react'
import './Search.css'
import axios from "axios"

const api=axios.create({
    'Access-Control-Allow-Credentials': true,
    baseURL:'http://localhost:5000/api/search'
  });


export default function Username(props) {

  async function handleSubmit(event) {
      event.preventDefault();
      // console.log(props);
      const user={
        id:props.id
      }
      let obj={};
      await api.post("/", user)
      .then(function (res) {
          // console.log(res.data);
          if(res.data.success){
             obj=res.data;


          }
        })
        .catch(function (error) {
          console.log(error);

        });
        console.log(obj);
        props.data(obj);

  }
    return (
        // <div className="user" >
        <div className="searchname" onClick={handleSubmit}>
        <div className="searchdiv4">
        <div className="searchdiv1">
        <div className="searchdiv2">
        <img src={"http://localhost:5000/"+props.pic} alt="profilepic" className="searchpic"/>
        </div>
        </div>
        <div className="searchdiv3">
        <div className="searchdiv5">
        <span  className="searchspan1" >
            {props.name}
            </span>
            </div>
            </div>
        </div>
        </div>

    )
}
