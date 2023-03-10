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
import save2 from '../../images/save-instagram.png'
import imageMaker from "../../imageConverter/imageMaker";
import axios from "axios";
import token from "../../configs/authentication";
const RecentPost = (props) => {
  // const [user,setUser] = useState()
  const [like, setLike] = useState({
    icon: love,
    style: "post-like",
    status: false,
    id:"",
    count:15
  });
  const [saved,setSaved] = useState({
    icon:save,
    status:false,
    style:"edit"
  })
  const handleClickLike = (data) => {
    if (like.status) {
      setLike({
        icon: love,
        style: "post-like",
        status: false,
        id:"",
        count:like.count-1
      });
    } else {
      setLike({
        icon: RedLove,
        style: "post-like-red",
        status: true,
        id:data,
        count:like.count+1
      });
    }
    // axios({
    //   method:"PUT",
    //   url:"",
    //   headers:token,
    //   data:{}
    // }).then((res)=>{
    //   alert("like successfully")
    // }).catch((err)=>{
    //   console.log(err.message)
    // })
  };
  const handleClickSave = (e)=>{
       e.preventDefault()
       if(saved.status){
           setSaved({
            icon:save,
            status:false,
            style:"edit"
          })
       }else{
        setSaved({
          icon:save2,
          status:true,
          style:"edit2"
        })
       }
  }
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
  const [comment,setComment] = useState({
      comment:""
      })
  const handlechangeComment = (e)=>{
           e.preventDefault()
           const {name,value} = e.target
           setComment({[name]:value})
  }
  const addComment = (postId)=>{
    const sendData = {comment:comment.comment,postId}
       axios({
        method:"PUT",
        url:"http://localhost:5600/instagram/v1/post/add-comment",
        headers:token,
        data:sendData
       }).then((res)=>{
        setComment({
          comment:""
        })
           alert("add comment successfully")
       }).catch((err)=>{
        console.log(err.message)
       })
  }
  const [user,setUser] = useState()
  const getUser = () => {
    axios({
      method: "get",
      url: "http://localhost:5600/instagram/v1/user/find",
      headers: token,
    })
      .then((res) => {
           const data = res.data.users
           setUser(data)
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    getUser()
    getPostAll();
  }, []);

  return (
    <div>
      <div className="recent-post-body">
        {posts.map((post,index)=>{
          post.userId = user._id
          post.username = user.username
          post.userImage = user.avtar
          const image = imageMaker(post.image)
          return (
            <div className="recent-post" key={index}>
          <div className="head">
            <div>
              <span>
                <img src={st1} alt="userprofile" className="userprofile" />
                <p>username</p> 5d
              </span>
            </div>
            <img src={edit} alt="edit" onClick={props.editpopup} className="edit" />
          </div>
          <div className="media">
          <img
                  src={`data:image/png;base64,${image}`}
                  alt="post image"
                  onClick={()=>props.action(post)}
                />
          </div>
          <div className="head">
            <div>
              <span>
                <img
                  src={like.icon}
                  alt="userprofile"
                  onClick={()=>handleClickLike(post._id)}
                  className={like.style}
                />
                <img src={commentImg} alt="comment" onClick={()=>props.action(post)} className="post-like"/>
                <img src={share} alt="share" className="post-like share" />
              </span>
              <div className="likes">
                <p>{like.count} likes</p>
                Liked by <strong>althea_coser</strong> and <strong>others</strong>
                <br />
                <strong>pxtarts_ </strong> {post.title} ...More
                <p className="viewcomment" onClick={()=>props.action(post)}>View all 12 comments</p>
             <div className="comment-hide">
             {
                  post.comment.map((com,index)=>{
                    console.log(index)
                    return (
                      <>
                      <strong>pxtarts_ {index}</strong> {com} <br />
                      </>
                    )
                  })
                 }
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
                  <button className="postbtn" onClick={()=>addComment(post)}>Post</button>
                </div>
                <hr className="break" />
              </div>
            </div>
            <img src={saved.icon} alt="save" onClick={handleClickSave} className={saved.style}/>
          </div>
        </div>
          )
        })}
      </div>
    </div>
  );
};

export default RecentPost;
