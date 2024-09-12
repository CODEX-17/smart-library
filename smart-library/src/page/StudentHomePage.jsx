import React, {useEffect, useState} from 'react'
import style from './StudentHomePage.module.css'
import bookLogo from '../assets/logo-yellow.png'
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MdManageAccounts } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdLogOut } from "react-icons/io";
import sample from '../assets/book-blue.png'
import axios from 'axios';


const StudentHomePage = () => {

  const navigate = useNavigate()
  const [isShowNav, setIsShowNav] = useState(true)
  const [branchList, setBranchList] = useState([])

  useEffect(() => {
    if (!localStorage.getItem('user')) {
        navigate('/')
    }

    axios.get('http://localhost:5001/branch/getBranch')
    .then((res) => {
      setBranchList(res.data)
    })
    .catch((error) => console.log(error))
  },[])

  return (
    <div className={style.container}>
      {
        isShowNav && (
          <div className={style.left}>
            <div className={style.profileDiv}>
              <GiHamburgerMenu size={25} color='white' id={style.hamburgerMenuProfile} onClick={() => setIsShowNav(!isShowNav)}/>
              <img src={sample} alt="" />
              <h1>Rumar Pamparo</h1>
              <button><MdManageAccounts size={20}/> Manage Account</button>
              <button style={{ backgroundColor: '#C7253E', color: 'white' }} ><IoMdLogOut size={20} color='white'/> Logout</button>
            </div>
            <div className={style.menuDiv}>
              <button>Request List</button>
              <button>Borrow Book</button>
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

        <div className={style.content}>
            <div className={style.searchBarDiv}>
              <input className="form-control" placeholder="Enter book title..." type='text'/>
              <select className="form-select mb-2" aria-label="Default select example">
                <option value=''>Select Branch</option>
                {
                  branchList.map((branch, index) => (
                    <option value={branch.branch_name} key={index}>{branch.branch_name}</option>
                  ))
                }
              </select>
              <button><FaSearch/>Search</button>
            </div>
            <div>
              table
            </div>
        </div>
      </div>


    </div>
  )
}

export default StudentHomePage
