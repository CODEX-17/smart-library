import React, { useEffect, useRef, useState } from 'react'
import style from './CreateAccount.module.css'
import logo from '../assets/logo-yellow.png'
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import axios from 'axios'
import LoadingComponents from '../components/LoadingComponents';
import { useNavigate, useParams } from 'react-router-dom';

const CreateAccount = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [acctType, setAcctType] = useState('student')
  const [loadingState, setLoadingState] = useState(true)
  const [image, setImage] = useState(null)

  const adminAccess = useParams(null)

  const [mixChar, setMixChar] = useState(false)
  const [specialChar, setSpecialChar] = useState(false)
  const [validLenghtChar, setValidLenghtChar] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [isToast, setIsToast] = useState(false)

  const navigate = useNavigate()

  const inputFile = useRef(null)


  useEffect(() => {
    console.log(adminAccess)
    
    setTimeout(() => {
      setLoadingState(false)
    }, 2000);

    if (password && email) {

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

    if (email.length > 1 && validLenghtChar && mixChar && specialChar) {
      setBtnDisabled(false)
    }else {
      setBtnDisabled(true)
    }

  },[password,email])

  const generateUniqueId = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const length = 8
    let result = ''
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length)
        result += charset.charAt(randomIndex)
    }
    return result
  }

  const hasLowerAndUpperCase = (value) => {
    return /[a-z]/.test(value) && /[A-Z]/.test(value)
    
  }

 const hasNumberAndSymbols = (value) => {
    return /[0-9]/.test(value) && /[!@#$%^&*()]/.test(value)
 }

  const handleSubmit = (e) => {
    e.preventDefault()

    setLoadingState(true)

    if (password) {

        const uniqueID = generateUniqueId()
        const formData = new FormData

        formData.append('email', email)
        formData.append('password', password)
        formData.append('acctype', acctType)

        if (image) {
          formData.append('file', image)
          formData.append('imageID', uniqueID)
        }else {
          formData.append('imageID', 'default')
        }

        axios.post('http://localhost:5001/account/createAccount', formData)
        .then((res) => {
            const data = res.data

            console.log(data)
            const message = data.message

            console.log(message)

            setIsToast(true)

            setTimeout(() => {
              setLoadingState(false)
            }, 2000);

            setTimeout(() => {
              setIsToast(false)
            }, 10000);

        })
        .catch((error) => {
            console.log(error)
        })

    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    setImage(file)
  }

  return (
    <div className={style.container}>
      {
        loadingState && (
          <div className={style.loading}>
            <LoadingComponents/>
          </div>
        )
      }

      {
        isToast && (
          <div className={style.toast}>
            Successfully created an account.
          </div>
        )
      }

      <form onSubmit={handleSubmit}>
        <div className='container mb-2'>
          <div className={style.head}>
            <img src={logo} alt="logo" />
            <h1>Create account</h1>
          </div>
          <div className={style.content}>

            <div className={style.contentTop}>
              <div className={style.left}>
                {
                  // adminAccess?.length > 0 &&
                  adminAccess &&
                    <div className={style.acctTypeContainer}>
                      <label>Account Type:</label>
                      <input 
                        type="radio"
                        checked={ acctType === 'admin' ? true : false } 
                        onChange={() => setAcctType('admin')}
                      />
                      <p>Admin account</p>
                      <input 
                        type="radio" 
                        checked={ acctType === 'student' ? true : false } 
                        onChange={() => setAcctType('student')}
                      />
                      <p>Student account</p>
                    </div>
                }
                <div className="input-group mb-2">
                    <span className="input-group-text">Email Address</span>
                    <input className="form-control" type='email' onChange={(e) => setEmail(e.target.value)} required></input>
                </div>
                <div className="input-group mb-2">
                    <span className="input-group-text">Password</span>
                    <input className="form-control" aria-label="With textarea" onChange={(e) => setPassword(e.target.value)} required></input>
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
              </div>

              <div className={style.right}>
                <div className={style.circleUpload} onClick={() => inputFile.current.click()}>
                  {
                    image ? <img src={URL.createObjectURL(image)} alt="logo" id={style.imgPreview} /> : 'Click to upload image here.'
                  }
                </div>
                <input type="file" style={{ display: 'none' }} ref={inputFile} onChange={handleFileUpload}/>
              </div>
            </div>

            <div className={style.contentBot}>
              <div className='d-flex flex-column'>
                <div className="input-group mb-2">
                    <span className="input-group-text">Library Card Number</span>
                    <input className="form-control" type='email' onChange={(e) => setEmail(e.target.value)} required></input>
                </div>
                <div className="input-group mb-2">
                    <span className="input-group-text">Firstname</span>
                    <input className="form-control" aria-label="With textarea" onChange={(e) => setPassword(e.target.value)} required></input>
                </div>
                <div className="input-group mb-2">
                    <span className="input-group-text">Middlename</span>
                    <input className="form-control" aria-label="With textarea" onChange={(e) => setPassword(e.target.value)} required></input>
                </div>
                <div className="input-group mb-2">
                    <span className="input-group-text">Lastname</span>
                    <input className="form-control" aria-label="With textarea" onChange={(e) => setPassword(e.target.value)} required></input>
                </div>
                <div className='d-flex gap-2'>
                  <div className="input-group mb-2">
                      <span className="input-group-text">Contact Number</span>
                      <input className="form-control" type='tel' aria-label="With textarea" onChange={(e) => setPassword(e.target.value)} required></input>
                  </div>
                  <div className="input-group mb-2">
                    <span className="input-group-text">Gender</span>
                      <select className='form-select'>
                        <option value="" selected>Select gender</option>
                        <option value="male" >Male</option>
                        <option value="female" >Female</option>
                      </select>
                  </div>
                </div>
                <div className="input-group mb-2">
                    <span className="input-group-text">Street Address</span>
                    <input className="form-control" aria-label="With textarea" onChange={(e) => setPassword(e.target.value)} required></input>
                </div>
                <div className='d-flex gap-2'>
                  <div className="input-group mb-2">
                      <span className="input-group-text">City</span>
                      <select className='form-select'>
                        <option value="" selected>Select city</option>
                        <option value="male" >Male</option>
                        <option value="female" >Female</option>
                      </select>
                  </div>
                  <div className="input-group mb-2">
                    <span className="input-group-text">Birthdate</span>
                    <input className="form-control" type='date' aria-label="With textarea" onChange={(e) => setPassword(e.target.value)} required></input>
                  </div>
                </div>
            
              </div>
            </div>

          </div>
          <div className={style.btnMenu}>
            <button disabled={btnDisabled} type='submit'>Create Account</button>
            <button style={{ backgroundColor: '#38b6ff' }} id={style.btnLogin} onClick={ () => navigate('/login')}>Back to Login</button>
          </div>
          
        </div>
        
      </form>
    </div>
    
  )
}

export default CreateAccount
