import React, { useEffect, useRef, useState } from 'react'
import style from './ManageAccountComponent.module.css'
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import axios from 'axios';
import NotificationComponents from './NotificationComponents';
import UserProfile from './UserProfile';
import { CgArrowsExchange } from "react-icons/cg";
import { useForm } from 'react-hook-form';
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom'
import { Select } from 'antd';

const ManageAccountComponent = () => {

  const userAccount = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  const [isShowSuccessfully, setisShowSuccessfully] = useState(false)

  const { 
    handleSubmit, 
    reset, 
    setValue, 
    register, formState:{ errors } 
  } = useForm({
    defaultValues: {
      firstname: userAccount?.firstname,
      middlename: userAccount?.middlename,
      lastname: userAccount?.lastname,
      email: userAccount?.email,
      contact: userAccount?.contact,
      card_number: userAccount?.card_number,
      branch: userAccount?.branch,
      birthdate: userAccount?.birthdate,
      gender: userAccount?.gender,
      street_address: userAccount?.street_address,
      city: userAccount?.city,
    }
  })


  const [firstname, setFirstname] = useState(userAccount?.firstname)
  const [middlename, setMiddlename] = useState(userAccount?.middlename)
  const [lastname, setLastname] = useState(userAccount?.lastname)
  const [password, setPassword] = useState(userAccount?.password)
  const [email, setEmail] = useState(userAccount?.email)
  const [birthdate, setBirthdate] = useState(userAccount?.birthdate)
  const [streetAddress, setStreetAddress] = useState(userAccount?.street_address)
  const [contact, setContact] = useState(userAccount?.contact)
  const [gender, setGender] = useState(userAccount?.gender)
  const [city, setCity] = useState(userAccount?.city)
  const [imageID, setImageID] = useState(userAccount?.imageID)
  const [image, setImage] = useState(null)
  

  const [mixChar, setMixChar] = useState(false)
  const [specialChar, setSpecialChar] = useState(false)
  const [validLenghtChar, setValidLenghtChar] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [isToast, setIsToast] = useState(false)
  const [message, setMessage] = useState('')

  const [isShowModal, setIsShowModal] = useState(false)
  const [isShowFailedChangePass, setIsShowFailedChangePass] = useState(false)
  const [isShowNewPasswordInput, setIsShowNewPasswordInput] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [reEnterPassword, setReEnterPassword] = useState('')

  const inputImage = useRef(null)

  const hasLowerAndUpperCase = (value) => {
    return /[a-z]/.test(value) && /[A-Z]/.test(value)
    
  }

  const hasNumberAndSymbols = (value) => {
      return /[0-9]/.test(value) && /[!@#$%^&*()]/.test(value)
  }

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


  useEffect(() => {
    if (newPassword) {

      if (newPassword.length > 12) {
        setValidLenghtChar(true)
      }else {
        setValidLenghtChar(false)
      }

      if (hasLowerAndUpperCase(newPassword)) {
        setMixChar(true)
      }else {
        setMixChar(false)
      }

      if (hasNumberAndSymbols(newPassword)) {
        setSpecialChar(true)
      }else {
        setSpecialChar(false)
      }
      
    }

    if (
      newPassword === reEnterPassword &&
      validLenghtChar &&
      mixChar &&
      specialChar
    ) {
      setBtnDisabled(false)
    }else {
      setBtnDisabled(true)
    }

  }, [newPassword, reEnterPassword])


  const handleGetImage = (e) => {
    const file = e.target.files[0]
    setImage(file)
  }

  const handleCheckPassword = () => {

    axios.post('http://82.112.236.213:5001/account/checkAccount', {email, password:currentPassword})
    .then((res) => {
      const result = res.data
  
      if (result !== false) {
        setIsShowNewPasswordInput(true)
      }else {
        setIsShowNewPasswordInput(false)
        setIsShowFailedChangePass(true)

        setTimeout(() => {
          setIsShowFailedChangePass(false)
        }, 3000);
      }
      
    })
    .catch((err) => {
      setIsShowFailedChangePass(true)
      console.log(err)
      setTimeout(() => {
        setIsShowFailedChangePass(false)
      }, 3000);
    })

  }

  const handleChangePassword = () => {

    axios.post('http://82.112.236.213:5001/account/changePassword', {email, newPassword})
    .then((res) => {
      const result = res.data
      const message = result.message

      setToastMessage(message)
      console.log(message)

      setIsShowModal(false)
      setCurrentPassword('')
      setNewPassword('')
      setReEnterPassword('')

      setIsToast(true)
      setTimeout(() => {
        setIsToast(false)
      }, 3000);
    })
    .catch((err) => {console.log(err)})

  }

  const onSubmit = (data) => {
    console.log(data)

      const formData = new FormData

      let updatedImageID = imageID

      formData.append('id', userAccount?.id)
      formData.append('firstname', data?.firstname)
      formData.append('middlename', data?.middlename)
      formData.append('lastname', data?.lastname)
      formData.append('contact', data?.contact)
      formData.append('gender', data?.gender)
      formData.append('street_address', data?.street_address)
      formData.append('birthdate', data?.birthdate)
      formData.append('city', data?.city)
      

      if (image) {
        updatedImageID = generateUniqueId()
        formData.append('imageID', updatedImageID)
        formData.append('file', image)
      }else {
        formData.append('imageID', imageID)
      }

      axios.post('http://82.112.236.213:5001/account/updateAccount', formData)
      .then((res) => {
        const result = res.data
        const message = result.message

        setMessage(message)
        let updatedInfo = userAccount

        updatedInfo.firstname = firstname
        updatedInfo.middlename = middlename
        updatedInfo.lastname = lastname
        updatedInfo.contact = contact
        updatedInfo.gender = gender
        updatedInfo.street_address = streetAddress
        updatedInfo.birthdate = birthdate
        updatedInfo.city = city
        updatedInfo.imageID = updatedImageID

        localStorage.setItem('user', JSON.stringify(updatedInfo))

        setIsToast(true)
        setisShowSuccessfully(true)
        setTimeout(() => {
          setIsToast(false)
          setisShowSuccessfully(false)
          localStorage.clear()
          navigate('/login')
        }, 3000);
      })
      .catch((err) => {console.log(err)})

  }


  return (
    <div className={style.container}>
      {
        isToast &&
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <NotificationComponents message={message} status={true}/>
        </div>
      }

      {
        isShowSuccessfully &&
        <div 
          className={style.modal} 
          style={{ 
            borderRadius: 10, 
            display: 'flex', 
            textAlign: 'center',
            gap: 10
          }}
        >
          <h1>Successfully change account information</h1>
          <p>This automatically logout...</p>
        </div>
      }

      {
        isShowModal && (
          <div className={style.modal}>
            
            <div className='w-100 d-flex flex-column'>
              <h1>Change Password</h1>
              <p>Please verify your current password to proceed with the update.</p>
              
            </div>
            
            <input type="text" placeholder='Current password...' onChange={(e) => setCurrentPassword(e.target.value)}/>

            {
              isShowFailedChangePass && 
                <p className={style.info} style={{ backgroundColor: '#FF8A8A', color: 'white' }}>Password doesn't match.</p>
            }
            
            {
              isShowNewPasswordInput && (
                <>
                  <input type="text" placeholder='New password...' onChange={(e) => setNewPassword(e.target.value)}/>
                  {
                    newPassword.length > 1 &&
                    <>
                      <div className={style.checkPassDiv}>
                        <p>{validLenghtChar ? <FaCheck size={10} color='green'/> : <ImCross size={10} color='red'/>}  at least 12 characters long.</p>
                        <p>{mixChar ? <FaCheck size={10} color='green'/> : <ImCross size={10} color='red'/>} contains a mix of uppercase and lowercase letters.</p>
                        <p>{specialChar ? <FaCheck size={10} color='green'/> : <ImCross size={10} color='red'/>} includes numbers and special characters.</p>
                      </div>
                      <p className={style.info}>Passwords must include a mix of uppercase and lowercase letters, numbers, and special characters to ensure strong security.</p>
                    </>
                  }
                  
                  <input type="text" placeholder='Re-enter password...' onChange={(e) => setReEnterPassword(e.target.value)}/>
                  {
                    newPassword !== reEnterPassword && 
                    <p className={style.info} style={{ backgroundColor: '#FF8A8A', color: 'white' }}>Passwords doesn't match.</p>
                  }
                </>
              )
            }
            
            <div className='d-flex w-100 gap-2 mt-2'>
              {
                isShowNewPasswordInput ? 
                <button disabled={btnDisabled} onClick={handleChangePassword}>Change Password</button>
                 :
                <button onClick={handleCheckPassword} disabled={currentPassword.length > 0 ? false : true}>Submit</button>
              }
             
              <button style={{ backgroundColor: '#38b6ff', width: '40%' }} onClick={() => setIsShowModal(false)}>Cancel</button>
            </div>
          </div>
        )
      }

      <div className='w-100 h-100'>
        <div className='container p-4'>

          <div className='d-flex flex-column w-100'>
            <h1>Manage Account</h1>
            <p>Updating your account information.</p>
          </div>
          
          <div className='d-flex gap-2 w-100'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={style.left}>
                    <div className='w-100 d-flex flex-column gap-3 align-items-center justify-content-center'>
                      <div className={style.imageDiv}>
                        {
                          image ? <img src={URL.createObjectURL(image)} alt="profile" /> :
                            <UserProfile 
                              imageID={imageID}
                              firstname={'rumar'}
                            />
                        }
                        
                      </div>
                      <p 
                        style={{ cursor: 'pointer', gap: 10 }} 
                        title='Change the profile picture'
                        onClick={() => inputImage.current.click()}
                      ><CgArrowsExchange size={25}/>Change Profile Picture</p>
                      <input 
                        type="file"
                        ref={inputImage} 
                        accept="image/*" 
                        style={{ display: 'none' }} 
                        onChange={handleGetImage}
                      />
                    </div>
                    
                    <div className='w-100 d-flex flex-column mt-2'>
                      <label>First Name</label>
                      <input 
                        type="text"
                        {...register('firstname', { required: 'First Name is required.' })}
                      />
                      {errors.firstname && <p style={{ color: 'red', fontSize: '0.7rem', margin: 0 }}>{errors.firstname.message}</p>}
                    </div>
                    <div className='w-100 d-flex flex-column mt-2'>
                      <label>Middle Name</label>
                      <input 
                        type="text"
                        {...register('middlename', { required: 'Middle Name is required.' })}
                      />
                      {errors.middlename && <p style={{ color: 'red', fontSize: '0.7rem', margin: 0 }}>{errors.middlename.message}</p>}
                    </div>
                    <div className='w-100 d-flex flex-column mt-2'>
                      <label>Last Name</label>
                      <input 
                        type="text"
                        {...register('lastname', { required: 'Last Name is required.' })}
                      />
                      {errors.lastname && <p style={{ color: 'red', fontSize: '0.7rem', margin: 0 }}>{errors.lastname.message}</p>}
                    </div>
                    <div className='w-100 d-flex flex-column mt-2'>
                      <label>Email</label>
                      <input 
                        type="email"
                        {...register('email', { required: 'Email is required.' })}
                      />
                      {errors.lastname && <p style={{ color: 'red', fontSize: '0.7rem', margin: 0 }}>{errors.lastname.message}</p>}
                    </div>
                    <div className='w-100 d-flex flex-column mt-2'>
                      <label>Contact Number</label>
                      <input 
                        type="contact"
                        {...register('contact', { required: 'Contact Number is required.' })}
                      />
                      {errors.contact && <p style={{ color: 'red', fontSize: '0.7rem', margin: 0 }}>{errors.contact.message}</p>}
                    </div>
              </div>

              <div className={style.right}>
                  <div className='w-100 d-flex flex-column mt-4'>
                      <label>Card Number</label>
                      <input 
                        type="number" 
                        {...register('card_number')}
                        disabled
                      />
                  </div>
                  <div className='w-100 d-flex flex-column mt-2'>
                      <label>Designated Branch</label>
                      <input 
                        type="text" 
                        {...register('branch')}
                        disabled
                      />
                  </div>
                  <div className='w-100 d-flex flex-column mt-2'>
                    <label>Birth Date</label>
                    <input 
                        type="birthdate"
                        {...register('birthdate', { required: 'Contact Number is required.' })}
                      />
                    {errors.birthdate && <p style={{ color: 'red', fontSize: '0.7rem', margin: 0 }}>{errors.birthdate.message}</p>}
                  </div>
                  <div className='w-100 d-flex flex-column mt-2'>
                    <label>Sex</label>
                    <select 
                      {...register('gender', { required: 'Gender is required.' })}
                    >
                      <option value="">Select Sex</option>
                      <option value="male" >Male</option>
                      <option value="female" >Female</option>
                      <option value="Prefer not to say" >Prefer not to say</option>
                    </select>
                      
                      {errors.gender && <p style={{ color: 'red', fontSize: '0.7rem', margin: 0 }}>{errors.gender.message}</p>}
                  </div>
                  <div className='w-100 d-flex flex-column mt-2'>
                    <label>Street</label>
                    <input 
                        type="street_address"
                        {...register('street_address', { required: 'Contact Number is required.' })}
                      />
                      {errors.street_address && <p style={{ color: 'red', fontSize: '0.7rem', margin: 0 }}>{errors.street_address.message}</p>}
                  </div>
                  <div className='w-100 d-flex flex-column mt-2'>
                    <label>City</label>
                    <input 
                        type="city"
                        {...register('city', { required: 'Contact Number is required.' })}
                      />
                      {errors.city && <p style={{ color: 'red', fontSize: '0.7rem', margin: 0 }}>{errors.city.message}</p>}
                  </div>
                  <div className='w-100 d-flex gap-3 flex-column align-items-center mt-4'>
                    <button type='submit'>Save</button>
                    <p
                      style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 10 }} 
                      title='Change the profile picture'
                      onClick={() => setIsShowModal(true)}
                    ><RiLockPasswordFill/>Change Password</p>
                    
                  </div>
                  
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ManageAccountComponent
