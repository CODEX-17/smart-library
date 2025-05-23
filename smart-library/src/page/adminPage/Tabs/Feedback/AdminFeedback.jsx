import React, { useContext, useEffect, useState } from 'react'
import style from './AdminFeedback.module.css'
import { MdDelete } from "react-icons/md";
import { deleteFeedback, getFeedbacks } from '../../../../services/feedbackServices.js';
import { convertDateFormatIntoString, convertTimeTo12HourFormat } from '../../../../utils/dateUtils.js'
import DeleteNotifComponents from '../../../../components/DeleteNotifComponents.jsx';
import NotificationComponents from '../../../../components/NotificationComponents.jsx';
import { NotificationContext } from '../../../../context/notificationContext.jsx';

const AdminFeedback = () => {

  const [feedbackList, setFeedbackList] = useState([])
  const [isShowDeleteNotification, setIsShowDeleteNotification] = useState(false)
  const [isShowNotification, setIsShowNotification] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedData, setSelectedData] = useState(null)
  const userDetails = JSON.parse(localStorage.getItem('user'))

  const { notify } = useContext(NotificationContext)

  useEffect(() => {

    const fetchData = async () => {
      try {
        const result = await getFeedbacks()
        
        if (result) {
          const updated = result.filter((data) => data.branch === userDetails?.branch)
          setFeedbackList(updated)
        }

      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  },[message])

  const handleDeleteResponse = async (data) => {
    if (data && selectedData) {
      const id = selectedData.id

      try {
        const result = await deleteFeedback(id)
        setIsShowDeleteNotification(false)
        notify(result.message, true)
      } catch (error) {
        console.log(error)
      }
    }else {
      setIsShowDeleteNotification(data)
    }
  }

  const handleDelete = (data) => {
    setSelectedData(data)
    setIsShowDeleteNotification(true)
  }

  
  return (
    <div className={style.container}>
      {
        isShowNotification && 
        <div style={{ display: 'flex', position: 'absolute', top: '10px', right: '10px' }}>
          <NotificationComponents message={message} status={notifStatus}/>
        </div>
      }
      {
        isShowDeleteNotification && 
        <div className='d-flex align-items-center justify-content-center w-100 h-100 position-absolute'>
          <DeleteNotifComponents handleDeleteResponse={handleDeleteResponse}/>
        </div>
      }
      <div className={style.cardList}>
        {
          feedbackList.length > 0 ?
            feedbackList.map((data, index) => (
              <div className={style.card} key={index}>
                <div className='d-flex w-100 align-items-center justify-content-between mb-4'>
                  <h3>{data.username}</h3>
                  <MdDelete size={25} color='#AF1740' title='delete' cursor={'pointer'} onClick={() => handleDelete(data)}/> 
                </div>
                <p>{data.message}</p>
                <p style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>{`${convertDateFormatIntoString(data.date)} (${convertTimeTo12HourFormat(data.time)})`}</p>
              </div>
            )) :
            <div className='d-flex w-100 h-100 align-items-center justify-content-center position-absolute'>
              <p className='fs-2 fs-bold' style={{ fontFamily: 'bold' }}>No Feedback Data.</p>
            </div>
        }

      
      </div>
    </div>
  )
}

export default AdminFeedback
