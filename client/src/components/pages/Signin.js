import React , {useState} from 'react';
import { Link,Route,Redirect,useHistory} from 'react-router-dom';
import Navbar from "../Navbar";
import Footer from '../Footer';
import '../Signup.css';
import axios from "axios";


const api=axios.create({
    withCredentials: true,
    baseURL:'http://localhost:5000/api/login'
  });


export default function Signup(props) {
     let history=useHistory();
    const [user,changeUser]=useState({});

    function handleChange (event) {
        changeUser ({
            ...user,[event.target.name]: event.target.value
        });
    }

    var krishna=false;


    async function handleSubmit (event) {
        event.preventDefault();
        console.log(user);
        await api.post("/", user)
        .then(function (res) {
            console.log(res.data);
            if(res.data.success){
                krishna=true;
               console.log(krishna);
               if(krishna)
               history.push('/newsfeed');
               else
               history.push('/sign-in');
            }
          })
          .catch(function (error) {
            console.log(error);

          });


    }

    return (
      <>
      <Navbar/>
      <div className="signindiv">
      <div className="card col-12 col-lg-4 login-card mt-5 hv-center ">
      <form className="formdiv">
          <div className="form-group text-left">
          <label htmlFor="exampleInputEmail1">Email address/Username</label>
          <input type="email"
                 className="form-control"
                 id="email"
                 placeholder="Enter email or username"
                 name="email"
                 onChange={handleChange}
          />
          </div>

          <div className="form-group text-left">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
              />
          </div>
          {/* <Link to="/profile"> */}
          <button
              type="submit"
              className="btn btn-dark btn-signup"
              onClick={handleSubmit}
          >
              Login
          </button>
          {/* </Link> */}
            <h6 className="bottom">Don't have an account ?<Link to="/sign-up">Sign Up</Link></h6>
      </form>
    </div>
    </div>
    <Footer/>
    </>
    )
}
