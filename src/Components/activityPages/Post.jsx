import React, { useEffect, useState } from "react";
import Profile from "../ProfilePages/Profile";
import "./Post.css";
import post1 from "../../images/post.jpg";
import axios from "axios";
import token from "../../configs/authentication";
import { useLocation } from "react-router-dom";
const Post = (props) => {
  const [post, setPost] = useState([]);
    const getPost = () => {
      axios({
        method: "get",
        url: "https://instagram-apis.onrender.com/instagram/v1/post/find",
        headers: token,
      }).then((res) => {
        const data = res.data.posts;
        setPost(data);
      }).catch((error)=>{
        console.log(error.message)
      });
    };
  useEffect(() => {
        getPost();
  }, []);
  return (
    <div>
      <Profile active="active" />
      <section className="postsByuser">
        <div className="post">
          {post.map((item) => {
            console.log(item)
            return (
              <img
                src={item.image}
                key={item._id}
                alt="post1"
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Post;
