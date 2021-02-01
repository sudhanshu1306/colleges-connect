import React from 'react';
// import io from 'socket.io-client';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Features from './components/Features';
import About from './components/About';
import Contact from './components/Contact';
import Signup from './components/pages/Signup';
import Signin from './components/pages/Signin';
import Otp from './components/pages/Otp';
import Profile from './components/pages/Profile';
import Newsfeed from './components/pages/Newsfeed';
import EditProfile from './components/pages/EditProfile'
import AddPost from './components/pages/Addpost';
import Notification from './components/pages/Notification';
import College from './components/pages/College';
import Chat from './components/pages/Chat';
// const SERVER = "http://127.0.0.1:5000";
 // const proxyurl = "https://protected-tundra-67357.herokuapp.com/";
function App() {
  // var socket = io.connect(proxyurl+'http://localhost:5000');
  // socket.on('connection',()=>{
  //   console.log("socket connected");
  // })
  return (
    <>
      <Router>

        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/features' component={Features} />
          <Route path='/about' component={About} />
          <Route path='/contact' component={Contact} />
          <Route path='/sign-up'  component={Signup} />
          <Route path='/otp' component={Otp} />
          <Route path='/sign-in'  component={Signin} />
          <Route path='/profile' component={Profile} />
          <Route path='/newsfeed' component={Newsfeed} />
          <Route path='/edit' component={EditProfile}/>
          <Route path='/add' component={AddPost}/>
          <Route path='/notification' component={Notification}/>
          <Route path='/college' component={College}/>
          <Route path='/chat' component={Chat}/>


        </Switch>
      </Router>
    </>
  );
}

export default App;
