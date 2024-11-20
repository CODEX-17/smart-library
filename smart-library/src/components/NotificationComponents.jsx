import React from 'react'
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import style from './NotificationComponents.module.css'

const NotificationComponents = ({ message, status }) => {

  const color = status ? '#1F4529' : '#AF1740' || '#AF1740'
  const statusContent = status || false
  const content = message || 'no content.'

  return (
    <div className={style.card} style={{ backgroundColor: color }}>
        {
            statusContent ?
                <AiFillCheckCircle size={25} color='white'/> :
                <AiFillCloseCircle size={25} color='white'/>
        }
        <p>{content}</p>
    </div>
  )
}

export default NotificationComponents
