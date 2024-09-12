import React from 'react'
import style from './FeedbackComponents.module.css'

const FeedbackComponents = () => {
  return (
    <div className={style.container}>
      <h1>Feedback</h1>
      <div className={style.content}>
        <p>If you have any suggestions or questions, please feel free to leave a comment in the input box below.</p>
        <textarea placeholder='Your feedback or question here...' maxlength="500"></textarea>
        <button>Submit</button>
      </div>
    </div>
  )
}

export default FeedbackComponents
