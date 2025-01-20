import React, { useEffect, useState } from 'react'
import style from './EmailVerifyModal.module.css'
import { IoMdClose } from "react-icons/io";
import { verifyCode } from '../../../services/accountServices';

const EmailVerifyModal = ({ setIsShowModalVerification, hashCode, setVerified }) => {

  const [time, setTime] = useState(120)
  const [isActive, setIsActive] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [code, setCode] = useState()

  useEffect(() => {

    let timer
    if (isActive && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0) {
      setIsActive(false)
      setIsShowModalVerification(false)
    }

    return () => clearInterval(timer)
 
  },[isActive, time])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }

  const handleSubmit = async () => {

    try {
        if (code && hashCode) {
           const data = {code, hashCode}
           const result = await verifyCode(data)

           if (result?.status) {
                setVerified(true)
                setIsShowModalVerification(false)
           }else {
            setErrorMessage('Incorrect Code!')
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000);
            
           }
        }
    } catch (error) {
        console.log(error)
    }

  }


  return (
    <div className={style.container}>
        <div className={style.card}>
            <div className='d-flex w-100 align-items-center justify-content-between mb-3'>
                <h3>Email Verification</h3>
                <IoMdClose size={20} cursor={'pointer'} onClick={() => setIsShowModalVerification(false)}/>
            </div>
            
            <div className='d-flex flex-column w-100 mb-3'>
                <div className='d-flex w-100 align-items-center justify-content-between'>
                    <label>Enter OTP code:</label>
                    <p>TIME: {formatTime(time)}</p>
                </div>
                <input type="number" onChange={(e) => setCode(e.target.value)}/>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
            
            <button onClick={handleSubmit}>Submit</button>
        </div>
      
    </div>
  )
}

export default EmailVerifyModal
