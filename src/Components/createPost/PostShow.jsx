import React, { useEffect, useState } from "react";
import "./PostShow.css";
import userImg from "../../images/pp4.jpeg";
import postImg from "../../images/post.jpg";
import { Link } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import imageMaker from "../../imageConverter/imageMaker";
import axios from "axios";
import token from "../../configs/authentication";
const PostShow = (props) => {
  const checkComment = props.post.comment ? true:false;
  const comment = props.post.comment
  const image =props.post.image
  return (
    <div>
      <div className={`model ${props.style}`}>
        <div className="cross" onClick={()=>props.action(props.post,props.postUser[0],props.postUser[1])}>
          <FaTimes></FaTimes>
        </div>
        <div className="model-content create-post " id="show-post">
          <div className="upload">
            <div className="files" id="post-image">
              <img src={image} alt="post" />
            </div>
          </div>
          <div className="postDetails">
            <div className="userProfile">
              {
                props.postUser[1]?<img src={props.postUser[1]}alt="" />:<img src={userImg} alt="" />
              }
              <p>{props.postUser[0]}</p>
            </div>
            <div className="comments">
              {checkComment ?
                comment.map((com, index) => {
                  return (
                    <div className="comment-body" key={index}>
                      <div className="comments-user">
                        <img src={userImg} alt="comment user" />
                      </div>
                      <p>{com}</p>
                    </div>
                  )
                }):""}
            </div>
            <div className="comment-inputs">
              <input type="text" placeholder="Add a comment..." />
              <button>Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostShow;
