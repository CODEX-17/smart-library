import React, { useEffect, useRef, useState } from 'react'
import style from './ManageAccountComponent.module.css'
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import axios from 'axios';

const ManageAccountComponent = () => {

  const userAccount = JSON.parse(localStorage.getItem('user'))

  console.log(userAccount)

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
  const [toastMessage, setToastMessage] = useState('')

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

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleCheckPassword = () => {

    axios.post('http://localhost:5001/account/checkAccount', {email, password:currentPassword})
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

    axios.post('http://localhost:5001/account/changePassword', {email, newPassword})
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

  const handleUpdateAcctInfo = () => {
      const formData = new FormData

      let updatedImageID = imageID

      formData.append('id', userAccount?.id)
      formData.append('firstname', firstname)
      formData.append('middlename', middlename)
      formData.append('lastname', lastname)
      formData.append('contact', contact)
      formData.append('gender', gender)
      formData.append('street_address', streetAddress)
      formData.append('birthdate', birthdate)
      formData.append('city', city)
      

      if (image) {
        updatedImageID = generateUniqueId()
        formData.append('imageID', updatedImageID)
        formData.append('file', image)
      }else {
        formData.append('imageID', imageID)
      }

      axios.post('http://localhost:5001/account/updateAccount', formData)
      .then((res) => {
        const result = res.data
        const message = result.message

        setToastMessage(message)
        console.log(message)

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
        setTimeout(() => {
          setIsToast(false)
        }, 3000);
      })
      .catch((err) => {console.log(err)})

  }

  return (
    <div className={style.container}>
      {
        isToast && (
          <div className={style.toast}>
            {toastMessage}
          </div>
        )
      }
      {
        isShowModal && (
          <div className={style.modal}>
            <h1>Change Password</h1>
            <input type="text" placeholder='Current password...' onChange={(e) => setCurrentPassword(e.target.value)}/>
            {
              isShowFailedChangePass && <p className={style.info} style={{ backgroundColor: '#FF8A8A', color: 'white' }}>Password doesn't match.</p>
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
            
            <div className='d-flex w-100 gap-2'>
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

      <h1>Manage Account</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.head}>
          <div className={style.headLeft}>
            {
              image !== null ? (
                <>
                  <img src={URL.createObjectURL(image)} alt="profile pic" id={style.imgDiv} onClick={() => inputImage.current.click()}/>
                </>
                
              ) : (
                <>
                  <div id={style.imgDiv} onClick={() => inputImage.current.click()}>Click here to insert image.</div>
                  <input type="file" ref={inputImage} accept="image/*" style={{ display: 'none' }} onChange={handleGetImage}/>
                </>
              )
            }
            
          </div>
          <div className={style.headRight}>
            <p>Firstname</p>
            <input type="text" value={firstname} required onChange={(e) => setFirstname(e.target.value)}/>
            <p>Middlename</p>
            <input type="text" value={middlename} required onChange={(e) => setMiddlename(e.target.value)}/>
            <p>Lastname</p>
            <input type="text" value={lastname} required onChange={(e) => setLastname(e.target.value)}/>
          </div>

        </div>
        <div className={style.main}>
          <div className='d-flex w-100 gap-2'>
            <div className='d-flex w-50 flex-column'>
              <p>Birthdate</p>
              <input type="date" value={birthdate} required onChange={(e) => setBirthdate(e.target.value)}/>
            </div>
            <div className='d-flex w-50 flex-column'>
              <p>Contact</p>
              <input type="tel" value={contact} required onChange={(e) => setContact(e.target.value)}/>
            </div>
          </div>
          <div className='d-flex w-100 gap-2'>
            <div className='d-flex w-100 flex-column'>
              <p>Street Address</p>
              <input type="text" value={streetAddress} required onChange={(e) => setStreetAddress(e.target.value)}/>
            </div>
          </div>
          <div className='d-flex w-100 gap-2'>
            <div className='d-flex w-50 flex-column'>
              <p>City</p>
              <input type="text" value={city} required onChange={(e) => setCity(e.target.value)}/>
            </div>
            <div className='d-flex w-50 flex-column'>
              <p>Gender</p>
              <select value={gender} required onChange={(e) => setGender(e.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className='d-flex w-100 gap-2'>
            <div className='d-flex w-50 flex-column'>
              <p>Email</p>
              <input type="email" value={email} disabled/>
            </div>
            <div className='d-flex w-50 flex-column'>
              <p>Password</p>
              <input type="password" value={password} required onClick={() => setIsShowModal(true)}/>
            </div>
          </div>
          <div className='d-flex w-100 mt-2'>
            <button type='submit' onClick={handleUpdateAcctInfo}>Submit Changes</button>
          </div>
        
        </div>
      </form>
    </div>
  )
}

export default ManageAccountComponent
