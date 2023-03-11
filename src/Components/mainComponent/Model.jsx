import { Link } from '@mui/material'
import React, { useState } from 'react'
import './Model.css'
const Model = (props) => {
  const currentUserId = localStorage.getItem("Id")
  console.log(props)
  return (
    <div>
        <div className={`model ${props.style}`}>
            <div className="model-content">
                <p className='selected'>Report</p>
                <p className='selected'>follow</p>
                <p>Add to  favorites</p>
                <p>Go to post</p>
                <p>Share to ...</p>
                <p>Copy link</p>
                <p>Embed</p>
                <p><Link className='selected' href={currentUserId!==props.userId?`/#/friend?id=${props.userId}`:  `/#/profile`}>About this account</Link></p>
                <p onClick={props.editpopup}>Cancel</p>
            </div>
        </div>
    </div>
  )
}

export default Model