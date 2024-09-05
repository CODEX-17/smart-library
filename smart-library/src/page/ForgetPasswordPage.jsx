import React, { useState } from 'react'
import axios from 'axios'
import style from './ForgetPasswordPage.module.css'

const ForgetPasswordPage = () => {

  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5001/account/forgotPassword', { email })
      alert('Reset link sent to your email')
    } catch (error) {
      console.error('There was an error sending the reset link!', error)
    }

  }

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit}>
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
  )
}

export default ForgetPasswordPage
