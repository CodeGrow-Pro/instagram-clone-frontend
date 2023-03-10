import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import '../signupPage/Signup.css'
import './UpdateProfile.css'
import userImg from '../../images/pp3.jpeg'
import axios from 'axios'
import token from '../../configs/authentication'
import imageMaker from '../../imageConverter/imageMaker'
const UpdateProfile = () => {
    const [user,setUser] = useState({
           username:"",
           name:"",
           email:"",
           mobile:"",
           avtar:""
    });
    
    const  [imgs,setImgs] = useState("")
    const handleChnages = (e)=>{
        e.preventDefault()
        const {name,value} = e.target
        setUser({...user,[name]:value})
        setImgs(e.target.files[0])
    }
const uploadImage = ()=>{
    const formdata = new FormData()
    formdata.append("upload",imgs);
    axios({
        method:"put",
        url:"http://localhost:5600/instagram/v1/user/update",
        headers:token,
        data:formdata
     }).then((res)=>{
        // alert("Profile image update successfully!")
     }).catch((error)=>{
        console.log(error.message)
        alert("something went wrong!")
     })
}
    const updateUserOnClick = ()=>{
             axios({
                method:"put",
                url:"http://localhost:5600/instagram/v1/user/update",
                headers:token,
                data:user
             }).then((res)=>{
                alert(res.data.message)
             }).catch((error)=>{
                console.log(error.message)
                alert("something went wrong!")
             })
             uploadImage()
    }
    const getUser = () => {
        axios({
          method: "get",
          url: "http://localhost:5600/instagram/v1/user/find",
          headers:token,
        }).then( (res) => {
            const data = res.data.users
            setUser(data)
          })
          .catch((err) => {
            console.log(err.message);
          });
      };
      useEffect(()=>{
        getUser()
      })
      const userImg = imageMaker(user.avtar)
  return (
    <div>
        <Navbar />
        <section className="update">
            <div className='update_inputs'>
               <div className='profile_img'>
               <img  src={`data:image/png;base64,${userImg}`} alt="user image" />
               <p>{user.username}</p>
                <input type="file" name="upload" onChange={handleChnages} />
               </div>
               <div className='input_fields'>
                    <div>
                        <p>Username : </p>
                         <input type="text" name='username' onChange={handleChnages} defaultValue={user.username} placeholder='choose a unique username'/>
                    </div>
                    <div>
                        <p>Full Name : </p>
                         <input type="text" name='name' onChange={handleChnages} defaultValue={user.name} placeholder='Enter your full name'/>
                    </div>
                    <div>
                        <p>E-mail : </p>
                         <input type="email" name='email' onChange={handleChnages} defaultValue={user.email} placeholder='enter your new email'/>
                    </div>
                    <div>
                        <p>Phone  number : </p>
                         <input type="text" name="mobile" onChange={handleChnages} defaultValue={user.mobile} placeholder='Enter your updated phone number'/>
                    </div>
                    <div>
                        <button onClick={updateUserOnClick}>Save changes</button>
                    </div>
               </div>
            </div>
        </section>
    </div>
  )
}

export default UpdateProfile