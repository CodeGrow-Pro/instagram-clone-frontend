import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import token from '../../configs/authentication';
import OtherProfile from './OtherProfile';
import Profile from './Profile';
function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
const PostOtherUser = () => {
    const userId = useQuery()
    const [post, setPost] = useState([]);
      const getPostotheruserPosts = () => {
        axios({
          method: "get",
          url: `https://instagram-apis.onrender.com/instagram/v1/post/friend?${userId}`,
          headers: token,
        }).then((res) => {
          const data = res.data.posts;
          setPost(data);
        }).catch((error)=>{
          console.log(error.message)
        });
      };
    useEffect(() => {
          getPostotheruserPosts()
    }, []);
    return (
      <div>
        <OtherProfile active="active" />
        <section className="postsByuser">
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
}

export default PostOtherUser