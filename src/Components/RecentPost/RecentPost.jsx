import React, { useEffect, useState } from "react";
import "./RecentPost.css";
import st1 from "../../images/pp1.png";
import edit from "../../images/edit.svg";
import post from "../../images/post.jpg";
import love from "../../images/love2.png";
import commentImg from "../../images/comment.svg";
import RedLove from "../../images/heart.png";
import share from "../../images/share.svg";
import save from "../../images/save.svg";
import save2 from "../../images/save-instagram.png";
import imageMaker from "../../imageConverter/imageMaker";
import axios from "axios";
import token from "../../configs/authentication";
const RecentPost = (props) => {
  // const [user,setUser] = useState()
  const userId = localStorage.getItem("Id");
  const [like, setLike] = useState("");
  const [saved, setSaved] = useState({
    icon: save,
    status: false,
    style: "edit",
  });
  const handleClickLike = (data) => {
    const dataSend = {postid:data[0],status:data[1]}
    axios({
      method: "put",
      url:"http://localhost:5600/instagram/v1/post/like",
      headers: {Auth:token.Auth,"Content-Type":"application/json"},
      data:dataSend ,
    })
      .then((res) => {
        // alert("like successfully");
        window.location.reload()
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleClickSave = (data) => {
    if (saved.status) {
      setSaved({
        icon: save,
        status: false,
        style: "edit",
      });
    } else {
      setSaved({
        icon: save2,
        status: true,
        style: "edit2",
      });
    }
    const dataSend = {postid:data[0],status:data[1]}
    axios({
      method: "put",
      url:"http://localhost:5600/instagram/v1/post/save",
      headers: {Auth:token.Auth,"Content-Type":"application/json"},
      data:dataSend ,
    })
      .then((res) => {
        // alert("save successfully");
        window.location.reload()
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const [posts, setPosts] = useState([]);
  const getPostAll = () => {
    axios({
      method: "get",
      url: "http://localhost:5600/instagram/v1/post/fetch",
      headers: token,
    })
      .then((res) => {
        const data = res.data.posts;
        setPosts(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const [comment, setComment] = useState({
    comment: "",
  });
  const handlechangeComment = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setComment({ [name]: value });
  };
  const addComment = (postId) => {
    const sendData = { comment: comment.comment, postId };
    axios({
      method: "PUT",
      url: "http://localhost:5600/instagram/v1/post/add-comment",
      headers: token,
      data: sendData,
    })
      .then((res) => {
        setComment({
          comment: "",
        });
        alert("add comment successfully");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const [user, setUser] = useState();
  const [allUsers,setAllUsers] = useState([])
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
   const getAllUsers = ()=>{
    axios({
      method: "get",
      url: `http://localhost:5600/instagram/v1/user/filter`,
      headers: token,
    })
      .then((res) => {
        const data=  res.data.users
        setAllUsers(data)
      })
      .catch((err) => {
        console.log(err.message);
      });
   }
  useEffect(() => {
    getUser();
    getPostAll();
    getAllUsers()
  }, []);

  return (
    <div>
      <div className="recent-post-body">
        {posts.map((post, index) => {
          const image = imageMaker(post.image);
          const time = new Date(Number(post.createdAt)).getDay()
          return (
            <div className="recent-post" key={index}>
              <div className="head">
                <div>
                  <span>
                    <img src={st1} alt="userprofile" className="userprofile" />
                    <p>{"username"}</p> {time}d
                  </span>
                </div>
                <img
                  src={edit}
                  alt="edit"
                  onClick={() => props.editpopup(post.userId[0])}
                  className="edit"
                />
              </div>
              <div className="media">
                <img
                  src={`data:image/png;base64,${image}`}
                  alt="post image"
                  onClick={() => props.action(post)}
                />
              </div>
              <div className="head">
                <div>
                  <span>
                    {
                    post.likes.includes(userId) ? (
                      <img
                        src={RedLove}
                        alt="like"
                        onClick={() => handleClickLike([post._id,false])}
                        className="post-like-red"
                      />
                    ) : (
                      <img
                        src={love}
                        alt="Unlike"
                        onClick={() => handleClickLike([post._id,true])}
                        className="post-like"
                      />
                    )}
                    <img
                      src={commentImg}
                      alt="comment"
                      onClick={() => props.action(post)}
                      className="post-like"
                    />
                    <img src={share} alt="share" className="post-like share" />
                  </span>
                  <div className="likes">
                    <p>{post.likes.length} likes</p>
                    Liked by <strong>althea_coser</strong> and{" "}
                    <strong>others</strong>
                    <br />
                    <strong>pxtarts_ </strong> {post.title} ...More
                    <p
                      className="viewcomment"
                      onClick={() => props.action(post)}
                    >
                      View all 12 comments
                    </p>
                    <div className="comment-hide">
                      {post.comment.map((com, index) => {
                        return (
                          <>
                            <strong>pxtarts_ {index}</strong> {com} <br />
                          </>
                        );
                      })}
                    </div>
                    <div className="comment">
                      <input
                        id="comment"
                        className="addComment"
                        type="text"
                        name="comment"
                        placeholder="Add a comment..."
                        defaultValue={comment.comment}
                        onChange={handlechangeComment}
                      />
                      <button
                        className="postbtn"
                        onClick={() => addComment(post._id)}
                      >
                        Post
                      </button>
                    </div>
                    <hr className="break" />
                  </div>
                </div>
                {
                  post.postSave.includes(userId)?
                  <img
                  src={save2}
                  alt="save"
                  onClick={()=>handleClickSave([post._id,false])}
                  className='edit2'
                />:
                <img
                  src={save}
                  alt="unsave"
                  onClick={()=>handleClickSave([post._id,true])}
                  className={'edit2'}
                />
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentPost;
