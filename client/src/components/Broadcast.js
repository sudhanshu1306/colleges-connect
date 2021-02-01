
import React, {useState, useEffect} from 'react'
import Post from './Post';
import './Addnews.css';
import axios from "axios";

const api=axios.create({
    withCredentials: true,
    baseURL:'http://localhost:5000/api/broadcast'
  });


export default function Addnews() {

    const [user, changeUser]= useState();

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


    function handleChange(event){
        console.log(event.target.fullName);
        changeUser({
            ...user,[event.target.name]: event.target.value
        });
    }




async function handleSubmit(event){
    event.preventDefault();
    console.log(user);

  await  api.post("/", user)
    .then(res=>{
        console.log(res.data);
        if(res.data.success){
             window.location="/college";

        }
      });
}






    return (
        <div>
        <form id="myForm">
            <h1>Broadcast any Message</h1>
            <label for="inputName" className="lab">Input Message</label>
            <input type="text" className="form-control in" name="content" onChange={handleChange} />
            <label for="inputName" className="lab">Enter College</label>
            <input type="text" className="form-control in" placeholder="Enter college" name="college" onChange={handleChange} />
            <label for="inputCategory" className="lab">Year</label>
            <select id="inputCategory" className="form-control in" name="year" onChange={handleChange}>
            <option selected>Year</option>
                        <option>First</option>
                        <option>Second</option>
                        <option>Third</option>
                        <option>Fourth</option>
                        <option>Fifth</option>
                        <option>All</option>
            </select>
            <label for="inputCategory" className="lab">Department</label>
            <select id="inputCategory" className="form-control in"  name="department" onChange={handleChange} >
            <option selected>Department</option>
                        <option>CSE</option>
                        <option>ECE</option>
                        <option>EE</option>
                        <option>Mech</option>
                        <option>Civil</option>
                        <option>BArch</option>
                        <option>All</option>
            </select>
            <button
              type="submit"
              className="btn btn-dark btn-signup"
              onClick={handleSubmit}
          >
              Send

          </button>

            </form>
        </div>
    )
}
