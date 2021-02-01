import React, {useState, useEffect} from 'react'
import Post from '../Post';
import Navhome from '../Navhome';
import '../Addpost.css';
import Footer from '../Footer'
import axios from "axios";

const api=axios.create({
    withCredentials: true,
    baseURL:'http://localhost:5000/api/postPic'
  });


export default function Addpost() {



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
    // for(var key in userdb){
    //   console.log(key+" "+userdb[key]);
    //   formData.append(key,userdb[key]);
    // }
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
        <Navhome />
        <form id="myForm">
            <h1>Create Post</h1>
            <label for="inputName" className="lab">Upload picture</label>
            <input type="file" enctype="multipart/form-data" className="uploadpostpic" name="pic" />
            <br />
            <label for="inputName" className="lab">Enter Caption</label>
            <input type="text" className=" uploadpostpic" placeholder="Enter caption" name="caption" />
            <button
              type="submit"
              className="btn btn-dark btn-signup"
              onClick={handleSubmit}
          >
              Upload

          </button>
            {/* <h1>Preview</h1>
            <Post

            /> */}
            </form>
        </div>
    )
}
