import React, { useEffect, useState } from 'react'
import style from './UserProfile.module.css'
import { getFileByID } from '../services/fileServices'

const UserProfile = ({ imageID, firstname }) => {

   const BASE_URL = 'http://localhost:5001'


   const [image, setImage] = useState(null)

   useEffect(() => {

    console.log('imageID', imageID)

    const fetchData = async () => {
      try {
        if (imageID !== 'default') {
          const result = await getFileByID(imageID)
          console.log(result)
          if (result) {
            console.log(`${BASE_URL}/${result.filename}`)
            setImage(`${BASE_URL}/${result.filename}`)
          }

        }
      } catch (error) {
        console.log(error)
      }

      
    }

    fetchData()
      
   },[])

  return (
    imageID === 'default' ?
    <div className={style.circle}>
        {firstname.substring(0,1).toUpperCase()}
    </div> :
    <div className={style.circle}>
        <img src={image} alt="profile picture" />
    </div>
  )
}

export default UserProfile
