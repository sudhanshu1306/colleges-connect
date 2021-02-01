import React, {useState, useEffect} from 'react'
import Post from './Post';
import './Addnews.css';
import axios from "axios";

const api=axios.create({
    withCredentials: true,
    baseURL:'http://localhost:5000/api/news'
  });


export default function Addnews() {



    useEffect(()=>{api.get("/")
    .then(function (res) {
    console.log(res.data);
    if(!res.data.success){
        window.location="\sign-in";
    }

 })
 .catch(function (error) {
   console.log(error);
 });
},[]);





async function handleSubmit(event){
    event.preventDefault();

    let myForm=document.getElementById('myForm');
    var formData=new FormData(myForm);
    console.log(formData);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
  await  api.post("/", formData,config)
    .then(res=>{
        console.log(res.data);
        if(res.data.success){
             window.location="/profile";
        }
      });
}






    return (
        <div>
        <form id="myForm">
            <h1>Upload News</h1>
            <label for="inputName" className="lab">Upload picture</label>
            <input type="file" enctype="multipart/form-data" className="uploadpostpic" name="pic" />

            <label for="inputName" className="lab">Enter Caption</label>
            <input type="text" className="form-control in" placeholder="Enter caption" name="caption" />
            <label for="inputCategory" className="lab">Category</label>
            <select id="inputCategory" className="form-control in"  name="category" >
                <option selected>Casual</option>
                <option>News</option>
                <option>Timetable</option>
                <option>Event</option>
            </select>
            <button
              type="submit"
              className="btn btn-dark btn-signup"
              onClick={handleSubmit}
          >
              Upload

          </button>

            </form>
        </div>
    )
}
