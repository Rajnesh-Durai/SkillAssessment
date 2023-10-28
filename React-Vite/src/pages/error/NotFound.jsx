import React from 'react'
import ErrorImg from '../../assets/Error.jpg'

const NotFound = () => {
  return (
    <div className='error-container'>
            <img src={ErrorImg} className='error-image'/>
        </div>
  )
}

export default NotFound