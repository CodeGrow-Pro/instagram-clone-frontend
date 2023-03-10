import React from 'react'
import './Model.css'
const Model = (props) => {
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
                <p>About this account</p>
                <p onClick={props.editpopup}>Cancel</p>
            </div>
        </div>
    </div>
  )
}

export default Model