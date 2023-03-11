import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import post1 from "../../images/post.jpg";
import "./Explore.css";
import axios from "axios";
import token from "../../configs/authentication";
const Explore = () => {
  const [post, setPost] = useState([]);
  const getPostAll = () => {
    axios({
      method: "get",
      url: "https://instagram-apis.onrender.com/instagram/v1/post/fetch",
      headers: token,
    })
      .then((res) => {
        const data = res.data.posts;
        setPost(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getPostAll();
  }, []);
  return (
    <div>
      <Navbar />
      <section className="postsByuser explore">
        <div className="post">
          {post.map((item) => {
            const base64String = btoa(
              String.fromCharCode(...new Uint32Array(item.image.data))
            );
            return (
              <img
                src={`data:image/png;base64,${base64String}`}
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

export default Explore;
