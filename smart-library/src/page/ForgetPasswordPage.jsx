import React, { useState } from 'react'
import axios from 'axios'
import style from './ForgetPasswordPage.module.css'

const ForgetPasswordPage = () => {

  const [email, setEmail] = useState('')
  const [isToast, setIsToast] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5001/account/forgotPassword', { email })
      setIsToast(true)
      setTimeout(() => {
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
      <div className='container d-flex flex-column gap-2'>
        <form onSubmit={handleSubmit}>
          <h1>Forget Password</h1>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email" 
            required 
          />
          <button type="submit">Send Reset Link</button>
        </form>
      </div>
      
    </div>
  )
}

export default ForgetPasswordPage
