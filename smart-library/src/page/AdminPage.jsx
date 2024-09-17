import React, { useEffect, useState } from 'react'
import style from './AdminPage.module.css'
import sample from '../assets/sl-blue.png'
import { GiHamburgerMenu } from "react-icons/gi";
import { GrDashboard } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { BiBookAdd } from "react-icons/bi";
import { FiBookOpen } from "react-icons/fi";
import { VscFeedback } from "react-icons/vsc";
import { LiaBookSolid } from "react-icons/lia";
import { TbInfoHexagon } from "react-icons/tb";
import { PiBooksLight } from "react-icons/pi";
import { IoSync } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import AnalyticsComponents from '../components/AnalyticsComponents';
import { useNavigate } from 'react-router-dom';
import AddBookComponents from '../components/AddBookComponents';
import FeedbackComponents from '../components/FeedbackComponents';
import RequestBookComponent from '../components/RequestBookComponent';

const AdminPage = () => {

  const [isShowSideBar, setIsShowSideBar] = useState(true)
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [isShowLogout, setIsShowLogout] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('user')) {
        navigate('/')
    }else {
        const data = JSON.parse(localStorage.getItem('user'))
        if (data.acctype !== 'admin') {
            navigate('/')
        }
    }
    
    setUser(JSON.parse(localStorage.getItem('user')))
  },[])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }


  return (
    <div className={style.container}>
        {
            isShowSideBar && (
                <div className={style.sidebar}>
                    <div className={style.profileContainer}>
                        {
                            user?.imageID === 'default' ? 
                            <div 
                                id={style.defaultProfile}
                                onClick={() => setIsShowLogout(!isShowLogout)}
                            >{user?.email.substring(0, 1).toUpperCase()}
                            </div>
                            :
                            <img src={user?.image} alt="profile "/>
                        }
                        
                        <h2>Profile</h2>
                        <GiHamburgerMenu color='white' size={25} cursor={'pointer'} onClick={() => setIsShowSideBar(!isShowSideBar)}/>
                    </div>
                    
                    <div className={style.menuContainer}>

                        {
                            isShowLogout &&
                            <div 
                                className={style.card}
                                onClick={handleLogout}
                                style={{ backgroundColor: '#C7253E', cursor: 'pointer' }}
                            >
                                <IoMdLogOut size={20} color='white'/>
                                <p style={{ color: 'white' }}>Logout</p>
                            </div>
                        }
                        

                        <div 
                            className={activeMenu === 'dashboard' ? style.cardActive : style.card}
                            onClick={() => setActiveMenu('dashboard')}
                        >
                            <GrDashboard size={25} color='#38b6ff'/>
                            <p>Dashboard</p>
                        </div>

                        <div 
                            className={activeMenu === 'circulation' ? style.cardActive : style.card}
                            onClick={() => setActiveMenu('circulation')}
                        >
                            <IoSync size={25} color='#38b6ff'/>
                            <p>Circulation</p>
                        </div>

                        <div 
                            className={activeMenu === 'catalogue' ? style.cardActive : style.card}
                            onClick={() => setActiveMenu('catalogue')}
                        >
                            <FiBookOpen size={25} color='#38b6ff'/>
                            <p>Catalogue</p>
                        </div>

                        <div 
                            className={activeMenu === 'addBook' ? style.cardActive : style.card}
                            onClick={() => setActiveMenu('addBook')}
                        >
                            <BiBookAdd size={25} color='#38b6ff'/>
                            <p>Add Books</p>
                        </div>

                        <div 
                            className={activeMenu === 'reqBook' ? style.cardActive : style.card}
                            onClick={() => setActiveMenu('reqBook')}
                        >
                            <LiaBookSolid size={25} color='#38b6ff'/>
                            <p>Request Books</p>
                        </div>

                        <div 
                            className={activeMenu === 'libBook' ? style.cardActive : style.card}
                            onClick={() => setActiveMenu('libBook')}
                        >
                            <PiBooksLight size={25} color='#38b6ff'/>
                            <p>Library Books</p>
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

            {
                activeMenu === 'addBook' && (
                    <AddBookComponents/>
                )
            }

            {
                activeMenu === 'reqBook' && (
                    <RequestBookComponent/>
                )
            }
        </div>
        
      </div>
    </div>
  )
}

export default AdminPage
