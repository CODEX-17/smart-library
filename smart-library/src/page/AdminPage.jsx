import React, { useState } from 'react'
import style from './AdminPage.module.css'
import sample from '../assets/sl-blue.png'
import { GiHamburgerMenu } from "react-icons/gi";
import { GrDashboard } from "react-icons/gr";

const AdminPage = () => {

  const [isShowSideBar, setIsShowSideBar] = useState(true)
  const [activeMenu, setActiveMenu] = useState('default')

  return (
    <div className={style.container}>
        {
            isShowSideBar && (
                <div className={style.sidebar}>
                    <div className={style.profileContainer}>
                        <img src={sample} alt="profile "/>
                        <h2>Profile</h2>
                        <GiHamburgerMenu color='white' size={25} cursor={'pointer'} onClick={() => setIsShowSideBar(!isShowSideBar)}/>
                    </div>
                    
                    <div className={style.menuContainer}>
                        <div 
                            className={activeMenu === 'dashboard' ? style.cardActive : style.card}
                            onClick={() => setActiveMenu('dashboard')}
                        >
                            <GrDashboard size={25} color='#38b6ff'/>
                            <p>Dashboard</p>
                        </div>
                        <div className={style.card}>
                            card
                        </div>
                        <div className={style.card}>
                            card
                        </div>

                    </div>
                </div>
            )
        }

      <div className={style.main}>
        {
            !isShowSideBar && <GiHamburgerMenu color='#38b6ff' size={25} cursor={'pointer'} onClick={() => setIsShowSideBar(!isShowSideBar)}/>
        }
        
      </div>
    </div>
  )
}

export default AdminPage
