import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import token from '../../configs/authentication';
import UserContext from '../../userStore/user-context';
import Main from '../mainComponent/main';
import Navbar from '../Navbar/Navbar';

import './Home.css'
const Home = () => {
  const getUser = () => {
    axios({
      method: "get",
      url: "https://instagram-apis.onrender.com/instagram/v1/user/find",
      headers:token,
    }).then( (res) => {
        const data = res.data.users
         localStorage.setItem("user",JSON.stringify(data))
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(()=>{
    getUser()
  },[])
  return (
    <div>
      <Navbar />
      <Main/>
    </div>
  )
}

export default Home;