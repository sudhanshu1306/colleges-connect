import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../Signup.css';
import Navbar from "../Navbar";
import Footer from '../Footer';
import axios from "axios";
import { render } from '@testing-library/react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


const api=axios.create({
    baseURL:'http://localhost:5000/api/registration'
  });



export default function Signin(props) {


    const [userdb,changeUserDb]=useState([]);
       api.get("/").then(res=>{
      changeUserDb(res.data.users);
    });

    const [same, changeSame]= useState({
        id: "username"
    });

    var UsernameSame;
    const [user,changeUser]=useState({});


    const [isdisabled, changeisdisabled]= useState(0);

    function handleChange (event) {
        if(event.target.name== 'username'){
        UsernameSame= userdb.map((obj)=>{
            if(event.target.value == obj.username){

                console.log(obj.username);

                changeSame({
                    id: "username standard-error-helper-text",
                    helperText: "Username already exists",

                });
                changeisdisabled(1);

            }
            else{
                return null;
            }
        });
    }
        console.log(userdb);
        changeUser ({
            ...user,[event.target.name]: event.target.value
        });
    }



    function handleSubmit (event) {
        console.log(user);
        api.post("/", user)
        .then(res=>{
            console.log("hello");
          });

    }



    return (
       <>
        <Navbar/>
        <div className="card col-12 col-lg-4 login-card mt-3 hv-center ">

      <form className="formdiv" >
          <div className="form-group text-left">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <TextField type="email"
                 className="form-control"
                 id="email"
                 placeholder="Enter email"
                 name="email"
                 onChange={handleChange}
          />
          </div>
          <div className="form-group text-left">
              <label htmlFor="fullname">Full Name</label>
              <TextField type="text"
                  className="form-control"
                  id="fullname"
                  placeholder="FullName"
                  name="fullName"
                  onChange={handleChange}
              />
              </div>
              <div className="form-group text-left">
              <label htmlFor="college">College Name</label>
              <TextField type="text"
                  className="form-control"
                  id="college"
                  placeholder="Name of college"
                  name="college"
                  onChange={handleChange}
              />
              </div>
              <div className="form-group text-left">
              <label htmlFor="phone">Phone number</label>
              <TextField type="number"
                  className="form-control"
                  id="phone"
                  placeholder="Phone number"
                  name="phone"
                  onChange={handleChange}
              />
              </div>
          <div className="form-group text-left">
              <label htmlFor="username">Username</label>
              <TextField type="text"
                  className="form-control"
                  {...same}
                  placeholder="Username"
                  name="username"
                  onChange={handleChange}

              />




          </div>
          <div className="form-group text-left">
              <label htmlFor="exampleInputPassword1">Password</label>
              <TextField type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
              />
          </div>
          <Link to="/otp">
          <button
              type="submit"
              className="btn btn-dark btn-signup"
              onClick={handleSubmit}
              disabled= {isdisabled}
          >
              Register

          </button>
          </Link>
            <h6 className="bottom">Already have an account ?<Link to="/sign-in">Sign In</Link></h6>
      </form>
    </div>
    <Footer/>
    </>
    )

}
