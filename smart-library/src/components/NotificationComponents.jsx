import React from 'react'
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import style from './NotificationComponents.module.css'
import notificationStore from '../Store/notificationStore';

const NotificationComponents = () => {

  const { message, notifStatus } = notificationStore()

  const color = notifStatus ? '#1F4529' : '#AF1740' || '#AF1740'

  return (
    <div className={style.card} style={{ backgroundColor: color }}>
        {
            notifStatus ?
                <AiFillCheckCircle size={25} color='white'/> :
                <AiFillCloseCircle size={25} color='white'/>
        }
        <p>{message}</p>
    </div>
  )
}

export default NotificationComponents
