import React from 'react'
import style from './DeleteNotifComponents.module.css'

const DeleteNotifComponents = ({ handleDeleteResponse }) => {

  const handleResponse = (data) => {
    handleDeleteResponse(data)
  }

  return (
    <div className={style.container}>
        <div className={style.card}>
            <h1>Are you sure you want to delete?</h1>
            <div className='d-flex gap-2'>
                <button onClick={() => handleResponse(true)}>Yes</button>
                <button style={{ backgroundColor: '#B8001F' }} onClick={() => handleResponse(false)}>No</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteNotifComponents
