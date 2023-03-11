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
  const [user, setUser] = useState("");
  const [unKnownUser, setUnknownUser] = useState([]);
  const [model, setModel] = useState({
    style: "",
    status: true,
    userid: "",
  });
  const handleClickEdit = (id) => {
    console.log(id);
    if (model.status) {
      setModel({
        style: "openModel",
        status: false,
        userid: id,
      });
    } else {
      setModel({
        style: "",
        status: true,
        userid: id,
      });
    }
  };
  const [showPost, setShowPost] = useState({
    style: "",
    status: false,
    post: "",
  });
  const handleShowPost = (post) => {
    if (showPost.status) {
      setShowPost({
        style: "",
        status: false,
        post: post,
      });
    } else {
      setShowPost({
        style: "openModel",
        status: true,
        post: post,
      });
    }
  };
  const [storyUser, setStoryUser] = useState([]);

  const getUser = () => {
    axios({
      method: "get",
      url: "https://instagram-apis.onrender.com/instagram/v1/user/find",
      headers: token,
    })
      .then((res) => {
        const data = res.data.users;
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const getUserStroy = () => {
    axios({
      method: "get",
      url: "https://instagram-apis.onrender.com/instagram/v1/user/filter",
      headers: token,
    })
      .then((res) => {
        const data = res.data.users;
        const users = [];
        const otherUser = [];
        const id = localStorage.getItem("Id");
        data.forEach((usr) => {
          if (usr.followers.includes(id)) {
            users.push(usr);
          } else {
            otherUser.push(usr);
          }
        });
        setStoryUser(users);
        setUnknownUser(otherUser);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    getUser();
    getUserStroy();
  }, []);
  const userImg = imageMaker(user.avtar);
  const logout = ()=>{
    localStorage.clear()
    window.location.assign('/')
  }
  return (
    <div>
      <section className="posts">
        <div className="stories">
          <div className="stories-body">
            {storyUser.map((item, index) => {
              return <Story user={item} key={index} />;
            })}
          </div>
          <RecentPost editpopup={handleClickEdit} action={handleShowPost} />
          <Model
            style={model.style}
            editpopup={handleClickEdit}
            userId={model.userid}
          />
          <PostShow
            style={showPost.style}
            action={handleShowPost}
            post={showPost.post}
          />
        </div>
        <div className="suggestion">
          <div className="story user">
            <Link href="/#/profile">
              {userImg ? (
                <img
                  src={`data:image/png;base64,${userImg}`}
                  alt="user image"
                  width={"60px"}
                  height={"60px"}
                />
              ) : (
                <img
                  src={st1}
                  alt="user image"
                  width={"60px"}
                  height={"60px"}
                />
              )}
            </Link>
            <Link href="/#/profile">
              <div>
                <h4 className="username">{user.username}</h4>
                <p>{user.name}</p>
              </div>
            </Link>
            <button onClick={logout}>Logout</button>
          </div>
          <div className="suggestion_user">
            <p>Suggestions for you </p>
            <span>
              <button>See All</button>
            </span>
            {unKnownUser.map((us) => {
              const image = imageMaker(us.avtar);
              return (
                <div className="story user suggestions_user_show">
                  <Link href="/#/friend">
                    {image ? (
                      <img
                        src={`data:image/png;base64,${image}`}
                        alt="user image"
                        width={"60px"}
                        height={"60px"}
                      />
                    ) : (
                      <img
                        src={st1}
                        alt="user image"
                        width={"60px"}
                        height={"60px"}
                      />
                    )}
                  </Link>
                  <Link href="/#/profile">
                    <div>
                      <h4 className="username">{us.name}</h4>
                      <p>{us.username} </p>
                    </div>
                  </Link>
                  <button onClick={handleClickEdit}>Follow</button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
