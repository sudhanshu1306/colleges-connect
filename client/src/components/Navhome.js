import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link,useHistory } from 'react-router-dom';
import './Navbar.css';
import Username from './search';
import axios from "axios";
import SearchProfile from "./pages/Searchprofile";

const api=axios.create({
    withCredentials: true,
    baseURL:'http://localhost:5000/api/search'
  });

function Navhome() {
  var history=useHistory();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [users,changeUsers]=useState({});
  const [flag,changeFlag]=useState(false);
  const [found,setFound]=useState([]);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
   function handleChange(event){
     var s=(event.target.value);
     if(s!==""){
     var arr=users.filter((user)=> user.username.indexOf(s)==0);
     console.log(arr);
     setFound(arr);
     changeFlag(true);
    }
    else
    changeFlag(false);
   }
  useEffect(() => {
    api.get("/").then(res=>{
      if(res.data.success){
        changeUsers(res.data.users);
      }
    });
    showButton();
  }, []);
  function handleData(data){
    console.log(data);
    if(data.user._id===data.current._id)
    history.push("/profile");
    else
    {// eslint-disable-next-line no-restricted-globals
    history.push({pathname:"/searchProfile",state:{ data:data}})}
  }
  function showSearch(user){
    return (
      <Username
        key={user._id}
        name={user.username}
        pic={user.profileImage}
        id={user._id}
        data={handleData}
      />
    );
  }

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbarhome'>
        <div className='navbar-contain'>
          {/* <Link to='/' className='nav-logo ' onClick={closeMobileMenu}>
          <i class="fa fa-university" aria-hidden="true"></i> College Connect
          </Link> */}
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/newsfeed' className='nav-link' onClick={closeMobileMenu}>
              <i class="fa fa-fw fa-home"></i>
              &nbsp;  News feed
              </Link>
            </li>
            <li className='navbar-item'>
              <Link
                to='/chat'
                className='nav-link'
                onClick={closeMobileMenu}
              ><i class="fas fa-fw fa-comment-alt"></i>
               &nbsp;  Chat Section
              </Link>
            </li>
            <li className='navbar-item'>
              <Link
                to='/college'
                className='nav-link'
                onClick={closeMobileMenu}
              ><i class="fas fa-fw fa-school"></i>
               &nbsp;  College
              </Link>
            </li>
            <li className='navbar-item'>
              <Link
                className='nav-link'>
                <i class="fas fa-search fa-fw"></i><input type='text' onChange={handleChange} placeholder='Search ' id='search-text-input' />
              </Link>
            </li>
            <li className='navbar-item n1'>
              <Link to='/add' className='nav-link ' onClick={closeMobileMenu}>
              <i class="fas fa-fw fa-plus-square"></i>
              &nbsp;  Add Post
              </Link>
            </li>
            <li className='navbar-item n2'>
              <Link to='/notification' className='nav-link' onClick={closeMobileMenu}>
              <i class="fas fa-fw fa-heart"></i>
              &nbsp; Notifications
              </Link>
            </li>
            <li className='navbar-item n3'>
              <Link to='/profile' className='nav-link' onClick={closeMobileMenu}>
              <i class="fas fa-fw fa-user"></i>
              &nbsp; User Profile
              </Link>
            </li>

          </ul>
        </div>
      </nav>
      
      {flag &&
      <div className="navsearchdiv1">  
      <div className="navsearchdiv2">
      { found.map(showSearch)} 
      </div>
      </div>}
    </>
  );
}

export default Navhome;
