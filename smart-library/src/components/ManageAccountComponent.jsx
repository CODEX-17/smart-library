import React, { useEffect, useRef, useState } from 'react'
import style from './ManageAccountComponent.module.css'
import sample from '../assets/logo-white.png'

const ManageAccountComponent = () => {

  const userAccount = JSON.parse(localStorage.getItem('user'))
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
  const [image, setImage] = useState(userAccount?.imageID !== 'default' ? userAccount?.image : null )
  

  const inputImage = useRef(null)

  return (
    <div className={style.container}>
      <h1>Manage Account</h1>
      <form action="">
        <div className={style.head}>
          <div className={style.headLeft}>
            {
              image !== null ? (
                <>
                  <img src={sample} alt="profile pic" id={style.imgDiv}/>
                </>
                
              ) : (
                <>
                  <div id={style.imgDiv} onClick={() => inputImage.current.click()}>Click here to insert image.</div>
                  <input type="file" ref={inputImage} style={{ display: 'none' }}/>
                </>
              )
            }
            
          </div>
          <div className={style.headRight}>
            <p>Firstname</p>
            <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
            <p>Middlename</p>
            <input type="text" value={middlename} onChange={(e) => setMiddlename(e.target.value)}/>
            <p>Lastname</p>
            <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)}/>
          </div>

        </div>
        <div className={style.main}>
          <div className='d-flex w-100 gap-2'>
            <div className='d-flex w-50 flex-column'>
              <p>Birthdate</p>
              <input type="date" value={birthdate} onChange={(e) => setFirstname(e.target.value)}/>
            </div>
            <div className='d-flex w-50 flex-column'>
              <p>Contact</p>
              <input type="tel" value={contact} onChange={(e) => setFirstname(e.target.value)}/>
            </div>
          </div>
          <div className='d-flex w-100 gap-2'>
            <div className='d-flex w-100 flex-column'>
              <p>Street Address</p>
              <input type="text" value={streetAddress} onChange={(e) => setFirstname(e.target.value)}/>
            </div>
          </div>
          <div className='d-flex w-100 gap-2'>
            <div className='d-flex w-50 flex-column'>
              <p>City</p>
              <input type="text" value={city} onChange={(e) => setFirstname(e.target.value)}/>
            </div>
            <div className='d-flex w-50 flex-column'>
              <p>Gender</p>
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
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
              <input type="password" value={password} onChange={(e) => setFirstname(e.target.value)}/>
            </div>
          </div>
          <div className='d-flex w-100 mt-5'>
            <button>Submit Changes</button>
          </div>
        
        </div>
      </form>
    </div>
  )
}

export default ManageAccountComponent
