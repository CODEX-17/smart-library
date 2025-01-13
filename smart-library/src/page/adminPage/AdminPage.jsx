import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import style from './AdminPage.module.css'
import AnalyticsComponents from '../../components/AnalyticsComponents';
import ImportMenuComponents from '../../components/ImportMenuComponents'
import RequestBookComponent from '../../components/RequestBookComponent';
import AdminCatalogue from './Tabs/Catalogue/AdminCatalogue';
import LibraryBooksComponents from '../../components/LibraryBooksComponents';
import TableViewComponents from './Tabs/Branch/BranchTable';
import AdminFeedback from './Tabs/Feedback/AdminFeedback';
import { BiCategory, BiBookAdd } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrDashboard } from "react-icons/gr";
import { FiBookOpen } from "react-icons/fi";
import { LiaBookSolid } from "react-icons/lia";
import { IoSync } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { IoMdLogOut, IoMdArrowDropdownCircle } from "react-icons/io";
import { 
    PiGitBranchBold,
    PiBooksLight
} from "react-icons/pi";
import { 
    MdOutlineFeedback, 
    MdOutlineSupervisorAccount,
    MdOutlineTableChart 
} from "react-icons/md";
import ManageAccountComponent from '../../components/ManageAccountComponent';
import BranchTable from './Tabs/Branch/BranchTable';



const AdminPage = () => {

  const [isShowSideBar, setIsShowSideBar] = useState(true)
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [user, setUser] = useState(null)
  const [isShowSetting, setIsShowSetting] = useState(false)
  const navigate = useNavigate()
  

  useEffect(() => {
    if (!localStorage.getItem('user')) {
        navigate('/')
    }else {
        const data = JSON.parse(localStorage.getItem('user'))
        if (data.acctype !== 'admin' && data.acctype !== 'super') {
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
                            className={
                                (
                                    activeMenu === 'circulation' || 
                                    activeMenu === 'addBook' || 
                                    activeMenu === 'reqBook'
                                ) ? style.cardActive : style.card}
                            onClick={() => setActiveMenu('addBook')}
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

                        {
                            user?.acctype === 'super' && 
                            <div 
                                className={activeMenu === 'branch' ? style.cardActive : style.card}
                                onClick={() => setActiveMenu('branch')}
                            >
                                <PiGitBranchBold size={25} color='#38b6ff'/>
                                <p>Branch</p>
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

                        <div 
                            className={activeMenu === 'feedback' ? style.cardActive : style.card}
                            onClick={() => setActiveMenu('feedback')}
                        >
                            <MdOutlineFeedback size={25} color='#38b6ff'/>
                            <p>Feedback</p>
                        </div>

                        {
                            user?.acctype === 'super' &&
                            <div 
                                className={activeMenu === 'createAccountAdmin' ? style.cardActive : style.card}
                                onClick={() => {setActiveMenu('createAccountAdmin', navigate('/createAccount', { state: { type: 'admin' }}))}}
                            >
                                <MdOutlineSupervisorAccount size={25} color='#38b6ff'/>
                                <p>Create Admin Account</p>
                            </div>
                        }
                        
                       

                    </div>
                </div>
            )
        }

      <div className={style.main}>
        <div className={style.headBar}>
            {
                !isShowSideBar && 
                    <GiHamburgerMenu
                        color='#38b6ff' 
                        size={25} 
                        cursor={'pointer'} 
                        onClick={() => setIsShowSideBar(!isShowSideBar)}
                    />
            }

                <h1>{
                    activeMenu === 'dashboard' && 'Dashboard' ||
                    activeMenu === 'circulation' && 'Circulation' ||
                    activeMenu === 'addBook' && 'Add Book / Circulation' ||
                    activeMenu === 'reqBook' && 'Request Books / Circulation' ||
                    activeMenu === 'catalogue' && 'Catalogue' ||
                    activeMenu === 'libBook' && 'Library Books' ||
                    activeMenu === 'feedback' && 'Feedbacks' ||
                    activeMenu === 'tableGenre' && 'Table / Genre' ||
                    activeMenu === 'tableBranch' && 'Table / Branch'
                }</h1>
       
            
                <IoMdArrowDropdownCircle 
                    size={30} 
                    cursor={'pointer'} 
                    className={style.iconSetting}
                    onClick={() => setIsShowSetting(!isShowSetting)}
                />
            
                
                
        </div>

        <div className={style.content}>
            {
                isShowSetting &&
                <div className={style.settingCard}>
                    <h3 onClick={() => setActiveMenu('manage-account')}><MdManageAccounts/>Manage Account</h3>
                    <hr />
                    <button onClick={handleLogout}><IoMdLogOut/>Logout</button>
                </div>
            }

            { 

                activeMenu === 'manage-account' && <ManageAccountComponent/> ||
             
                activeMenu === 'dashboard' && <AnalyticsComponents/> ||

                activeMenu === 'addBook' && <ImportMenuComponents/> ||

                activeMenu === 'reqBook' && <RequestBookComponent/> ||

                activeMenu === 'catalogue' && <AdminCatalogue/> ||

                activeMenu === 'libBook' && <LibraryBooksComponents/> ||

                activeMenu === 'feedback' && <AdminFeedback/> ||
 
                activeMenu === 'branch' && <BranchTable/>
            }
            
        </div>
        
      </div>
    </div>
  )
}

export default AdminPage
