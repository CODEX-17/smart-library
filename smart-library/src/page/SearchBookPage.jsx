import React, {useEffect} from 'react'
import style from './SearchBookPage.module.css'
import bookLogo from '../assets/logo-yellow.png'
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const SearchBookPage = () => {

  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('user')) {
        navigate('/')
    }
  },[])

  return (
    <div className={style.container}>
      <div className={style.header}>
          <img id={style.bookLogo} src={bookLogo} alt="logo" />
          <div className='d-flex flex-column'>
              <h1>SMART LIBRARY</h1>
              <h2>OF CITY PUBLIC</h2>
              <p>Book are great!</p>
          </div>
      </div>

      <div className={style.content}>
          <div className='container h-100 d-flex flex-column gap-2 align-items-center justify-content-center p-2'>
            <input class="form-control" placeholder="Enter book title..." type='text'/>
            <select class="form-select" aria-label="Default select example">
              <option selected>Select Branch</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>

            <button><FaSearch/>Search</button>
          </div>
         
      </div>

    </div>
  )
}

export default SearchBookPage
