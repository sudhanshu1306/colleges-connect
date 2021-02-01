import React, {useState, useEffect} from 'react'
import '../Profile.css'
import Navhome from '../Navhome'
import Footer from '../Footer'
import axios from "axios";




const api=axios.create({
    withCredentials: true,
    baseURL:'http://localhost:5000/api/editProfile'
  });

export default function EditProfile() {
    var user= {};

const [fullname, changefullname]=useState();
const [username, changeusername]=useState();
const [email, changeemail]=useState();
const [phone, changephone]=useState();
const [college, changecollege]=useState();
const [gender, changegender]=useState();
const [bio, changebio]=useState();
const [dp,changedp]=useState();
    useEffect(()=>{api.get("/")
    .then(function (res) {
     console.log(res.data);

     if(res.data.success){
      user=res.data.user;
       console.log(user);
       changefullname(user.fullName);
       changeusername(user.username);
       changecollege(user.college);
       changeemail(user.email);
       changephone(user.phone);
       changegender(user.gender);
       changebio(user.bio);
       changedp(user.profileImage);
       console.log(fullname);
          changeUserdb({
        fullName: fullname,
        phone: phone,
        gender: gender,
        bio: bio
       });

       console.log(userdb);


     }
     else{
       window.location="/sign-in";

     }
 })
 .catch(function (error) {
   console.log(error);
 });
},[]);

    const [userdb,changeUserdb]= useState({});

    function handleChange(event){
        console.log(event.target.fullName);
        changeUserdb ({
            ...userdb,[event.target.name]: event.target.value
        });



    }




    async function handleSubmit(event){
        event.preventDefault();
        console.log(userdb);
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
            <Navhome />
            <form id="myForm">
            <center>
            <h2 className="editpro">Upload your profile picture</h2>
                <picture>
                <img className="changedp" src={"http://localhost:5000/"+dp}/>
                <div >
                <input type="file" enctype="multipart/form-data" id="dp_upload" className="uploadimg" name="profileImage" onChange={handleChange} />
                </div>
                </picture>
                </center>


            <div className="divform">

                <div className="form-row">
                    <div className="form-group ">
                     {/*<label for="inputName" className="lab">Full Name</label>*/}
                    <input type="text" className="form-control in" id="inputEmail4" name="fullName" defaultValue={fullname} placeholder="Full Name" onChange={handleChange} />
                    </div>
                    <div className="form-group ">
                    {/* <label for="inputUsername" className="lab">Username</label>*/}
                    <input type="text" className="form-control in" id="inputPassword4" name="username" placeholder="Username" defaultValue={username} disabled/>
                    </div>
                </div>
                <div className="form-group">
                     {/*<label for="inputEmail" className="lab">Email</label>*/}
                    <input type="email" className="form-control in" id="inputAddress" name="email" defaultValue={email} placeholder="Email" disabled/>
                </div>
                <div className="form-group">
                    {/* <label for="inputEmail" className="lab">College</label> */}
                    <input type="text" className="form-control in" id="inputAddress" name="college" defaultValue={college} placeholder="College" disabled/>
                </div>
                <div className="form-row">
                    <div className="form-group ">
                    {/*<label for="inputCity" className="lab">Phone number</label>*/}
                    <input type="number" className="form-control in" id="inputNumber" name="phone" defaultValue={phone} placeholder="Phone number" onChange={handleChange} />
                    </div>
                    <div className="form-group ">
                    {/*<label for="inputGender" className="lab">Gender</label>*/}
                    <select id="inputGender" className="form-control in" defaultValue={gender} name="gender" onChange={handleChange}>
                        <option selected>Choose Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                    </div>
                    <div className="form-group ">
                    {/*<label for="inputGender" className="lab">Gender</label>*/}
                    <select id="inputDepartment" className="form-control in"  name="department" >
                        <option selected>Department</option>
                        <option>CSE</option>
                        <option>ECE</option>
                        <option>EE</option>
                        <option>Mech</option>
                        <option>Civil</option>
                        <option>BArch</option>
                    </select>
                    </div>
                    <div className="form-group ">
                    {/*<label for="inputGender" className="lab">Gender</label>*/}
                    <select id="inputYear" className="form-control in"  name="year" >
                        <option selected>Year</option>
                        <option>First</option>
                        <option>Second</option>
                        <option>Third</option>
                        <option>Fourth</option>
                        <option>Fifth</option>
                    </select>
                    </div>
                    <div className="form-group">
                      {/* <label for="inputBio" className="lab">Bio</label> */}
                    <input type="text" className="form-control in" id="inputBio" defaultValue={bio} name="bio" onChange={handleChange} placeHolder="bio" />
                    </div>
                </div>

                <button type="submit" onClick={handleSubmit} className="btn btn-dark save">Save</button>


        </div>
         </form>

            {/* <Footer /> */}


        </div>
    )
}
