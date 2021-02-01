import React from 'react';
import { Link,useHistory } from 'react-router-dom';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  let history=useHistory();
  function handleSignup(event){
    history.push("/sign-up");
  }
  function handleLogin(event){
    history.push("/sign-in");
  }
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>ONE PLACE FOR ALL YOUR NEEDS</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>

        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          onClick={handleSignup}
        >
          SIGN UP
        </Button>



        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={handleLogin}
        >
          SIGN IN

        </Button>

      </div>
    </div>
  );
}

export default HeroSection;
