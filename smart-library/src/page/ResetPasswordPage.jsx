import React, {useState, useEffect} from 'react'
import style from './ResetPasswordPage.module.css'
import axios from 'axios';
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom'

const ResetPasswordPage = () => {

const { token } = useParams(null); 
const [password, setPassword] = useState('');
const [isToast, setIsToast] = useState(false)

const [mixChar, setMixChar] = useState(false)
const [specialChar, setSpecialChar] = useState(false)
const [validLenghtChar, setValidLenghtChar] = useState(false)
const [btnDisabled, setBtnDisabled] = useState(true)

const [isShowPassword, setIsShowPassword] = useState(false)
const navigate = useNavigate()

const [isProcessDone, setIsProcessDone] = useState(false)

const hasLowerAndUpperCase = (value) => {
  return /[a-z]/.test(value) && /[A-Z]/.test(value)
}

const hasNumberAndSymbols = (value) => {
  return /[0-9]/.test(value) && /[!@#$%^&*()]/.test(value)
}

useEffect(() => {
  if (!token) {
    navigate('/')
  }
},[])

useEffect(() => {

  if (password && token) {

    if (password.length > 12) {
      setValidLenghtChar(true)
    }else {
      setValidLenghtChar(false)
    }

    if (hasLowerAndUpperCase(password)) {
      setMixChar(true)
    }else {
      setMixChar(false)
    }

    if (hasNumberAndSymbols(password)) {
      setSpecialChar(true)
    }else {
      setSpecialChar(false)
    }
    
  }

  if (token.length > 1 && validLenghtChar && mixChar && specialChar) {
    setBtnDisabled(false)
  }else {
    setBtnDisabled(true)
  }

},[password])

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://82.112.236.213:5001/account/reset-password/${token}`, { password });
      setIsToast(true)
      setTimeout(() => {
        setIsToast(false)
        setIsProcessDone(true)
      }, 3000);
    } catch (error) {
      console.error('There was an error resetting the password!', error);
    }
};

  return (
    <div className={style.container}>
      {
        isToast && (
          <div className={style.toast}>
            Password has been reset.
          </div>
        )
      }
      {
        isProcessDone ? 
        (
          <div className={style.doneDiv}>
            <p>Password Successfully Reset.</p>
            <button onClick={() => navigate('/login')}>Login</button>
          </div>    
        ) : 
        (
          <div className='container d-flex flex-column gap-2'>  
            <form onSubmit={handleSubmit}>
              <h1>Reset Password</h1>
              <div className={style.inputPasswordDiv}>
                <input 
                    type={isShowPassword ? "text" : "password" }
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter your new password" 
                    required 
                />
                {
                  isShowPassword ? 
                    <IoMdEyeOff size={25} cursor={'pointer'} color='gray' onClick={() => setIsShowPassword(!isShowPassword)}/>
                    :
                    <IoMdEye size={25} cursor={'pointer'} color='gray' onClick={() => setIsShowPassword(!isShowPassword)}/>
                }
                
                
              </div>
    
              {
                  password.length > 1 &&
                  <div className={style.checkPassDiv}>
                    <p>{validLenghtChar ? <FaCheck size={10} color='green'/> : <ImCross size={10} color='red'/>}  at least 12 characters long.</p>
                    <p>{mixChar ? <FaCheck size={10} color='green'/> : <ImCross size={10} color='red'/>} contains a mix of uppercase and lowercase letters.</p>
                    <p>{specialChar ? <FaCheck size={10} color='green'/> : <ImCross size={10} color='red'/>} includes numbers and special characters.</p>
                  </div>
              }
              <p className={style.info}>Passwords must include a mix of uppercase and lowercase letters, numbers, and special characters to ensure strong security.</p>
              <button type="submit" disabled={btnDisabled}>Reset Password</button>
            </form>
          </div>

        )
      }
    </div>
  )
}

export default ResetPasswordPage
