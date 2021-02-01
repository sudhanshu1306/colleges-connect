import React, {useState,useEffect}from 'react';
import './Post.css';
import axios from "axios";

const api=axios.create({
    withCredentials: true,
    baseURL:'http://localhost:5000/api/home/like'
  });


export default function Post (props) {
  const customStyle={
    marginRight:"20px"
  };
  const [isLiked, setisLiked] = useState(false);
  const [like,changeLike]=useState(0);

  useEffect(()=>{
      props.like? changeLike(props.like.length):changeLike(0);
      setisLiked(props.current? props.like.indexOf(props.current.toString())!==-1:false);
  },[props]);
  var str="http://localhost:5000/";

  async function handleClick(){

    await api.post("/",{id:props.id,isLiked:isLiked})
    .then(function(res){
      console.log(res.data);
    })
    .catch(function(error){
      console.log(error);
    });
    if(isLiked)
    changeLike(like-1);
    else
    changeLike(like+1);
    setisLiked(!isLiked);
  }
  return (
     <div className="card postdiv" style={{width: 450}}>
  <img className="card-img-top post-img" src={str+props.src} alt="Card image cap" />
  <div className="card-body">
    <h5 className="card-title">{props.name}</h5>
    <p className="card-text">{props.caption}</p>
    <i onClick={handleClick} style={customStyle} className = {isLiked ? "fas fa-heart fa-2x" : "far fa-heart fa-2x"}  ></i><span>                </span>
    <i class="far fa-comment fa-2x"></i>
    <div> </div>
    <strong style={customStyle}>{like} </strong><span>      </span>
    <strong >{props.comment&& props.comment.length}</strong>
  </div>
</div>);
}
