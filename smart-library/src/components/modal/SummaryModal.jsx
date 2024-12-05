  import React, { useEffect, useState } from 'react'
  import style from './SummaryModal.module.css'
  import { IoMdClose } from "react-icons/io";
  import { getRequestBooks } from '../../services/borrowBookServices';

  const SummaryModal = ({ type, setIsShowBorrowSummaryModal }) => {

    const modalType = type || 'borrow'
    const [requestList, setRequestList] = useState([])
    const [dateObject, setDateObject] = useState([])

    useEffect(() => {

      const fetchData = async () => {
        const result = await getRequestBooks()
        
        if (result) {
          const object = type === 'borrow' ? countByDate(result) : countReturnedByDate(result)
          setRequestList(result)
          setDateObject(object)
        }
      }
      
      fetchData()

    },[])

    const countByDate = (data) => {

      const today = new Date()
      const todayStr = today.toISOString().split('T')[0] // Format: YYYY-MM-DD
    
      const startOfWeek = new Date(today)
      startOfWeek.setDate(today.getDate() - today.getDay())
    
      const endOfWeek = new Date(today)
      endOfWeek.setDate(today.getDate() + (6 - today.getDay()))
  
      const thisMonth = today.getMonth()
      const thisYear = today.getFullYear()
    
      const counts = {
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
      }
    
      data.forEach((item) => {
        const itemDate = new Date(item.date);
    
        // Check if the date is today
        if (item.date === todayStr) {
          counts.today++
        }
    
        // Check if the date is within this week
        if (itemDate >= startOfWeek && itemDate <= endOfWeek) {
          counts.thisWeek++
        }
    
        // Check if the date is within this month
        if (itemDate.getMonth() === thisMonth && itemDate.getFullYear() === thisYear) {
          counts.thisMonth++
        }
      })
    
      return counts
    }

    const countReturnedByDate = (data) => {
      const today = new Date()
      const todayStr = today.toISOString().split('T')[0] // Format: YYYY-MM-DD
    
      const startOfWeek = new Date(today)
      startOfWeek.setDate(today.getDate() - today.getDay())
    
      const endOfWeek = new Date(today)
      endOfWeek.setDate(today.getDate() + (6 - today.getDay()))
    
      const thisMonth = today.getMonth()
      const thisYear = today.getFullYear()
    
      const counts = {
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
      }
    
      data.forEach((item) => {
        const itemDate = new Date(item.date)
    
        // Only count items with status 'returned'
        if (item.status === 'returned') {
          // Check if the date is today
          if (item.date === todayStr) {
            counts.today++
          }
    
          // Check if the date is within this week
          if (itemDate >= startOfWeek && itemDate <= endOfWeek) {
            counts.thisWeek++
          }
    
          // Check if the date is within this month
          if (itemDate.getMonth() === thisMonth && itemDate.getFullYear() === thisYear) {
            counts.thisMonth++
          }
        }
      })
    
      return counts
    }

    return (
      <div className={style.container}>     
        <div className={style.card}>
          <div className={style.head}>
            <h2>
              {
                type === 'borrow' ? 
                'Borrow Books Overview' : 
                'Return Books Overview'
              }
              </h2>
            <IoMdClose size={20} title='close' cursor={'pointer'} onClick={() => setIsShowBorrowSummaryModal(false)}/>
          </div>
          <div className={style.content}>
            <div className={style.miniCard}>
                <p>
                  {
                    type === 'borrow' ? 
                    "Today's Borrow" :
                    "Today's Return"
                  }
                </p>
                <h3>{ dateObject?.today || 0 }</h3>
            </div>
            <div className={style.miniCard}>
                <p>
                  {
                    type === 'borrow' ? 
                    "This Week's Borrow" :
                    "This Week's Return"
                  }
                </p>
                <h3>{ dateObject?.thisWeek || 0 }</h3>
            </div>
            <div className={style.miniCard}>
                <p>
                  {
                    type === 'borrow' ? 
                    "This Month's Borrow" :
                    "This Month's Return"
                  }
                </p>
                <h3>{ dateObject?.thisMonth || 0 }</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }

  export default SummaryModal
