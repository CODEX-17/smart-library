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
  const [firstname, setFirstname] = useState('')
  const [middlename, setMiddlename] = useState('')
  const [lastname, setLastname] = useState('')
  const [contact, setContact] = useState('')
  const [gender, setGender] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [city, setCity] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [cardNumber, setCardNumber] = useState('')

  const cityArray = [
    "ALFONSO",
    "AMADEO",
    "BACOOR",
    "CARMONA",
    "CAVITE-CITY",
    "MAGALLANES",
    "ROSARIO",
    "DASMARINAS-CITY",
    "GEN.-MARIANO-ALVAREZ",
    "GENERAL-EMILIO-AGUINALDO",
    "GENERAL-TRIAS",
    "IMUS",
    "INDANG",
    "KAWIT",
    "MARAGONDON",
    "MENDEZ",
    "NAIC",
    "NOVELETA",
    "SILANG",
    "TAGAYTAY-CITY",
    "TANZA",
    "TERNATE",
    "TRECE-MARTIRES-CITY"
  ]

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
    
    setTimeout(() => {
      setLoadingState(false)
    }, 2000);

    if (password) {

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

    if (cardNumber.length > 1  &&
      firstname.length > 1  &&
      middlename.length > 1  &&
      lastname.length > 1  &&
      contact.length > 1  &&
      email.length > 1  &&
      password.length > 1  &&
      acctType.length > 1  &&
      gender.length > 1  &&
      streetAddress.length > 1  &&
      birthdate.length > 1  &&
      city.length > 1  && 
      email.length > 1 && 
      validLenghtChar && 
      mixChar && 
      specialChar) {
      setBtnDisabled(false)
    }else {
      setBtnDisabled(true)
    }

  },[
    cardNumber,
    firstname,
    middlename,
    lastname,
    contact,
    email,
    password,
    acctType,
    gender,
    streetAddress,
    birthdate,
    city
  ])

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

        formData.append('card_number', cardNumber)
        formData.append('firstname', firstname)
        formData.append('middlename', middlename)
        formData.append('lastname', lastname)
        formData.append('contact', contact)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('acctype', acctType)
        formData.append('gender', gender)
        formData.append('street_address', streetAddress)
        formData.append('birthdate', birthdate)
        formData.append('city', city)

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
              navigate('/login')
            }, 5000);

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
                    <input className="form-control" type='text' onChange={(e) => setCardNumber(e.target.value)} required></input>
                </div>
                <div className="input-group mb-2">
                    <span className="input-group-text">Firstname</span>
                    <input className="form-control" aria-label="With textarea" onChange={(e) => setFirstname(e.target.value)} required></input>
                </div>
                <div className="input-group mb-2">
                    <span className="input-group-text">Middlename</span>
                    <input className="form-control" aria-label="With textarea" onChange={(e) => setMiddlename(e.target.value)} required></input>
                </div>
                <div className="input-group mb-2">
                    <span className="input-group-text">Lastname</span>
                    <input className="form-control" aria-label="With textarea" onChange={(e) => setLastname(e.target.value)} required></input>
                </div>
                <div className='d-flex gap-2'>
                  <div className="input-group mb-2">
                      <span className="input-group-text">Contact Number</span>
                      <input className="form-control" type='tel' aria-label="With textarea" onChange={(e) => setContact(e.target.value)} required></input>
                  </div>
                  <div className="input-group mb-2">
                    <span className="input-group-text">Gender</span>
                      <select className='form-select' onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select gender</option>
                        <option value="male" >Male</option>
                        <option value="female" >Female</option>
                      </select>
                  </div>
                </div>
                <div className="input-group mb-2">
                    <span className="input-group-text">Street Address</span>
                    <input className="form-control" aria-label="With textarea" onChange={(e) => setStreetAddress(e.target.value)} required></input>
                </div>
                <div className='d-flex gap-2'>
                  <div className="input-group mb-2">
                      <span className="input-group-text">City</span>
                      <select className='form-select' onChange={(e) => setCity(e.target.value)}>
                        <option value="">Select city</option>
                        {
                          cityArray.map((city, index) => (
                            <option value={city} key={index}>{city}</option>
                          ))
                        }
                      </select>
                  </div>
                  <div className="input-group mb-2">
                    <span className="input-group-text">Birthdate</span>
                    <input className="form-control" type='date' aria-label="With textarea" onChange={(e) => setBirthdate(e.target.value)} required></input>
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
