import React, { useEffect, useState } from 'react'
import style from './FeedbackComponents.module.css'
import axios from 'axios'
import { VscFeedback } from "react-icons/vsc";
import { useForm } from "react-hook-form";
import { addFeedback } from '../services/feedbackServices';
import { getCurrentDateString, getCurrentTimeString } from '../utils/dateUtils';
import NotificationComponents from './NotificationComponents'


const FeedbackComponents = () => {

  const [notifStatus, setNotifStatus] = useState(true)
  const [message, setMessage] = useState('')
  const [isShowNotification, setIsShowNotification] = useState(false)
  
  const date = getCurrentDateString()
  const time = getCurrentTimeString()

  const { 
    handleSubmit, 
    register, 
    reset,
    formState: {errors} 
  } = useForm({
    defaultValues: {
      date,
      time,
    }
  })

  const notificationConfig = (message, status) => {
    setMessage(message)
    setNotifStatus(status)
    setIsShowNotification(true)
    
    setTimeout(() => {
      setIsShowNotification(false)
      setMessage('')
    }, 3000);
  }

  const onSubmit = async (data) => {
    let updated = data
    if (data.username === '') updated.username = 'anonymous'

    console.log(updated)

    try {
      const result = await addFeedback(updated)
      
      if (result) {
        notificationConfig(result.message, true)
        reset()
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={style.container}>
      {       
        isShowNotification && (
          <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
           <NotificationComponents message={message} status={notifStatus}/>
          </div> 
        )
      }
      <div className={style.card}>
        <div className='d-flex flex-column align-items-center justify-content-center'>
          <VscFeedback color='rgb(91, 90, 90)' size={50}/>
          <h1>Feedback</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.content}>
            <p>If you have any suggestions or questions, please feel free to leave a comment in the input box below.</p>
            <input 
              type="text" 
              placeholder='ex. Juan Dela Cruz (optional)'
              {...register('username')}
            />
            <textarea 
              placeholder='Your feedback or question here...' 
              maxlength="500" 
              {...register('message', { required: 'Message is required.' })}
            ></textarea>
            {errors.message && <p style={{ color: 'red' }}>{errors?.message?.message}</p>}
            <button className='mt-2' type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FeedbackComponents
