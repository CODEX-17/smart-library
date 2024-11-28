import React, { useEffect, useRef, useState } from 'react'
import style from './CreateAccount.module.css'
import logo from '../assets/logo-yellow.png'
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import axios from 'axios'
import LoadingComponents from '../components/LoadingComponents';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { max } from 'rxjs';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { GrPowerReset } from "react-icons/gr";
import NotificationComponents from '../components/NotificationComponents';

const CreateAccount = () => {

  const [maxCardNumber, setMaxCardNumber] = useState(0)
  const [accountList, setAccountList] = useState([])
  const [branchList, setBranchList] = useState([])
  const url = 'http://localhost:5001'

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

  const [isShowNotification, setIsShowNotification] = useState(false)
  const [message, setMessage] = useState('')
  const [notifStatus, setNotifStatus] = useState(true)

  const navigate = useNavigate()

  const inputFile = useRef(null)
  const location = useLocation()
  const { type } = location.state || {};
  const [showPassword, setIsShowPassword] = useState(false)

  const {
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      card_number: maxCardNumber, 
    }
  })

  useEffect(() => {
    
    axios.get(`${url}/account/getAccounts`)
    .then((res) => {
      const result = res.data

      if (result.length > 0) {
        const maxCardNumber = Math.max(...result.map(data => data.card_number))
        setMaxCardNumber(maxCardNumber)
        if (type === 'guest') {
          setValue('card_number', maxCardNumber + 1)
        }
        setAccountList(result)
      }
      setLoadingState(false)
      
    })
    .catch(err => console.log(err))

    axios.get(`${url}/branch/getBranch`)
    .then((res) => {
      const result = res.data
      setBranchList(result)
    })
    .catch(err => console.log(err))

  },[])

  const password = watch('password')

  const validatePassword = (value) => {
    const validLength = value.length >= 12;
    const mixCase = /[a-z]/.test(value) && /[A-Z]/.test(value);
    const specialChar = /[0-9]/.test(value) && /[\W_]/.test(value);

    if (!validLength) return 'Password must be at least 12 characters long.'
    if (!mixCase) return 'Password must contain both uppercase and lowercase letters.'
    if (!specialChar) return 'Password must include numbers and special characters.'
    
    return true;
  }

  const validateEmail = (value) => {
    const emailExist = accountList.filter((acct) => acct.email === value) || null
    return emailExist.length > 0 ? 'Email is already used.' : true
  }

  const onSubmit = (data) => {

    setLoadingState(true)

    if (password) {

        const formData = new FormData

        formData.append('card_number', data.card_number)
        formData.append('branch', data.branch)
        formData.append('firstname', data.firstname)
        formData.append('middlename', data.middlename)
        formData.append('lastname', data.lastname)
        formData.append('contact', data.contact)
        formData.append('email', data.email)
        formData.append('password', data.password)
        formData.append('acctype', type)
        formData.append('gender', data.gender)
        formData.append('street_address', data.street_address)
        formData.append('birthdate', data.birthdate)
        formData.append('city', data.city)
        formData.append('image', image)

        axios.post('http://localhost:5001/account/createAccount', formData)
        .then((res) => {
            const data = res.data
            const message = data.message
            
            setTimeout(() => {
              setLoadingState(false)
              notificationConfig(message, true)
              reset()
            }, 3000);
            
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

  const notificationConfig = (message, status) => {
    setMessage(message)
    setNotifStatus(status)
    setIsShowNotification(true)

    setTimeout(() => {
     setIsShowNotification(false)
     setMessage('')
    }, 3000);
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
        isShowNotification && (
          <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <NotificationComponents message={message} status={notifStatus}/>
          </div>
        )
      }

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.contentForm}>
          <div className={style.head}>
            <img src={logo} alt="logo" />
            <h1>
              {
                type === 'guest' || !type ?
                'Create Guest Account' : 
                'Create Admin Account'
              }
            </h1>
          </div>
          <div className={style.content}>

            <div className={style.contentTop}>
              <div className={style.left}>
                <div className='d-flex flex-column w-100 mb-2'>
                  <div className="input-group">
                      <span className="input-group-text">Email Address</span>
                      <input 
                        className="form-control" 
                        type='email' 
                        {...register('email', { 
                          required: 'Email is required.',
                          validate: validateEmail 
                        })}
                      ></input>
                  </div>
                  {errors.email && <p id={style.errorMessage}>{errors.email.message}</p>}
                </div>
                
                <div className='d-flex flex-column w-100 mb-2'>
                  <div className="input-group">
                      <span className="input-group-text">Password</span>
                      <input 
                        className="form-control" 
                        type={ showPassword ? 'text' : 'password'}
                        {
                          ...register('password', 
                            { 
                              required: 'Password is required.',
                              validate: validatePassword
                            }
                          )}
                      ></input>
                      {
                        showPassword ?
                         <span className="input-group-text">
                            <FiEyeOff 
                              size={20} 
                              title='Show Password' 
                              color='gray' 
                              cursor={'pointer'}
                              onClick={() => setIsShowPassword(!showPassword)}
                            />
                          </span> :
                          <span className="input-group-text">
                            <FiEye size={20} 
                              title='Show Password' 
                              color='gray' 
                              cursor={'pointer'}
                              onClick={() => setIsShowPassword(!showPassword)}
                            />
                          </span>
                      }
                      
                      
                  </div>
                  {errors.password && <p id={style.errorMessage}>{errors.password.message}</p>}
                </div>

                {
                  password && 
                  password.length > 0 &&
                  <div className={style.checkPassDiv}>
                    <p>
                      {
                        password.length >= 12 ? 
                          <FaCheck size={10} color='green'/> : 
                          <ImCross size={10} color='red'/>
                      }  at least 12 characters long.
                       
                    </p>
                    <p>
                      {
                        /[a-z]/.test(password) && /[A-Z]/.test(password) ? 
                          <FaCheck size={10} color='green'/> : 
                          <ImCross size={10} color='red'/>
                      } contains a mix of uppercase and lowercase letters.
                    </p>
                    <p>
                      {
                        /[0-9]/.test(password) && /[\W_]/.test(password)  ? 
                          <FaCheck size={10} color='green'/> : 
                          <ImCross size={10} color='red'/>
                      } includes numbers and special characters.
                    </p>

                  </div>
                }
                <div className='d-flex w-100'>
                  <p className={style.info}>Passwords must include a mix of uppercase and lowercase letters, numbers, and special characters to ensure strong security.</p>
                </div>
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

                <div className='d-flex gap-2 w-100 mb-2'>
                    <div className='d-flex flex-column w-100 mb-2'>
                      <div className="input-group mb-2">
                          <span className="input-group-text">Library Card Number</span>
                          <input 
                            className="form-control" 
                            type='text'
                            disabled
                            {...register('card_number', { required: 'Card Number is required.' })}
                          ></input>
                      </div>
                      {errors.card_number && <p id={style.errorMessage}>{errors.card_number.message}</p>}
                    </div>

                    <div className='d-flex flex-column w-100 mb-2'>
                      <div className="input-group mb-2">
                          <span className="input-group-text">Branch</span>
                          <select 
                            className='form-select'
                            {...register('branch', { required: 'Branch is required.' })}
                          >
                            <option value="">Select branch</option>
                            {
                              branchList &&
                              branchList.map((branch, index) => (
                                <option value={branch.branch_name} key={index}>{branch.branch_name}</option>
                              ))
                            }
                          </select>
                      </div>
                    </div>
                </div>

                <div className='d-flex flex-column w-100 mb-2'>
                  <div className="input-group mb-2">
                      <span className="input-group-text">Firstname</span>
                      <input 
                        className="form-control" 
                        type='text'
                        {...register('firstname', { required: 'Firstname is required.' })}
                      ></input>
                  </div>
                  {errors.firstname && <p id={style.errorMessage}>{errors.firstname.message}</p>}
                </div>

                <div className='d-flex flex-column w-100 mb-2'>
                  <div className="input-group mb-2">
                      <span className="input-group-text">Middlename (optional)</span>
                      <input 
                        className="form-control" 
                        type='text'
                        {...register('middlename')}
                      ></input>
                  </div>
                </div>

                <div className='d-flex flex-column w-100 mb-2'>
                  <div className="input-group mb-2">
                      <span className="input-group-text">Lastname</span>
                      <input 
                        className="form-control" 
                        type='text'
                        {...register('lastname', { required: 'Lastname is required.'})}
                      ></input>
                  </div>
                  {errors.lastname && <p id={style.errorMessage}>{errors.lastname.message}</p>}
                </div>

                <div className='d-flex gap-2'>

                  <div className='d-flex flex-column w-100 mb-2'>
                    <div className="input-group mb-2">
                        <span className="input-group-text">Contact Number</span>
                        <input 
                          className="form-control" 
                          type='tel'
                          {...register('contact', { 
                            required: 'Contact number is required.',
                            pattern: {
                              value: /^09[0-9]{9}$/,
                              message: "Contact number must start with 09 and contain 11 digits.",
                            },
                          })}
                        ></input>
                    </div>
                    {errors.contact && <p id={style.errorMessage}>{errors.contact.message}</p>}
                  </div>

                  <div className='d-flex flex-column w-100 mb-2'>
                    <div className="input-group mb-2">
                        <span className="input-group-text">Gender</span>
                        <select 
                          className='form-select'
                          {...register('gender', { required: 'Gender is required.' })}
                        >
                          <option value="">Select gender</option>
                          <option value="male" >Male</option>
                          <option value="female" >Female</option>
                        </select>
                    </div>
                    {errors.gender && <p id={style.errorMessage}>{errors.gender.message}</p>}
                  </div>

                </div>

                <div className='d-flex flex-column w-100 mb-2'>
                  <div className="input-group mb-2">
                      <span className="input-group-text">Street number (optional)</span>
                      <input 
                        className="form-control" 
                        type='text'
                        {...register('street_address')}
                      ></input>
                  </div>
                </div>

                <div className='d-flex gap-2'>

                    <div className='d-flex flex-column w-100 mb-2'>
                      <div className="input-group mb-2">
                          <span className="input-group-text">City</span>
                          <select 
                            className='form-select'
                            {...register('city', { required: 'City is required' })}
                          >
                            <option value="">Select city</option>
                            {
                              cityArray.map((city, index) => (
                                <option value={city} key={index}>{city}</option>
                              ))
                            }
                          </select>
                      </div>
                      {errors.city && <p id={style.errorMessage}>{errors.city.message}</p>}
                    </div>
                      {
                        type === 'admin' &&
                          <div className='d-flex flex-column w-100 mb-2'>
                            <div className="input-group mb-2">
                              <span className="input-group-text">Birthdate</span>
                              <input 
                                className="form-control" 
                                type='date'
                                {...register('birthdate')}
                              ></input>
                            </div>
                          </div>
                      }
                    
                </div>
  
              </div>

            </div>

          </div>
          <div className={style.btnMenu}>
            <button type='submit' style={{ backgroundColor: '#387F39' }}>Create Account</button>
            <button style={{ width: '10%', }} title='Reset Details'><GrPowerReset size={25}/></button>
            <button 
              style={{ backgroundColor: '#38b6ff' }} 
              id={style.btnLogin} 
              onClick={ () => type === 'guest' ? navigate('/login') : navigate('/admin')}
            >
              {
                type === 'guest' ? 
                'Back to Login' : 
                'Back'
              }
            </button>
          </div>
          
        </div>
      </form>
    </div>
    
  )
}

export default CreateAccount
