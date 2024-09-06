import React, { useEffect, useState } from 'react'
import style from './AdminPage.module.css'
import sample from '../assets/sl-blue.png'
import { GiHamburgerMenu } from "react-icons/gi";
import { GrDashboard } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import AnalyticsComponents from '../components/AnalyticsComponents';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {

  const [isShowSideBar, setIsShowSideBar] = useState(true)
  const [activeMenu, setActiveMenu] = useState('default')
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('user')) {
        navigate('/')
    }
  
    setUser(JSON.parse(localStorage.getItem('user')))
  },[])

  return (
    <div className={style.container}>
        {
            isShowSideBar && (
                <div className={style.sidebar}>
                    <div className={style.profileContainer}>
                        {
                            user?.image === 'default' ? 
                            <div id={style.defaultProfile}>{user?.email.substring(0, 1).toUpperCase()}</div>
                            :
                            <img src={user?.image} alt="profile "/>
                        }
                        
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

                        <div 
                            className={activeMenu === 'dashboard' ? style.cardActive : style.card}
                            onClick={() => setActiveMenu('dashboard')}
                        >
                            <GrDashboard size={25} color='#38b6ff'/>
                            <p>Dashboard</p>
                        </div>

                        <div 
                            className={activeMenu === 'dashboard' ? style.cardActive : style.card}
                            onClick={() => setActiveMenu('dashboard')}
                        >
                            <GrDashboard size={25} color='#38b6ff'/>
                            <p>Dashboard</p>
                        </div>

                        <div 
                            className={activeMenu === 'dashboard' ? style.cardActive : style.card}
                            onClick={() => setActiveMenu('dashboard')}
                        >
                            <GrDashboard size={25} color='#38b6ff'/>
                            <p>Dashboard</p>
                        </div>
                       

                    </div>
                </div>
            )
        }

      <div className={style.main}>
        <div className={style.headBar}>
            {
                !isShowSideBar && 
                    <GiHamburgerMenu
                        id={style.burgerIcon}
                        color='#38b6ff' 
                        size={25} 
                        cursor={'pointer'} 
                        onClick={() => setIsShowSideBar(!isShowSideBar)}
                    />
            }
            <div id={style.searchBar}>
                <input type="text" placeholder='Search...'/>
                <FaSearch size={20} color='#38b6ff'/>
            </div>
            
        </div>
        <div className={style.content}>
            {
                activeMenu === 'dashboard' && (
                    <AnalyticsComponents/>
                )
            }
        </div>
        
      </div>
    </div>
  )
}

export default AdminPage
