import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Profile.css";
import st1 from "../../images/pp1.png";
import { Link } from "@mui/material";
import axios from "axios";
import imageMaker from "../../imageConverter/imageMaker";
import token from "../../configs/authentication";
const Profile = (props) => {
  const [user, setUser] = useState({});
   const [counts,setCounts] = useState({
       followers:"",
       following:"",
       posts:""
  })
  const getUser = () => {
    axios({
      method: "get",
      url: "https://instagram-apis.onrender.com/instagram/v1/user/find",
      headers: token,
    })
      .then((res) => {
           const data = res.data.users
           getPost(data)
           setUser(data)
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const getPost = (data) => {
    axios({
      method: "get",
      url: "https://instagram-apis.onrender.com/instagram/v1/post/find",
      headers: token,
    }).then((res) => {
      const post = res.data.posts;
      setCounts({
        followers:data.followers.length,
        following:data.following.length,
        posts:post.length
       })
    }).catch((error)=>{
      console.log(error.message)
    });
  };
  const data = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    getUser()
  }, []);
     const userImg = imageMaker(data.avtar)
  return (
    <div>
      <Navbar />
      <section className="posts">
        <div className="account">
          <div className="user_account">
            <div className="account_details">
            {
                   userImg ? <img  src={`data:image/png;base64,${userImg}`} alt="user image" />:
                   <img  src={st1} alt="user image"/>
               }
            </div>
            <div className="action">
              <div className="details">
                <p>{user.username}</p>
                <Link href="/#/profile/edit">
                  <button>Edit profile</button>
                </Link>
                <button>Ad tools</button>
              </div>
              <div className="followers">
                <span>
                  <strong>{counts.posts}</strong> posts
                </span>
                <span>
                  <strong>{counts.followers} </strong> followers
                </span>
                <span>
                  <strong>{counts.following}</strong> following
                </span>
              </div>
            </div>
          </div>
          <div className="account_activity">
            <Link className={props.active} href="/#/profile">
              POSTS
            </Link>
            <Link className={props.active} href="/#/profile/reels">
              REELS
            </Link>
            <Link href="/#/profile/saved">SAVED</Link>
            <Link href="/#/profile/tagged">TAGGED</Link>
          </div>
          <div></div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
