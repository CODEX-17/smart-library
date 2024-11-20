import React, {useEffect, useState} from 'react'
import style from './StudentHomePage.module.css'
import bookLogo from '../assets/logo-yellow.png'
import { FaFilter } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MdManageAccounts } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdLogOut } from "react-icons/io";
import axios from 'axios';
import DataTable from 'react-data-table-component';
import FeedbackComponents from '../components/FeedbackComponents';
import ManageAccountComponent from '../components/ManageAccountComponent';
import NotificationComponents from '../components/NotificationComponents';


const StudentHomePage = () => {

  const navigate = useNavigate()
  const [isShowSidebar, setIsShowSidebar] = useState(true)
  const [branchList, setBranchList] = useState([])
  const [activeBtn, setActiveBtn] = useState('borrow')
  const userAccount = JSON.parse(localStorage.getItem('user'))

  const [filterBranch, setFilterBranch] = useState('all')

  const [bookList, setBookList] = useState([])
  const [reqList, setReqList] = useState([])

  const [isShowNotification, setIsShowNotification] = useState(false)
  const [message, setMessage] = useState('')
  const [notifStatus, setNotifStatus] = useState(true)


  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  const generateFullname = (first, middle, last) => {
    if (first, middle, last) {
      const fullname = first + ' ' + middle.substring(0, 1) + '. ' + last
      return fullname.toUpperCase()
    }
  }

  const convertDateFormat = (date) => {
    if (date) {
      let [ year, month, day ] = date.split('-')
      month = 
        month === '1' && 'Jan' || 
        month === '2' && 'Feb' || 
        month === '3' && 'Mar' ||
        month === '4' && 'Apr' || 
        month === '5' && 'May' || 
        month === '6' && 'Jun' ||
        month === '7' && 'Jul' || 
        month === '8' && 'Aug' || 
        month === '9' && 'Sep' ||
        month === '10' && 'Oct' || 
        month === '11' && 'Nov' || 
        month === '12' && 'Dec' 

      return `${month}. ${day}, ${year}`
    }
  }

  const convertTo12HourFormat = (time) => {
    if (time) {
      const [hours, minutes] = time.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      const twelveHour = hours % 12 || 12;
      return `${twelveHour}:${minutes.toString().padStart(2, '0')} ${period}`;
    }
   
  }

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Add leading zero
    const day = String(today.getDate()).padStart(2, '0'); // Add leading zero
    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); // Ensure 2 digits
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Ensure 2 digits
    return `${hours}:${minutes}`;
  };

  useEffect(() => {

    if (!localStorage.getItem('user')) {
      navigate('/')
    }else {
      const data = JSON.parse(localStorage.getItem('user'))
      if (data.acctype !== 'student') {
          navigate('/')
      }
    }

    axios.get('http://localhost:5001/branch/getBranch')
    .then((res) => {setBranchList(res.data)})
    .catch((error) => console.log(error))

    axios.get('http://localhost:5001/book/getBooks')
    .then((res) => setBookList(res.data))
    .catch((error) => console.log(error))

    axios.get('http://localhost:5001/borrow/getBorrowByAcctID/' + userAccount.id)
    .then((res) => {setReqList(res.data)})
    .catch((error) => console.log(error))

  },[message])

  const columns = [
    
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Author',
      selector: row => row.author_name,
      sortable: true,
    },
    {
      name: 'Genre',
      selector: row => row.genre,
      sortable: true,
    },
    {
      name: 'Branch',
      selector: row => row.branch,
      sortable: true,
    },
    {
      name: 'Total Copies',
      selector: row => row.quantity,
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => <button id={style.btnBorrow} onClick={() => handleBorrow(row)}>Borrow</button>,
    },
  ];

  const requestColumns = [
    
    {
      name: 'Book ID',
      selector: row => row.book_id,
      sortable: true,
    },
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Author',
      selector: row => row.author_name,
      sortable: true,
    },
    {
      name: 'Borrower',
      selector: row => row.acct_name,
      sortable: true,
    },
    {
      name: 'Date',
      selector: row => convertDateFormat(row.date),
      sortable: true,
    },
    {
      name: 'Time',
      selector: row => convertTo12HourFormat(row.time),
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => <button id={style.btnBorrow} style={{ backgroundColor: '#A02334' }} onClick={() => handleDeleteReq(row.id)}>Delete</button>,
    },
  ];

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
        acct_name: generateFullname(userAccount.firstname, userAccount.middlename, userAccount.lastname),
        date: getCurrentDate(),
        time: getCurrentTime(),
        status: 'pending',
        book_quantity: row.quantity,
      }

      axios.post('http://localhost:5001/borrow/addBorrowBooks', finalData)
      .then((res) => {
          const result = res.data
          const message = result.message
          notificationConfig(message, true)
      })
    
  };

  const handleDeleteReq = (id) => {

    setReqList(reqList.filter((req) => req.id !== id))

    axios.post('http://localhost:5001/borrow/deleteReq', {id})
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
  );

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
  };

  return (
    <div className={style.container}>
      {
        isShowSidebar && (
          <div className={style.left}>
            <div className={style.profileDiv}>
              <GiHamburgerMenu size={25} color='white' id={style.hamburgerMenuProfile} onClick={() => setIsShowSidebar(!isShowSidebar)}/>
              {
                userAccount.imageID === 'default' ? (
                  <div id={style.defaultProfile}>{userAccount?.firstname.substring(0,1)}</div>
                ) : (
                  <img src={userAccount.image} alt="profile picture" />
                )
              }
              <h1>{userAccount?.firstname + " " + userAccount?.lastname}</h1>
              <div className='d-flex gap-2 mt-2'>
                <button onClick={() => setActiveBtn('manageAccount')} title='Manage account' ><MdManageAccounts size={18}/></button>
                <button style={{ backgroundColor: '#C7253E', color: 'white' }} onClick={handleLogout}><IoMdLogOut size={18} color='white'/></button>
              </div>
            </div>
            <div className={style.menuDiv}>
              <button 
                style={{ backgroundColor: activeBtn === 'borrow' ? '#ffa600' : '#38b6ff' }}
                onClick={() => setActiveBtn('borrow')}
              >Borrow Book
              </button>
              <button 
                style={{ backgroundColor: activeBtn === 'request' ? '#ffa600' : '#38b6ff' }}
                onClick={() => setActiveBtn('request')}
              >Request List
              </button>
              <button 
                style={{ backgroundColor: activeBtn === 'feedback' ? '#ffa600' : '#38b6ff' }}
                onClick={() => setActiveBtn('feedback')}
              >Feedback
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
            <img id={style.bookLogo} src={bookLogo} alt="logo" />
            <div className='d-flex flex-column'>
                <h1>SMART LIBRARY</h1>
                <h2>OF CITY PUBLIC</h2>
                <p>Book are great!</p>
            </div>
        </div>

        <div className={style.content} 
          style={{ 
            transition: 'background-color 1s ease', 
            backgroundColor: 
              activeBtn === 'borrow' && '#38b6ff' || 
              activeBtn === 'request' && '#ffa600' ||
              activeBtn === 'feedback' && 'white'
              ,
          }}
        >
          {
            isShowNotification && 
            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
              <NotificationComponents message={message} status={notifStatus}/>
            </div>
          }

          {
            activeBtn === 'feedback' && (
              <FeedbackComponents/>
            ) || 
            ( activeBtn === 'request' || activeBtn === 'borrow' ) &&

            (
              <div className={style.tableDiv}>
                <div className={style.titleDiv}>
                  <h1>{activeBtn === 'borrow' ? 'Borrow book' : 'Request List'}</h1>
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

                <div className={style.table}>
                  <DataTable
                    columns={ activeBtn === 'borrow' ? columns : requestColumns }
                    data={activeBtn === 'borrow' ? filteredData : reqList }
                    highlightOnHover
                    pointerOnHover
                    striped
                    pagination
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[5, 10]}
                    customStyles={customStyles}
                  >
                  </DataTable>
                </div>
              </div>
            ) || 
            activeBtn === 'manageAccount' && 
            (
              <ManageAccountComponent/>
            )
          }

        </div>
      </div>


    </div>
  )
}

export default StudentHomePage