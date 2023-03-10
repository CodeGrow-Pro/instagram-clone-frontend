import React, { useEffect, useState } from "react";
import "./main.css";
import st1 from "../../images/pp1.png";
import RecentPost from "../RecentPost/RecentPost";
import Model from "./Model";
import PostShow from "../createPost/PostShow";
import { Link } from "@mui/material";
import axios from "axios";
import token from "../../configs/authentication";
import Story from "./Story";
import imageMaker from "../../imageConverter/imageMaker";
const Main = () => {
  const [user,setUser] = useState("")
  const [model, setModel] = useState({
    style: "",
    status: true,
  });
  const handleClickEdit = (e) => {
    e.preventDefault();
    if (model.status) {
      setModel({
        style: "openModel",
        status: false,
      });
    } else {
      setModel({
        style: "",
        status: true,
      });
    }
  };
  const [showPost, setShowPost] = useState({
    style: "",
    status: false,
    post:""
  });
  const handleShowPost = (post) => {
    if (showPost.status) {
      setShowPost({
        style: "",
        status: false,
        post:post
      });
    } else {
      setShowPost({
        style: "openModel",
        status: true,
        post:post
      });
    }
  };
  const [storyUser, setStoryUser] = useState([]);

  const getUser = () => {
    axios({
      method: "get",
      url: "http://localhost:5600/instagram/v1/user/find",
      headers:token,
    }).then( (res) => {
        const data = res.data.users
        setUser(data)
         localStorage.setItem("user",JSON.stringify(data))
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const getUserStroy = () => {
    axios({
      method: "get",
      url: "http://localhost:5600/instagram/v1/user/filter",
      headers: token,
    })
      .then((res) => {
        const data = res.data.users
        setStoryUser(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(()=>{
    getUser()
    getUserStroy()

  },[])
  const userImg = imageMaker(user.avtar)
  return (
    <div>
      <section className="posts">
        <div className="stories">
          <div className="stories-body">
            {storyUser.map((item,index) => {
              return <Story user={item} key={index}/>;
            })}
          </div>
          <RecentPost editpopup={handleClickEdit} action={handleShowPost} />
          <Model style={model.style} editpopup={handleClickEdit} />
          <PostShow style={showPost.style} action={handleShowPost} post={showPost.post}/>
        </div>
        <div className="suggestion">
          <div className="story user">
            <Link href="/#/profile">
              <img  src={`data:image/png;base64,${userImg}`} alt="" width={"60px"} height={"60px"} />
            </Link>
            <Link href="/#/profile">
              <div>
                <h4 className="username">{user.username}</h4>
                <p>{user.name}</p>
              </div>
            </Link>
            <button>Switch</button>
          </div>
          <div className="suggestion_user">
            <p>Suggestions for you </p>
            <span>
              <button>See All</button>
            </span>
            <div className="story user suggestions_user_show">
              <Link href="/#/friend">
                <img src={st1} alt="" width={"60px"} height={"60px"} />
              </Link>
              <Link href="/#/profile">
                <div>
                  <h4 className="username">user name</h4>
                  <p>username </p>
                </div>
              </Link>
              <button>Follow</button>
            </div>
            <div className="story user suggestions_user_show">
              <Link href="/#/friend">
                <img src={st1} alt="" width={"60px"} height={"60px"} />
              </Link>
              <Link href="/#/friend">
                <div>
                  <h4 className="username">user name</h4>
                  <p>username </p>
                </div>
              </Link>
              <button>Follow</button>
            </div>
            <div className="story user suggestions_user_show">
              <Link href="/#/friend">
                <img src={st1} alt="" width={"60px"} height={"60px"} />
              </Link>
              <Link href="/#/friend">
                <div>
                  <h4 className="username">user name</h4>
                  <p>username </p>
                </div>
              </Link>
              <button>Follow</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
