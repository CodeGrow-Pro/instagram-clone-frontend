import React, { useEffect, useState } from "react";
import "./CreatePost.css";
import drop from "../../images/drag-and-drop.png";
import st1 from "../../images/pp4.jpeg";
import { Link } from "@mui/material";
import token from "../../configs/authentication";
import imageMaker from "../../imageConverter/imageMaker";
import getUser from "../../imageConverter/userget";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
const CreatePost = (props) => {
  const [user, setUser] = useState("");
  const [newPost, setNewPost] = useState({
    title: "",
    image: "",
    location: "",
  });
  const [image, setImage] = useState("");
  const handlechange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };
  const handlechangeUpload = (e) => {
    const img = e.target.files[0];
    setImage(img);
  };
  const handleClickCreatePost = () => {
    const bodyData = new FormData();
    bodyData.append("title", newPost.title);
    bodyData.append("upload", image);
    bodyData.append("location", newPost.location);
    axios({
        method:"post",
        url:"http://localhost:5600/instagram/v1/post/create",
        headers:{Auth:token.Auth,"Content-Type":'multipart/form-data'},
        data:bodyData
    }).then((res)=>{
        alert("post share successfully.")
    }).catch((error)=>{
        console.log(error.message)
    })
  };
  const getUser = () => {
    axios({
      method: "get",
      url: "http://localhost:5600/instagram/v1/user/find",
      headers: token,
    })
      .then((res) => {
        const data = res.data.users;
        setUser(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const userImg = imageMaker(user.avtar);
  const uploadedImage = imageMaker(image)
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <div className={`model ${props.style}`}>
      <div className="cross" onClick={props.action}>
          <FaTimes></FaTimes>
        </div>
        <div className="model-content create-post">
          <div className="upload">
            <div className="title">
              <p>create new post</p>
            </div>
            <div className="files">
              <img src={drop} alt="drag and drop" />
              <p>Drag photos and videos here</p>
              <input type="file" name="upload" onChange={handlechangeUpload} />
            </div>
            {/* <button onClick={props.action} className="nextbtn">next</button> */}
            <p className="cancel" onClick={props.action}>
              Cancel
            </p>
          </div>
          <div className="postDetails">
            <div className="userProfile">
            {
                   userImg ? <img  src={`data:image/png;base64,${userImg}`} alt="user image" />:
                   <img  src={st1} alt="user image"/>
               }
              <p>{user.username}</p>
            </div>
            <div className="desc">
              <textarea
                placeholder={"Write a caption...."}
                onChange={handlechange}
                name="title"
              ></textarea>
              <input
                type="text"
                name="location"
                onChange={handlechange}
                placeholder="Add location...."
              />
            </div>
            <p className="cancel share" onClick={props.action}>
              <Link href="/#/home" onClick={handleClickCreatePost}>
                Share
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePost;
