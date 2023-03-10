import { Link } from '@mui/material';
import React from 'react'
import imageMaker from '../../imageConverter/imageMaker';

const Story = (props) => {
    const userImg = imageMaker(props.user.avtar)
  return (
    <div>
        <div className="story" key={props.user._id} id="story">
              <Link href={`/#/friend?id=${props.user._id}`}>
                <img src={`data:image/png;base64,${userImg}`} alt="" width={"60px"} height={"60px"} />
                <p className="username">{props.user.username}</p>
              </Link>
            </div>
    </div>
  )
}

export default Story