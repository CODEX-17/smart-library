import React, { useEffect, useState } from 'react'
import style from './RequestBooks.module.css'
import { Table, ConfigProvider } from 'antd';
import { IoSearch } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { convertDateFormatIntoString, convertTimeTo12HourFormat } from '../../../../../utils/dateUtils';
import axios from 'axios';
import NotificationComponents from '../../../../../components/NotificationComponents';
import { deleteBorrowBoook, getRequestBooks, updateBorrowBoook } from '../../../../../services/borrowBookServices';
import { getBooks } from '../../../../../services/bookServices';
import notificationStore from '../../../../../Store/notificationStore';
import loadingStore from '../../../../../Store/loadingStore';


const RequestBooks = () => {

  const [reqList, setReqList] = useState([])
  const [bookList, setBookList] = useState([])
  const [isShowNotification, setIsShowNotification] = useState(false)
  const [filterText, setFilterText] = useState('')
  const [filterData, setFilterData] = useState([])
  const userDetails = JSON.parse(localStorage.getItem('user'))

  const { notificationConfig } = notificationStore()
  const { handleConfigLoading } = loadingStore()

  useEffect(() => {

    const fetchData = async () => {
      try {
      
       let [ books, request ] = await Promise.all([
        getBooks(),
        getRequestBooks(),
      ])

      console.log('books result', books)
      console.log('req result', request)

      setBookList(books)

      request.forEach((req) => {
        const quantity = books
          .filter((book) => book.book_id == req.book_id)
          .map((book) => book.quantity)
          req.quantity = quantity[0]
      })

      setReqList(request.sort((a, b) => {
        // Combine date and time into a single Date object
        const dateTimeA = new Date(`${a.date}T${a.time}`);
        const dateTimeB = new Date(`${b.date}T${b.time}`);
        return dateTimeB - dateTimeA
    }).filter((book) => book.branch === userDetails?.branch))
      setFilterData(request.sort((a, b) => {
        // Combine date and time into a single Date object
        const dateTimeA = new Date(`${a.date}T${a.time}`);
        const dateTimeB = new Date(`${b.date}T${b.time}`);
        return dateTimeB - dateTimeA
    }).filter((book) => book.branch === userDetails?.branch))

      } catch (error) {
        console.log(error)
      }
    }

    fetchData()

  },[handleConfigLoading, notificationConfig])

  useEffect(() => {
    
    const lowerCaseSearchText = filterText.toLowerCase();
    
    let updateData = [...reqList]
    
    if (filterText.length > 0) {
        updateData = updateData.filter(
            (data) => ( 
                data.title && data.title.toLowerCase().includes(lowerCaseSearchText) || 
                data.author_name && data.author_name.toLowerCase().includes(lowerCaseSearchText) ||
                data.book_id && data.book_id.toString().includes(lowerCaseSearchText) ||
                data.item_no && data.item_no.toString().includes(lowerCaseSearchText) ||
                data.access_no && data.access_no.toLowerCase().includes(lowerCaseSearchText) ||
                data.genre && data.genre.toLowerCase().includes(lowerCaseSearchText)
            )
        )
    }
    
    setFilterData(updateData)


  },[filterText])

  const handleUpdateReq = async (data, response) => {
    
    handleConfigLoading('Loading...')

    try {
  
      const finalData = {
        response,
        id: data.id,
        book_id: data.book_id,
        name: data.acct_name,
        branch: data.branch,
        title: data.title,
      }

      const result = await updateBorrowBoook(finalData)

      if (result) {
        reqList.forEach((req) => {
          if (req.id == data.id) {
            req.status = response
            req.quantity = response === 'approved' ? req.quantity -= 1 : req.quantity += 1
          }
        })
    
        setReqList(reqList)
        setFilterData(reqList)

        console.log(result.message)
        notificationConfig(result.message, true)
      }

    } catch (error) {
      console.log(error)
    }

  }

  const handleDelete = async (id) => {

    try {
      
      const result = await deleteBorrowBoook(id)

      if (result) {
        const updatedData = filterData.filter(data => data.id !== id)

        Promise.all([setFilterData(updatedData), setReqList(updatedData)])
        handleConfigLoading('Deleting Request...')
        notificationConfig(result.message, true)
      }

    } catch (error) {
      console.log(error)
    }
    
  }

  const column = [
      {
        title: 'Book ID',
        dataIndex: 'book_id',
        key: 'book_id',
        sorter: (a, b) => a.book_id - b.book_id,
        responsive: ['xs', 'sm', 'md', 'lg'],
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        sorter: (a, b) => a.quantity - b.quantity,
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
        title: 'Borrower',
        dataIndex: 'acct_name',
        key: 'acct_name',
        sorter: (a, b) => a.acct_name.localeCompare(b.acct_name),
        responsive: ['xs', 'sm', 'md', 'lg'],
      },
      {
        title: 'Branch',
        dataIndex: 'branch',
        key: 'branch',
        sorter: (a, b) => a.branch.localeCompare(b.branch),
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
        title: 'Time',
        render: (data) => convertTimeTo12HourFormat(data.time),
        key: 'date',
        sorter: (a, b) => new Date(`1970-01-01T${a.time}`) - new Date(`1970-01-01T${b.time}`),
        responsive: ['xs', 'sm', 'md', 'lg'],
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        sorter: (a, b) => a.status.localeCompare(b.status),
        responsive: ['xs', 'sm', 'md', 'lg'],
      },
      {
          title: 'Action',
          key: 'action',
          fixed: 'right',
          width: 200,
          responsive: ['xs', 'sm', 'md', 'lg'],
          render: (data) => 
          <div className='d-flex gap-2 p-2'>
            {
              data.status === 'pending' && (
                <>
                  {
                    data.quantity > 0 && 
                    <button 
                      id={style.btnAction} 
                      onClick={() =>
                        handleUpdateReq(data, 'approved')
                      } 
                      style={{ backgroundColor: 'rgb(56, 127, 57)' }}
                    >Approved</button>
                  }
                  <button 
                    id={style.btnAction} 
                    onClick={() => handleUpdateReq(data, 'rejected')} 
                    style={{ backgroundColor: '#F5004F' }}
                  >Reject</button>
                </>
              ) ||

              data.status === 'approved' &&
              (
                <>
                  <button 
                    id={style.btnAction} 
                    onClick={() => handleUpdateReq(data, 'returned')} 
                    style={{ backgroundColor: '#B43F3F' }}
                  >Returned</button>
                </>
              ) ||

              data.status === 'returned' &&
              (
                <>
                  <button 
                    id={style.btnAction} 
                    disabled={true}
                  >Returned</button>
                  <button 
                    id={style.deleteBtn}
                  >
                    <AiFillDelete 
                      size={15} 
                      title='delete' 
                      onClick={() => handleDelete(data.id)}
                    />
                  </button>
                </>
              ) ||

              data.status === 'rejected' &&
              (
                <>
                  <button 
                    id={style.btnAction} 
                    disabled={true}>Rejected</button>
                  <button 
                    id={style.deleteBtn}
                  >
                    <AiFillDelete 
                      size={15} 
                      title='delete' 
                      onClick={() => handleDelete(data.id)}
                    />
                  </button>
                </>
              )
              
            }
            
          </div>
          
      }
  ]

  return (
    <div className={style.container}>
      {
        isShowNotification &&
        <div style={{ position: 'absolute', top: 10, right: 10}}>
          <NotificationComponents message={message} status={true}/>
        </div>
      }
      <div className={style.content}>
        <div className={style.searchBar}>
            <input type="text" placeholder='Enter search phrase...' onChange={(e) => setFilterText(e.target.value)}/> 
            <IoSearch size={25}/>
        </div>
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
                columns={column} 
                dataSource={filterData} 
                pagination={{ pageSize: 5 }} 
                bordered
                scroll={{ x: '1000px' }}
            />
        </ConfigProvider>
      </div>
    </div>
  )
}

export default RequestBooks
