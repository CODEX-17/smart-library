import React, { useState } from 'react'
import axios from 'axios'
import style from './ForgetPasswordPage.module.css'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const ForgetPasswordPage = () => {

  const [email, setEmail] = useState('')
  const [isToast, setIsToast] = useState(false)
  const [isShowProcessDone, setIsShowProcessDone] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://82.112.236.213:5001/account/forgotPassword', { email })
      setIsToast(true)
      setTimeout(() => {
        setIsShowProcessDone(true)
        setIsToast(false)
      }, 3000);
    } catch (error) {
      console.error('There was an error sending the reset link!', error)
    }

  }

  return (
    <div className={style.container}>
      {
        isToast && (
          <div className={style.toast}>
            Reset link sent to your email.
          </div>
        )
      }
      {
        isShowProcessDone ? ( 
          <div className={style.doneDiv}>
            <p>Successfully reset link sent, Please check email.</p>
            <button onClick={() => window.open('https://mail.google.com/', '_blank')}>Check Email</button>
          </div>    
        ) : (
          <div className={style.card}>
            <form onSubmit={handleSubmit}>
              <div className='d-flex w-100 flex-column mb-2'>
                <h1>Forget Password</h1>
                <p>Enter your email below to receive the reset link.</p>
              </div>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email" 
                required 
              />
              <div className='w-100 d-flex flex-column gap-3 justify-content-center'>
                <button type="submit">Send Reset Link</button>
                <p 
                  className='fs-6 gap-2 d-flex justify-content-center' 
                  style={{ display: 'flex', alignItems: 'center', cursor: 'pointer'}}
                  onClick={() => navigate('/login')}
                ><FaArrowLeft/>Back to Login</p>
              </div>
             
            </form>
          </div>
        )
      }

      
    </div>
  )
}

export default ForgetPasswordPage
