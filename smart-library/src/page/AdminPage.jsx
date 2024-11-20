import React, { useEffect, useState } from 'react'
import style from './AdminPage.module.css'
import sample from '../assets/sl-blue.png'
import { GiHamburgerMenu } from "react-icons/gi";
import { GrDashboard } from "react-icons/gr";
import { BiBookAdd } from "react-icons/bi";
import { FiBookOpen } from "react-icons/fi";
import { LiaBookSolid } from "react-icons/lia";
import { PiBooksLight } from "react-icons/pi";
import { IoSync } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import AnalyticsComponents from '../components/AnalyticsComponents';
import { useNavigate } from 'react-router-dom';
import ImportMenuComponents from '../components/ImportMenuComponents'
import RequestBookComponent from '../components/RequestBookComponent';
import CatalogueComponents from '../components/CatalogueComponents';
import LibraryBooksComponents from '../components/LibraryBooksComponents';
import { MdOutlineTableChart } from "react-icons/md";

const AdminPage = () => {

  const [isShowSideBar, setIsShowSideBar] = useState(true)
  const [activeMenu, setActiveMenu] = useState('dashboard')
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
                            >{user?.firstname.substring(0, 1).toUpperCase()}
                            </div>
                            :
                            <img src={user?.image} alt="profile "/>
                        }
                        
                        <h2>{user?.firstname + " " + user?.lastname}</h2>
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
                            className={activeMenu === 'circulation' ? style.cardActive : style.card}
                            onClick={() => setActiveMenu('circulation')}
                        >
                            <IoSync size={25} color='#38b6ff'/>
                            <p>Circulation</p>
                        </div>

                        {
                            (activeMenu === 'circulation' || activeMenu === 'addBook' || activeMenu === 'reqBook') &&
                            <div className={style.divDropDown}>
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
                            </div>
                        }

                        <div 
                            className={activeMenu === 'tables' ? style.cardActive : style.card}
                            onClick={() => setActiveMenu('tables')}
                        >
                            <MdOutlineTableChart size={25} color='#38b6ff'/>
                            <p>Tables</p>
                        </div>

                        {
                            activeMenu === 'tables' &&
                            <div className={style.divDropDown}>
                                <div 
                                    className={activeMenu === 'addBook' ? style.cardActive : style.card}
                                    onClick={() => setActiveMenu('addBook')}
                                >
                                    <BiBookAdd size={25} color='#38b6ff'/>
                                    <p>Genre</p>
                                </div>

                                <div 
                                    className={activeMenu === 'reqBook' ? style.cardActive : style.card}
                                    onClick={() => setActiveMenu('reqBook')}
                                >
                                    <LiaBookSolid size={25} color='#38b6ff'/>
                                    <p>Branch</p>
                                </div>

                                <div 
                                    className={activeMenu === 'reqBook' ? style.cardActive : style.card}
                                    onClick={() => setActiveMenu('reqBook')}
                                >
                                    <LiaBookSolid size={25} color='#38b6ff'/>
                                    <p>Feedback</p>
                                </div>
                            </div>
                        }

                        <div 
                            className={activeMenu === 'catalogue' ? style.cardActive : style.card}
                            onClick={() => setActiveMenu('catalogue')}
                        >
                            <FiBookOpen size={25} color='#38b6ff'/>
                            <p>Catalogue</p>
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

            <div className={style.leftHead}>
                <h1>{
                    activeMenu === 'dashboard' && 'Dashboard' ||
                    activeMenu === 'circulation' && 'Circulation' ||
                    activeMenu === 'addBook' && 'Add Book / Circulation' ||
                    activeMenu === 'reqBook' && 'Request Books / Circulation' ||
                    activeMenu === 'catalogue' && 'Catalogue' ||
                    activeMenu === 'libBook' && 'Library Books'
                }</h1>
            </div>
            <div className={style.rightHead}>
                <div className={style.iconDiv} title='logout' style={{ backgroundColor: '#D91656' }} onClick={handleLogout}>
                    <IoMdLogOut size={15} color='white'/>
                </div>
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
                    <ImportMenuComponents/>
                )
            }

            {
                activeMenu === 'reqBook' && (
                    <RequestBookComponent/>
                )
            }

            {
                activeMenu === 'catalogue' && (
                    <CatalogueComponents/>
                )
            }

            {
                activeMenu === 'libBook' && (
                    <LibraryBooksComponents/>
                )
            }
        </div>
        
      </div>
    </div>
  )
}

export default AdminPage
