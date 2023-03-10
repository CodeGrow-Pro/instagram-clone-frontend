import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Profile.css";
import userImg from "../../images/pp1.png";
import { Link } from "@mui/material";
import axios from "axios";
import token from "../../configs/authentication";
import { useLocation } from "react-router-dom";
import imageMaker from "../../imageConverter/imageMaker";
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const OtherProfile = (props) => {
  const userId = useQuery();
  const [user, setUser] = useState({});
  const [counts,setCounts] = useState({
       followers:"",
       following:"",
       posts:""
  })
  const [follow, setFollow] = useState({
    text:"",
    status:""
  });
  const data = JSON.parse(localStorage.getItem("user"));
  const getUser = () => {
    axios({
      method: "get",
      url: "http://localhost:5600/instagram/v1/user/find",
      headers:token,
    }).then( (res) => {
        const data = res.data.users
         const status =data.following.includes(userId.get("id"))
       setFollow({
         text: status? "Unfollow" : "Follow",
         status:status
       })
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const getUserStroy = () => {
    axios({
      method: "get",
      url: `http://localhost:5600/instagram/v1/user/filter?${userId}`,
      headers: token,
    })
      .then((res) => {
        const data=  res.data.users[0]
        getPostotheruserPosts(data)
        setUser(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleFollow = () => {
    axios({
      method: "put",
      url: `http://localhost:5600/instagram/v1/user/follow?${userId}&status=${follow.status}`,
      headers:token
    }).then((res) => {
      const status = res.data.status
      setFollow({
        text: status? "Unfollow" : "Follow",
        status:status
      })
    }).catch((error)=>{
      console.log(error.message)
    });
  };
  const getPostotheruserPosts = (data) => {
    axios({
      method: "get",
      url: `http://localhost:5600/instagram/v1/post/friend?${userId}`,
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
  useEffect(() => {
    getUser()
    getUserStroy();
  }, [follow.status]);
  const userImg = imageMaker(user.avtar);
  return (
    <div>
      <Navbar />
      <section className="posts">
        <div className="account">
          <div className="user_account">
            <div className="account_details">
              {
                <img
                  src={`data:image/png;base64,${userImg}`}
                  alt="user image"
                />
              }
            </div>
            <div className="action">
              <div className="details">
                <p>{user.username}</p>
                <button onClick={handleFollow}>{follow.text}</button>
                <button>Messages</button>
              </div>
              <div className="followers">
                <span>
                  <strong>{counts.posts}</strong> posts
                </span>
                <span>
                  <strong>{counts.followers}</strong> followers
                </span>
                <span>
                  <strong>{counts.following}</strong> following
                </span>
              </div>
            </div>
          </div>
          <div className="account_activity">
            <Link className={props.active} href={`/#/friend?${userId}`}>
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

export default OtherProfile;
