import logo from './logo.svg';
import './App.css';
import { Routes ,Route, Outlet } from 'react-router-dom';
import Login from './Components/loginPage/Login';
import Home from './Components/HomePage/Home';
import Signup from './Components/signupPage/Signup';
import Profile from './Components/ProfilePages/Profile';
import Post from './Components/activityPages/Post';
import Reels from './Components/activityPages/Reels';
import Saved from './Components/activityPages/Saved';
import Tagged from './Components/activityPages/Tagged';
import UpdateProfile from './Components/ProfilePages/UpdateProfile';
import Explore from './Components/explorePage/Explore';
import token from './configs/authentication';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UserProvider from './userStore/user-provider';
import UserContextOutlet from './Components/userContext/UserContextOutlet';
import OtherProfile from './Components/ProfilePages/OtherProfile';
import PostOtherUser from './Components/ProfilePages/PostOtherUser';
function App() {
  return (
      <UserProvider>
           <Routes>
      <Route exact path='/' element={<Login/>} />
      <Route exact path='/signup' element={<Signup/>} />
     <Route exact path='/home' element={<Home/>} />
      <Route exact path="/profile" element={<Post/>} />
      <Route exact path="/explore" element={<Explore/>} />
      <Route exact path="/profile/reels" element={<Reels/>} />
      <Route exact path="/profile/saved" element={<Saved />} />
      <Route exact path="/profile/tagged" element={<Tagged />} />
      <Route exact path="/profile/edit" element={<UpdateProfile/>} />
      <Route exact path='/friend' element={<PostOtherUser />} />
    </Routes>
      </UserProvider>
    );
}

export default App;
