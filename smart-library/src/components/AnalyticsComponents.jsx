import React,{ useEffect, useState } from 'react'
import style from './AnalyticsComponents.module.css'
import { MdOutlineMenuBook } from "react-icons/md";
import { RiUser3Fill } from "react-icons/ri";
import { MdAssignmentReturn } from "react-icons/md";
import { MdAssignmentReturned } from "react-icons/md";
import axios from 'axios';


const AnalyticsComponents = () => {

  const [bookList, setBookList] = useState([])
  const [reqList, setReqList] = useState([])
  const [acctList, setAcctList] = useState([])

  let currentDate = new Date().toDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    weekday: 'short' 
  })

  useEffect(() => {
    axios.get('http://localhost:5001/book/getBooks')
    .then((res) => {setBookList(res.data)})
    .catch((err) => console.log(err))

    axios.get('http://localhost:5001/borrow/getBorrow')
    .then((res) => {setReqList(res.data)})
    .catch((err) => console.log(err))

    axios.get('http://localhost:5001/account/getAccounts')
    .then((res) => {setAcctList(res.data)})
    .catch((err) => console.log(err))

  },[])

  const computeTodaysBorrow = () => {
    
    let todaysBorrow = 0
    for (let i = 0; i < reqList.length; i++) {
      const date = reqList[i].date
      const status = reqList[i].status

      if (date === currentDate && status === 'approved') {
        todaysBorrow++
      }
    }
    return todaysBorrow
  }

  const computeTodaysReturn = () => {
    
    let todaysReturn = 0
    for (let i = 0; i < reqList.length; i++) {
      const date = reqList[i].date
      const status = reqList[i].status

      console.log(date === currentDate) 

      if (date === currentDate && status === 'returned') {
        todaysReturn++
      }
    }
    return todaysReturn
  }

  return (
    <div className={style.container}>
      <div className={style.cardAnalyticsBar}>
        <div className={style.card} style={{ backgroundColor: '#387F39' }}>
            <div className={style.cardHead}>
              <MdOutlineMenuBook size={50}/>
              <h1>{bookList?.length}</h1>
            </div>
            <p>Total number of books</p>
        </div>
        <div className={style.card} style={{ backgroundColor: '#FFB200' }}>
            <div className={style.cardHead}>
              <RiUser3Fill size={50}/>
              <h1>{acctList?.length}</h1>
            </div>
            <p>Total number of users/clients</p>
        </div>
        <div className={style.card} style={{ backgroundColor: '#2E236C' }}>
            <div className={style.cardHead}>
              <MdAssignmentReturn size={50}/> 
              <h1>{reqList?.length}</h1>
            </div>
            <p>Total request books</p>
        </div>
        <div className={style.card} style={{ backgroundColor: '#2E236C' }}>
            <div className={style.cardHead}>
              <MdAssignmentReturn size={50}/> 
              <h1>{computeTodaysBorrow()}</h1>
            </div>
            <p>Borrowed book today</p>
        </div>
        <div className={style.card} style={{ backgroundColor: '#B60071' }}>
            <div className={style.cardHead}>
              <MdAssignmentReturned size={50}/>
              <h1>{computeTodaysReturn()}</h1>
            </div>
            <p>Return book today</p>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsComponents
