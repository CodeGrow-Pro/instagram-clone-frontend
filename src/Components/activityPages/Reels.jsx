import React from 'react'
import './Reels.css'
import './Post.css'
import post1 from '../../images/post.jpg'
import Profile from '../ProfilePages/Profile'
const Reels = (props) => {
  return (
    <div>
    <Profile active={props.active}/>
    <section className="postsByuser">
        <div className="post">
            <video src="" muted controls></video>
            <video src="" muted controls></video>
            <video src="" muted controls></video>
            <video src="" muted controls></video>
            <video src="" muted controls></video>
            <video src="" muted controls></video>
            <video src="" muted controls></video>
            <video src="" muted controls></video>
            <video src="" muted controls></video>
        </div>
    </section>
</div>
  )
}

export default Reels