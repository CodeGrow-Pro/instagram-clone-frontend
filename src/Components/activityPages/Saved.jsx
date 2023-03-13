import axios from 'axios';
import React, { useEffect, useState } from 'react'
import token from '../../configs/authentication';
import Profile from '../ProfilePages/Profile'

const Saved = () => {
  const userId = localStorage.getItem("Id")
  const [post, setPost] = useState([]);
  const getPost = () => {
    axios({
      method: "get",
      url: "https://instagram-apis.onrender.com/instagram/v1/post/fetch",
      headers: token,
    }).then((res) => {
      const data = res.data.posts;
      const savedPost = data.filter((p)=>p.postSave.includes(userId))
      setPost(savedPost);
    }).catch((error)=>{
      console.log(error.message)
    });
  };
useEffect(() => {
      getPost();
}, []);
  return (
    <div>
        <Profile />
        <section className="postsByuser">
        <div className="post">
          {post.map((item) => {
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
  )
}

export default Saved