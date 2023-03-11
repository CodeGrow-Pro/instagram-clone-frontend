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
  const [comment,setComment] = useState("")
  const image = imageMaker(props.post.image);
  return (
    <div>
      <div className={`model ${props.style}`}>
        <div className="cross" onClick={props.action}>
          <FaTimes></FaTimes>
        </div>
        <div className="model-content create-post " id="show-post">
          <div className="upload">
            <div className="files" id="post-image">
              <img src={`data:image/png;base64,${image}`} alt="post" />
            </div>
          </div>
          <div className="postDetails">
            <div className="userProfile">
              <img src={userImg} alt="" />
              <p>Username</p>
            </div>
            <div className="comments">
              <div className='comment-body'>
                  <div className='comments-user'>
             <img src={userImg} alt="comment user" />
             <p>username</p>
             </div>
             
             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi laborum corporis libero.</p>
                  </div>
                  <div className='comment-body'>
                  <div className='comments-user'>
             <img src={userImg} alt="comment user" />
             <p>username</p>
             </div>
             
             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi laborum corporis libero.</p>
                  </div>
                  <div className='comment-body'>
                  <div className='comments-user'>
             <img src={userImg} alt="comment user" />
             <p>username</p>
             </div>
             
             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi laborum corporis libero.</p>
                  </div>
                  <div className='comment-body'>
                  <div className='comments-user'>
             <img src={userImg} alt="comment user" />
             <p>username</p>
             </div>
             
             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi laborum corporis libero.</p>
                  </div>
                  <div className='comment-body'>
                  <div className='comments-user'>
             <img src={userImg} alt="comment user" />
             <p>username</p>
             </div>
             
             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi laborum corporis libero.</p>
                  </div>
                  <div className='comment-body'>
                  <div className='comments-user'>
             <img src={userImg} alt="comment user" />
             <p>username</p>
             </div>
             
             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi laborum corporis libero.</p>
                  </div>
              {!comment ??
                comment.map((com, index) => {
                  return (
                    <div className="comment-body" key={index}>
                      <div className="comments-user">
                        <img src={userImg} alt="comment user" />
                        <p>{index}</p>
                      </div>
                      <p>{com}</p>
                    </div>
                  );
                })}

              <div className="comment-body">
                <div className="comments-user">
                  <img src={userImg} alt="comment user" />
                  <p>username</p>
                </div>
                {!comment ??
                  comment.map((com, index) => {
                    return <p key={index}>{com}</p>;
                  })}
              </div>
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
