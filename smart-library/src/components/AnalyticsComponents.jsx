import React,{ useEffect, useState } from 'react'
import style from './AnalyticsComponents.module.css'
import { RiUser3Fill } from "react-icons/ri";
import { 
  MdOutlinePendingActions,
  MdOutlineMenuBook,
  MdAssignmentReturn, 
  MdAssignmentReturned 
} from "react-icons/md";

import { IoExpandSharp } from "react-icons/io5";

import axios from 'axios';
import { Chart } from "react-google-charts";
import SummaryModal from './modal/SummaryModal';
Chart.version = "current"; 

const AnalyticsComponents = () => {

  const [isShowBorrowSummaryModal, setIsShowBorrowSummaryModal] = useState(false)
  const [modalType, setModalType] = useState('borrow')
  const [bookList, setBookList] = useState([])
  const [reqList, setReqList] = useState([])
  const [acctList, setAcctList] = useState([])
  const [pieData, setPieData] = useState([
    ["Status", "Total"],
    ["Approved", 0],
    ["Returned", 0],
    ["Pending", 0],
    ["Rejected", 0],
  ]);

  const [barData, setBarData] = useState([
    ["Month", "Approved", "Returned", "Pending", "Rejected"],
    ["January", 0, 0, 0, 0],
    ["February", 0, 0, 0, 0],
    ["March", 0, 0, 0, 0],
    ["April", 0, 0, 0, 0],
    ["May", 0, 0, 0, 0],
    ["June", 0, 0, 0, 0],
    ["July", 0, 0, 0, 0],
    ["August", 0, 0, 0, 0],
    ["September", 0, 0, 0, 0],
    ["October", 0, 0, 0, 0],
    ["November", 0, 0, 0, 0],
    ["December", 0, 0, 0, 0],
  ]);

  let currentDate = new Date().toDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    weekday: 'short' 
  })

  useEffect(() => {
    
    axios.get('http://82.112.236.213:5001/book/getBooks')
    .then((res) => {setBookList(res.data)})
    .catch((err) => console.log(err))

    axios.get('http://82.112.236.213:5001/borrow/getBorrow')
    .then((res) => {
      const result = res.data
      setReqList(res.data)

      if (result.length > 0) {

        let updatedPieData = [...pieData]
        let updatedBarData = [...barData]
       
        for (let i = 0; i < result.length; i++) {

          const [year, month, days] = result[i].date.split('-')

          const monthIndex = parseInt(month)

          if (result[i].status === "approved") {
            updatedPieData[1][1] += 1
            updatedBarData[monthIndex][1] += 1
          } else if (result[i].status === "returned") {
            updatedPieData[2][1] += 1
            updatedBarData[monthIndex][2] += 1
          } else if (result[i].status === "pending") {
            updatedPieData[3][1] += 1
            updatedBarData[monthIndex][3] += 1
          } else if (result[i].status === "rejected") {
            updatedPieData[4][1] += 1
            updatedBarData[monthIndex][4] += 1
          }
          
        }

        console.log(updatedPieData)
        console.log(updatedBarData)

        setBarData(updatedBarData);
        setPieData(updatedPieData);
      }
    })
    .catch((err) => console.log(err))

    axios.get('https://82.112.236.213:5001/account/getAccounts')
    .then((res) => {setAcctList(res.data)})
    .catch((err) => console.log(err))
    
  },[])


  const computeTodaysBorrow = () => {
    
    let todaysBorrow = 0

    for (let i = 0; i < reqList.length; i++) {
      const date = new Date(reqList[i].date).toDateString()
      const dateNow = new Date().toDateString()
      const status = reqList[i].status

      if (date === dateNow && status === 'approved') {
        todaysBorrow++
      }
    }
    return todaysBorrow
  }

  const computeTodaysReturn = () => {
    
    let todaysReturn = 0

    for (let i = 0; i < reqList.length; i++) {
      const date = new Date(reqList[i].date).toDateString()
      const dateNow = new Date().toDateString()
      const status = reqList[i].status

      if (date == dateNow && status === 'returned') {
        console.log(status)
        todaysReturn++
      }
    }
    return todaysReturn
  }

  const computeTodaysPending = () => {
    
    let totalPending = 0

    for (let i = 0; i < reqList.length; i++) {
      const status = reqList[i].status

      if (status === 'pending') {
        totalPending++
      }
    }
    
    return totalPending
  }

  // Material chart options
  const options = {
    chart: {
      title: "Request Status",
      subtitle: "Graph data of request",
    },
  };

  const pieOptions = {
    title: "Request Status",
    legend: {
      position: "bottom",
      alignment: "center",
    },
    animation: {
      duration: 2000,
      easing: "inAndOut",
      startup: 'true'
    },
    colors: ["#399918", "#38b6ff", "#FF6500", "#C40C0C", "#D3D3D3"],
  }

  return (
    <div className={style.container}>
      {
        isShowBorrowSummaryModal && 
        <div className='d-flex w-100 h-100 position-absolute'>
          <SummaryModal type={modalType} setIsShowBorrowSummaryModal={setIsShowBorrowSummaryModal}/>
        </div>
      }
      <div className={style.cardAnalyticsBar}>
        <div className={style.card} style={{ backgroundColor: '#001A6E' }}>
            <div className={style.cardHead}>
              <MdOutlineMenuBook size={50}/>
              <h1>{bookList?.length}</h1>
            </div>
            <p>Total number of books</p>
        </div>
        <div className={style.card} style={{ backgroundColor: '#441752' }}>
            <div className={style.cardHead}>
              <RiUser3Fill size={50}/>
              <h1>{acctList?.length}</h1>
            </div>
            <p>Total number of users/clients</p>
        </div>
        <div className={style.card} style={{ backgroundColor: '#F26B0F' }}>
            <div className={style.cardHead}>
              <MdAssignmentReturn size={50}/> 
              <h1>{reqList?.length}</h1>
            </div>
            <p>Total request books</p>
        </div>
        <div className={style.card} style={{ backgroundColor: '#FFB200' }}>
            <div className={style.cardHead}>
              <MdOutlinePendingActions size={50}/> 
              <h1>{computeTodaysPending()}</h1>
            </div>
            <p>Total pending books</p>
        </div>
        <div className={style.card} style={{ backgroundColor: '#1F4529' }}>
            <div className={style.cardHead}>
              <MdAssignmentReturn size={50}/> 
              <h1>{computeTodaysBorrow()}</h1>
            </div>
            <p>Borrowed book today</p>
            <IoExpandSharp 
              size={20} 
              cursor={'pointer'} 
              style={{ position: 'absolute', bottom: '4%', right: '4%', zIndex: '10' }}
              onClick={() => { setModalType('borrow'); setIsShowBorrowSummaryModal(true); }}
            />
        </div>
        <div className={style.card} style={{ backgroundColor: '#B60071' }}>
            <div className={style.cardHead}>
              <MdAssignmentReturned size={50}/>
              <h1>{computeTodaysReturn()}</h1>
            </div>
            <p>Return book today</p>
            <IoExpandSharp 
              size={20} 
              cursor={'pointer'} 
              style={{ position: 'absolute', bottom: '4%', right: '4%', zIndex: '20' }}
              onClick={() => { setModalType('returned'); setIsShowBorrowSummaryModal(true); }}
            />
        </div>
      </div>
      <div className={style.contentCharts}>
        <div className={style.cardChart}>
          <Chart
            chartType="PieChart"
            data={pieData}
            options={pieOptions}
            width={"100%"}
            height={"100%"}
            loader={<div>Loading Chart...</div>}
            chartVersion="current"
          />
        </div>
        <div className={style.cardChart}>
          <Chart
            chartType="Bar"
            data={barData}
            options={options}
            loader={<div>Loading Chart...</div>}
            chartVersion="current"
            width={"100%"}
            height={"100%"}
          />
        </div>
      </div>
    </div>
  )
}

export default AnalyticsComponents
