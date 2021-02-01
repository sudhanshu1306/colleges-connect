import React, {useState} from "react"

import  { Redirect, Route } from 'react-router-dom';
import '../Signup.css';
import Navbar from "../Navbar";
import Footer from '../Footer';
import axios from "axios";
import { render } from "react-dom";

const api=axios.create({
    baseURL:'http://localhost:5000/api/verification'
  });



export default function Otp() {

  const [otp,changeOtp]=useState('');


    function handleChange (event) {
        console.log(event.target.name + event.target.value);
        changeOtp ({
            ...otp,[event.target.name]: event.target.value
        });
    }

    function handleSubmit(event) {
      event.preventDefault();
      console.log(otp);
      api.post("/", otp)
      .then(function (res) {
        console.log(res.data);
        window.location= res.data.success ? "/sign-in" : "/sign-up";
        // <Route exact path="/">
        //   {res.data.success ? <Redirect to="/sign-in" /> : <Redirect to= "/sign-up" />}
        // </Route>
      })
      .catch(function (error) {
        console.log(error);
      });



}




    return (
      <>
      <Navbar/>
      <div className="card col-12 col-lg-4 login-card mt-3 hv-center ">
      <form className="formdiv">
      <div className="form-group text-left">
              <label htmlFor="exampleInputPassword1">Otp</label>
      <input type="number"
      className="form-control"
                  id="phone"
                  placeholder="Otp"
                  name="otp"
                  onChange={handleChange}
              />
              </div>
              {/* <Link to="/sign-in"> */}

              <button

              className="btn btn-dark btn-signup"
              type="submit"
              onClick={handleSubmit}
              >
              Register
          </button>


      </form>
    </div>
    <Footer/>
    </>
    )
}
