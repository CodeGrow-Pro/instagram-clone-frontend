import { Link } from '@mui/material';
import React from 'react'
import imageMaker from '../../imageConverter/imageMaker';
import st1 from '../../images/pp1.png'
const Story = (props) => {
    const userImg = imageMaker(props.user.avtar)
  return (
    <div>
        <div className="story" key={props.user._id} id="story">
              <Link href={`/#/friend?id=${props.user._id}`}>
              {
                   userImg ? <img  src={`data:image/png;base64,${userImg}`} alt="user image" width={"60px"} height={"60px"} />:
                   <img  src={st1} alt="user image" width={"60px"} height={"60px"} />
               }
                <p className="username">{props.user.username}</p>
              </Link>
            </div>
    </div>
  )
}

export default Story