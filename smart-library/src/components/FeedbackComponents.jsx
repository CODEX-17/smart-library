import React, { useEffect, useState } from 'react'
import style from './FeedbackComponents.module.css'
import axios from 'axios'

const FeedbackComponents = () => {

  const [isToast, setIsToast] = useState(false)
  const [message, setMessage] = useState('')
  let currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
  let currentDate = new Date().toDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric',
          weekday: 'short' 
  })

  const handleSubmit = () => {

    const data = {
      message,
      date: currentDate,
      time: currentTime,
    }

    setIsToast(true)

    axios.post('http://localhost:5001/feedback/addFeedback', data)
    .then((res) => {
      const result = res.data
      const message = result.message
      console.log(message)
      setTimeout(() => {
        setIsToast(false)
        handleClear()
      }, 5000);

    }).catch((err) => console.log(err))
    
  }

  return (
    <div className={style.container}>
      {       
        isToast && (
          <div className={style.toast}>
            Successfully submit feedback.
          </div> 
        )
      }
      <h1>Feedback</h1>
        <div className={style.content}>
          <form action="" onSubmit={handleSubmit}>
            <p>If you have any suggestions or questions, please feel free to leave a comment in the input box below.</p>
            <textarea value={message} placeholder='Your feedback or question here...' maxlength="500" onChange={(e) => setMessage(e.target.value)} required></textarea>
            <button type='submit'>Submit</button>
          </form>
        </div>
    </div>
  )
}

export default FeedbackComponents
