import React, {useEffect, useState} from 'react'
import style from './StudentHomePage.module.css'
import bookLogo from '../assets/logo-yellow.png'
import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MdManageAccounts } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdLogOut } from "react-icons/io";
import sample from '../assets/book-blue.png'
import axios from 'axios';
import DataTable from 'react-data-table-component';
import FeedbackComponents from '../components/FeedbackComponents';
import ManageAccountComponent from '../components/ManageAccountComponent';


const StudentHomePage = () => {

  const navigate = useNavigate()
  const [isShowNav, setIsShowNav] = useState(true)
  const [branchList, setBranchList] = useState([])
  const [activeBtn, setActiveBtn] = useState('borrow')
  const userAccount = JSON.parse(localStorage.getItem('user'))
  const [isToast, setIsToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('sample message')

  const [filterBranch, setFilterBranch] = useState('all')

  const [bookList, setBookList] = useState([])
  const [reqList, setReqList] = useState([])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
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

  const generateFullname = (first, middle, last) => {
    if (first, middle, last) {
      const fullname = first + ' ' + middle.substring(0, 1) + '. ' + last
      return fullname.toUpperCase()
    }
  }

  let currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
  let currentDate = new Date().toDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric',
          weekday: 'short' 
  })

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
    .then((res) => {
      setBookList(() => {
        const oldData = res.data
        let updated = []

        for (let i = 0; i < oldData.length; i++) {
          if (oldData[i].total_copies > 0 ) {
            updated.push(oldData[i])
          }
        }

        return updated
      })
    })
    .catch((error) => console.log(error))

    axios.get('http://localhost:5001/borrow/getBorrowByAcctID/' + userAccount.id)
    .then((res) => {setReqList(res.data)})
    .catch((error) => console.log(error))

  },[])

  const columns = [
    
    {
      name: 'Book Name',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Author',
      selector: row => row.author_name,
      sortable: true,
    },
    {
      name: 'Publication',
      selector: row => row.publication,
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
      selector: row => row.total_copies,
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
      selector: row => row.date,
      sortable: true,
    },
    {
      name: 'Time',
      selector: row => row.time,
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

  const handleBorrow = (row) => {
    if (row) {

      const finalData = {
        book_id: row.book_id,
        title: row.title,
        author_name: row.author_name,
        acct_id: userAccount.id,
        acct_name: generateFullname(userAccount.firstname, userAccount.middlename, userAccount.lastname),
        date: currentDate,
        time: currentTime,
        status: 'pending',
      }

      setReqList((oldData) => [...oldData, finalData])
      setIsToast(true)

      axios.post('http://localhost:5001/borrow/addBorrowBooks', finalData)
      .then((res) => {
          const result = res.data
          const message = result.message
          console.log(message)
          setToastMessage(message)

          //updateTotalCopies in variable
          setBookList(() => {
            let updated = []
    
            for (let i = 0; i < bookList.length; i++) {
              if (bookList[i].total_copies > 0 ) {
                let data = bookList[i]

                if (data.book_id === finalData.book_id) {
                  if (finalData.total_copies > 0) {
                    data.total_copies = finalData.total_copies
                  }else {
                    continue
                  }
                }else {
                  updated.push(data)
                }

                
              }
            }
    
            return updated
          })

          setTimeout(() => {
            setIsToast(false)
          }, 5000);

      })
    }
  
    
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
        isShowNav && (
          <div className={style.left}>
            <div className={style.profileDiv}>
              <GiHamburgerMenu size={25} color='white' id={style.hamburgerMenuProfile} onClick={() => setIsShowNav(!isShowNav)}/>
              {
                userAccount.imageID === 'default' ? (
                  <div id={style.defaultProfile}>{userAccount?.firstname.substring(0,1)}</div>
                ) : (
                  <img src={userAccount.image} alt="profile picture" />
                )
              }
              <h1>{userAccount?.firstname + " " + userAccount?.lastname}</h1>
              <button onClick={() => setActiveBtn('manageAccount')}><MdManageAccounts size={20}/> Manage Account</button>
              <button style={{ backgroundColor: '#C7253E', color: 'white' }} onClick={handleLogout}><IoMdLogOut size={20} color='white'/> Logout</button>
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
              !isShowNav && <GiHamburgerMenu size={25} color='#38b6ff' id={style.hamburgerMenu} onClick={() => setIsShowNav(!isShowNav)}/>
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
            isToast && (
              <div className={style.toast}>
                {toastMessage}
              </div>
            )
          }

          {
            activeBtn === 'feedback' && (
              <FeedbackComponents/>
            ) || 
            (activeBtn === 'request' || activeBtn === 'borrow') &&
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

                <DataTable
                  columns={ activeBtn === 'borrow' ? columns : requestColumns }
                  data={activeBtn === 'borrow' ? filteredData : reqList }
                  highlightOnHover
                  pointerOnHover
                  striped
                  pagination
                  paginationPerPage={5}  // Default rows per page
                  paginationRowsPerPageOptions={[5, 10]}  // Custom dropdown options
                  className={style.table}
                  customStyles={customStyles}
                >
                </DataTable>
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
