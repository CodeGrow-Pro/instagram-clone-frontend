import React, { useState } from 'react'
import { Grid , Link } from '@mui/material';
import login_img from '../../images/9364675fb26a.svg';
import insta_logo from '../../images/logoinsta.png'
import fb from '../../images/fb.png'
import appstroe from '../../images/app.png'
import playstore from '../../images/play.png'
import '../loginPage/Login.css'
import './Signup.css'
import axios from 'axios'
import { FaFacebookSquare } from 'react-icons/fa';
const Signup = () => {
    const [user,setUser] = useState({
        username:"",
        name:"",
        data:"",
        password:""
    })
   const  handleChange = (e)=>{
       e.preventDefault()
       const {name,value} = e.target;
       setUser({...user,[name]:value})
   }
   const handleSingup = ()=>{
         axios({
            method:"POST",
            url:'https://instagram-apis.onrender.com/instagram/v1/signup',
            data:user
         }).then((res)=>{
            window.location = '/#'
         }).catch((err)=>{
            console.log(err.message)
            alert("something went wrong!")
         })
   }
    return (
        <div>
          <Grid container spacing={4}>
      <Grid item xs>
      </Grid>
      <Grid item xs={4}>
        <div className='loginpage_main signup_style'> 
            <div className='loginpage_right signup-height'>
                <img className='loginpage_logo signup_margin ' src={insta_logo} alt="logo"/>
                <p className='desc'>Sign up to see photos and videos from your friends.</p>
                <button className='login_button signupbtn'><FaFacebookSquare  className='facebook'></FaFacebookSquare>Login with facebook</button>
                <div className="login_ordiv">
                    <div className='login_space'></div>
                    <div className='login_or'>OR</div>
                    <div className='login_space'></div>
                </div>
                <div className='logoinpage_signin'>
                     <input className='loginpage_text' name="data" type="text" onChange={handleChange} defaultValue={user.data} placeholder='Mobile number or  Email'/>
                     <input className='loginpage_text' name="name" type="text"  onChange={handleChange} defaultValue={user.name} placeholder='Full Name'/>
                     <input className='loginpage_text' name="username" type="text"  onChange={handleChange} defaultValue={user.username} placeholder='Username'/>
                     <input className='loginpage_text' name="password" type="password"  onChange={handleChange} defaultValue={user.password} placeholder='Password'/>
                     <button className='login_button' onClick={handleSingup}>Sign Up</button>
                </div>
            <div className="loginpage_signupoption">
                <div className="loginpage_signin">
                Have an account?  <Link href="/">Log in</Link>
                </div>
                <div className="loginpage_signup">
                    Get the app .
                    <div className='loginpage_option'>
                <img className='loginpage_dwimg' width={136} src={playstore} alt="play store" />
                <img className='loginpage_dwimg' width={120} src='https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png' alt="app store"/>
            </div>
                </div>
            </div>
    
            </div>
        </div>
      </Grid>
      <Grid item xs>
      </Grid>
    </Grid>
        </div>
      )
}

export default Signup