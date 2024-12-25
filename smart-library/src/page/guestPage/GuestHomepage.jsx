import React, {useEffect, useState} from 'react'
import style from './GuestHomePage.module.css'
import bookLogo from '../../assets/logo-yellow.png'
import axios from 'axios';
import DataTable from 'react-data-table-component';
import FeedbackComponents from '../../components/FeedbackComponents';
import ManageAccountComponent from '../../components/ManageAccountComponent';
import NotificationComponents from '../../components/NotificationComponents';
import Catalogue from '../../page/adminPage/Tabs/Catalogue/AdminCatalogue'
import { CgCloseR } from "react-icons/cg";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { LuBookPlus } from "react-icons/lu";
import { FiBookOpen } from "react-icons/fi";
import { FaFilter } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MdManageAccounts, MdOutlineFeedback } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdLogOut } from "react-icons/io";

import { Table, ConfigProvider } from 'antd';

import { useForm } from 'react-hook-form';

import { getCurrentUserFullname } from '../../utils/userNameUtil'
import { 
  convertDateFormatIntoString, 
  convertTimeTo12HourFormat,
  getCurrentDateString,
  getCurrentTimeString
} from '../../utils/dateUtils';


const GuestHomePage = () => {

  const navigate = useNavigate()
  const [isShowSidebar, setIsShowSidebar] = useState(true)
  const [branchList, setBranchList] = useState([])
  const [activeBtn, setActiveBtn] = useState('borrow')
  const [selectedData, setSelectedData] = useState(null)
  const userAccount = JSON.parse(localStorage.getItem('user'))
  const [isShowDropDownMenu, setIsShowDropDownMenu] = useState(false)

  const [filterBranch, setFilterBranch] = useState('all')

  const [bookList, setBookList] = useState([])
  const [reqList, setReqList] = useState([])

  const [isShowNotification, setIsShowNotification] = useState(false)
  const [message, setMessage] = useState('')
  const [notifStatus, setNotifStatus] = useState(true)

  const { handleSubmit, register, formState: { errors } } = useForm()

  const handleLogout = () => {  
    localStorage.clear()
    navigate('/')
  }

  useEffect(() => {

    if (!localStorage.getItem('user')) {
      navigate('/')
    }else {
      const data = JSON.parse(localStorage.getItem('user'))
      if (data.acctype !== 'guest') {
          navigate('/')
      }
    }

    axios.get('http://82.112.236.213:5001/branch/getBranch')
    .then((res) => {setBranchList(res.data)})
    .catch((error) => console.log(error))

      axios.get('http://82.112.236.213:5001/book/getBooks')
      .then((res) => setBookList(res.data))
      .catch((error) => console.log(error))

    axios.get('http://82.112.236.213:5001/borrow/getBorrowByAcctID/' + userAccount.id)
    .then((res) => {setReqList(res.data)})
    .catch((error) => console.log(error))

  },[message])


  const notificationConfig = ( message, status ) => {
    setMessage(message)
    setNotifStatus(status)
    setIsShowNotification(true)

    setTimeout(() => {
      setIsShowNotification(false)
      setMessage('')
    }, 3000);
  }

  const handleBorrow = (row) => {
      const finalData = {
        book_id: row.book_id,
        title: row.title,
        author_name: row.author_name,
        acct_id: userAccount.id,
        acct_name: getCurrentUserFullname(),
        date: getCurrentDateString(),
        time: getCurrentTimeString(),
        status: 'pending',
        book_quantity: row.quantity,
      }

      axios.post('http://82.112.236.213:5001/borrow/addBorrowBooks', finalData)
      .then((res) => {
          const result = res.data
          const message = result.message
          notificationConfig(message, true)
      })
    
  }

  const handleDeleteReq = (id) => {

    setReqList(reqList.filter((req) => req.id !== id))

    axios.post('http://82.112.236.213:5001/borrow/deleteReq', {id})
    .then((res) => {
      const result = res.data
      const message = result.message

      setToastMessage(message)
      setIsToast(false)

      setTimeout(() => {
        setIsToast(false)
      }, 5000);

    }).catch((err) => console.log(err))
  }

  const [filterText, setFilterText] = useState('');
  
  // Filter the data based on the search query
  const filteredData = bookList.filter(item =>
    item.branch && item.branch === filterBranch || filterBranch === 'all' &&
    item.title && item.title.toLowerCase().includes(filterText.toLowerCase()) ||

    item.branch && item.branch === filterBranch || filterBranch === 'all' &&
    item.author_name && item.author_name.toLowerCase().includes(filterText.toLowerCase()) ||

    item.branch && item.branch === filterBranch || filterBranch === 'all' &&
    item.branch && item.branch.toLowerCase().includes(filterText.toLowerCase()) ||

    item.branch && item.branch === filterBranch || filterBranch === 'all' &&
    item.total_copies && item.total_copies === filterText ||

    item.branch && item.branch === filterBranch || filterBranch === 'all' &&
    item.genre && item.genre.toLowerCase().includes(filterText.toLowerCase())
  )

  const customStyles = {
    table: {
      style: {
        borderRadius: '10px'
      }
    },
    headCells: {
      style: {
        fontWeight: 'bold',
        fontSize: '12pt',
      },
    },
  }

  const borrowColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'Author',
      dataIndex: 'author_name',
      key: 'author_name',
      sorter: (a, b) => a.author_name.localeCompare(b.author_name),
      responsive: ['xs', 'sm', 'md', 'lg'],
    },   
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
      sorter: (a, b) => a.genre - b.genre,
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
      sorter: (a, b) => a.branch - b.branch,
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'Total Copies',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'Date Acquired',
      render: (data) => convertDateFormatIntoString(data.date_acquired),
      key: 'date_acquired',
      sorter: (a, b) => a.date_acquired - b.date_acquired,
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (data) => 
        <div className='d-flex gap-2'>
          <button 
            id={style.btnBorrow} 
            disabled={ data.quantity <=0 ? true : false } 
            onClick={() => handleBorrow(data)}
          >Borrow</button>
        </div>
    },
  ]

  const requestColumns = [
    {
      title: 'Book ID',
      dataIndex: 'book_id',
      key: 'book_id',
      sorter: (a, b) => a.book_id - b.book_id,
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'Author',
      dataIndex: 'author_name',
      key: 'author_name',
      sorter: (a, b) => a.author_name.localeCompare(b.author_name),
      responsive: ['xs', 'sm', 'md', 'lg'],
    },   
    {
      title: 'Borrower',
      dataIndex: 'acct_name',
      key: 'acct_name',
      sorter: (a, b) => a.acct_name.localeCompare(b.acct_name),
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'Date',
      render: (data) => convertDateFormatIntoString(data.date),
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'time',
      render: (data) => convertTimeTo12HourFormat(data.time),
      key: 'time',
      sorter: (a, b) => new Date(a.time) - new Date(b.time),
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (data) => 
        <button 
          id={style.btnBorrow} 
          style={{ backgroundColor: '#A02334' }} 
          onClick={() => handleDeleteReq(data.id)}>
          Delete
        </button>
    },
  ]




  return (
    <div className={style.container}>

      {
        isShowSidebar && (
          <div className={style.left}>
            <div className={style.profileDiv}>
              <GiHamburgerMenu size={25} color='white' id={style.hamburgerMenuProfile} onClick={() => setIsShowSidebar(!isShowSidebar)}/>
              
              <img id={style.bookLogo} src={bookLogo} alt="logo" />
              <div className='d-flex align-items-center justify-content-center w-100 flex-column'>
                  <h1>SMART LIBRARY</h1>
                  <h2>OF CITY PUBLIC</h2>
                  <p>Books are great!</p>
              </div>
            </div>
            <div className={style.menuDiv}>
              <button 
                style={{ backgroundColor: activeBtn === 'borrow' ? '#ffa600' : '#38b6ff' }}
                onClick={() => setActiveBtn('borrow')}
              ><LuBookPlus size={15} style={{ marginRight: 10 }}/>Borrow Book
              </button>
              <button 
                style={{ backgroundColor: activeBtn === 'request' ? '#ffa600' : '#38b6ff' }}
                onClick={() => setActiveBtn('request')}
              ><VscGitPullRequestNewChanges size={15} style={{ marginRight: 10 }}/> Request List
              </button>
              <button 
                style={{ backgroundColor: activeBtn === 'catalogue' ? '#ffa600' : '#38b6ff' }}
                onClick={() => setActiveBtn('catalogue')}
              ><FiBookOpen size={15} style={{ marginRight: 10 }}/>Catalogue
              </button>
              <button 
                style={{ backgroundColor: activeBtn === 'feedback' ? '#ffa600' : '#38b6ff' }}
                onClick={() => setActiveBtn('feedback')}
              ><MdOutlineFeedback size={15} style={{ marginRight: 10 }}/>Feedback
              </button>
            </div>
          </div>
        )
      }
      
      <div className={style.right}>
        <div className={style.header}>
            {
              !isShowSidebar && <GiHamburgerMenu size={25} color='#38b6ff' id={style.hamburgerMenu} onClick={() => setIsShowSidebar(!isShowSidebar)}/>
            }          
            <h1>{getCurrentUserFullname()}</h1>
            {
              userAccount.imageID === 'default' ? (        
                  <div 
                    id={style.defaultProfile}
                    onClick={() => setIsShowDropDownMenu(!isShowDropDownMenu)}
                  >{userAccount?.firstname.substring(0,1)}
                  </div>
              ) : (
                <img 
                  src={userAccount.image} 
                  alt="profile picture"
                  onClick={() => setIsShowDropDownMenu(!isShowDropDownMenu)} 
                />
              )
            }
        </div>

        <div className={style.content} 
          style={{ 
            transition: 'background-color 1s ease', 
            backgroundColor: 
              activeBtn === 'borrow' && '#38b6ff' || 
              activeBtn === 'request' && '#ffa600' ||
              activeBtn === 'catalogue' && 'white' ||
              activeBtn === 'feedback' && 'white',
          }}
        >
          {
            isShowDropDownMenu &&
            <div className={style.divDropDownMenu}>
              <p onClick={() => setActiveBtn('manageAccount')} title='Manage account' ><MdManageAccounts size={20}/> Manage Account</p>
              <hr />
              <button style={{ backgroundColor: '#C7253E', color: 'white' }} onClick={handleLogout}><IoMdLogOut size={20} color='white'/> Logout</button>
            </div>
          }
          {
            isShowNotification && 
            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
              <NotificationComponents message={message} status={notifStatus}/>
            </div>
          }

          {
            activeBtn === 'feedback' && <FeedbackComponents/> || 
            ( activeBtn === 'request' || activeBtn === 'borrow' ) &&
              <div className={style.tableDiv}>
                <div className={style.titleDiv}>
                  <h1>{activeBtn === 'borrow' ? 'Borrow Book' : 'Request List'}</h1>
                </div>
                {
                  activeBtn === 'borrow' && (
                    <div className={style.searchBarDiv}>
                        <input
                          id={style.searchBar}
                          type="text"
                          placeholder="Type any key word..."
                          value={filterText}
                          onChange={(e) => setFilterText(e.target.value)}
                        />
                        <FaFilter size={25} color='white'/>
                        <select onChange={(e) => setFilterBranch(e.target.value)}>
                          <option value='all'>All</option>
                          {
                            branchList.map((branch, index) => (
                              <option value={branch.branch_name} key={index}>{branch.branch_name}</option>
                            ))
                          }
                        </select>
                    </div>
                  )
                }
                  <ConfigProvider
                      theme={{
                          components: {
                          Table: {
                              headerBg: '#38b6ff7c', // Custom header background color
                              cellFontSize: '.8em',
                          },
                          },
                      }}
                  >
                      <Table 
                          className={style.table} 
                          headerBg={'#38b6ff'}
                          columns={ activeBtn === 'borrow' ? borrowColumns : requestColumns }
                          dataSource={activeBtn === 'borrow' ? filteredData : reqList } 
                          pagination={{ pageSize: 5 }} 
                          bordered
                          scroll={{ x: '1000px' }}
                      />
                  </ConfigProvider>
                </div>
       
            || 
            activeBtn === 'manageAccount' && <ManageAccountComponent/> ||
            activeBtn === 'catalogue' && <Catalogue/>

          }

        </div>
      </div>


    </div>
  )
}

export default GuestHomePage
