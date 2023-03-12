import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Grid, Link } from "@mui/material";
import insta_logo from "../../images/logoinsta.png";
import HomeIcon from "../../images/home.svg";
import explore from "../../images/find.svg";
import Messages from "../../images/message.svg";
import love from "../../images/love.svg";
import search from "../../images/find.png";
import reels from "../../images/video.png";
import menu from "../../images/menu.png";
import tab from "../../images/tab.png";
import CreatePost from "../createPost/CreatePost";
import imageMaker from "../../imageConverter/imageMaker";
import token from "../../configs/authentication";
import st1 from '../../images/pp1.png'
import axios from "axios";
const Navbar = (props) => {
  //check user authorization
  const redirect = (isLogin) => {
    if (!isLogin) {
      window.location.assign("/");
    }else{
      window.location.assign('/#/home')
    }
  };
  if (!localStorage.getItem("token")) {
    window.onload(redirect(localStorage.getItem("token")));
  }
  //end

  //end here

  const [createpost, setCreatepost] = useState({
    style: "",
    status: false,
  });
  const handlecreatePost = () => {
    if (createpost.status) {
      setCreatepost({
        style: "",
        status: false,
      });
    } else {
      setCreatepost({
        style: "openModel",
        status: true,
      });
    }
  };
  const [currUser, setCurrUser] = useState("");
  const getUser = () => {
    axios({
      method: "get",
      url: "https://instagram-apis.onrender.com/instagram/v1/user/find",
      headers: token,
    })
      .then((res) => {
        const data = res.data.users;
        setCurrUser(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    getUser();
  }, []);
  const Userimg = currUser.avtar
  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };
  return (
    <div>
      <div className="navbar">
        <Grid container>
          <Grid item xs={2}>
            <img className="navbar_logo" src={insta_logo} alt="instagram" />
            <ul className="navbar_menu">
              <Link href="/#/home">
                <li>
                  <img
                    src={HomeIcon}
                    alt="Home"
                    width={"25px"}
                    height={"25px"}
                  />
                  <span>Home</span>
                </li>
              </Link>
              <Link>
                <li>
                  <img
                    src={search}
                    alt="search"
                    width={"25px"}
                    height={"25px"}
                  />{" "}
                  <span>Search</span>
                </li>
              </Link>
              <Link href="/#/explore">
                <li>
                  <img
                    src={explore}
                    alt="Explore"
                    width={"25px"}
                    height={"25px"}
                  />
                  <span>Explore</span>
                </li>
              </Link>
              <Link>
                <li>
                  <img src={reels} alt="Reels" width={"25px"} height={"25px"} />
                  <span>Reels</span>
                </li>
              </Link>
              <Link>
                <li>
                  <img
                    src={Messages}
                    alt="message"
                    width={"25px"}
                    height={"25px"}
                  />
                  <span>Messages</span>
                </li>
              </Link>
              <Link>
                <li>
                  <img
                    src={love}
                    alt="notification"
                    width={"25px"}
                    height={"25px"}
                  />
                  <span>Notifications</span>
                </li>
              </Link>
              <Link onClick={handlecreatePost}>
                <li>
                  <img src={tab} alt="create" width={"25px"} height={"25px"} />
                  <span>Create</span>
                </li>
              </Link>
              <Link href="/#/profile">
                <li>
                {Userimg ? (
                    <img
                    className="profile"
                      src={Userimg}
                      alt="user image"
                      width={"25px"}
                      height={"25px"}
                    />
                  ) : (
                    <img
                    className="profile"
                      src={st1}
                      alt="user image"
                      width={"25px"}
                      height={"25px"}
                    />
                  )}
                  <span>Profile</span>
                </li>
              </Link>
              <Link onClick={logout}>
                <li>
                  <img src={menu} alt="More" width={"25px"} height={"25px"} />
                  <span>Logout</span>
                </li>
              </Link>
            </ul>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </div>
      <CreatePost style={createpost.style} action={handlecreatePost} />
    </div>
  );
};

export default Navbar;
