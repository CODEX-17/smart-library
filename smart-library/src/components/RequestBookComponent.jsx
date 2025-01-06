import React, { useEffect, useState } from 'react'
import style from './RequestBookComponent.module.css'
import { Table, ConfigProvider } from 'antd';
import { IoSearch } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { convertDateFormatIntoString, convertTimeTo12HourFormat } from '../utils/dateUtils';
import axios from 'axios';
import NotificationComponents from './NotificationComponents';


const RequestBookComponent = () => {

  const [reqList, setReqList] = useState([])
  const [bookList, setBookList] = useState([])
  const [message, setMessage] = useState('')
  const [isShowNotification, setIsShowNotification] = useState(false)

  useEffect(() => {

    axios.get('http://localhost:5001/book/getBooks')
    .then((res) => {
      const books = res.data
      setBookList(res.data)

      axios.get('http://localhost:5001/borrow/getBorrow')
      .then((res) => {
        let finalData = res.data

        if (finalData.length > 0 && books.length > 0) {
          for (let i = 0; i < finalData.length; i++) {

            const book_id = finalData[i].book_id

            for (let x = 0; x < books.length; x++) {
              if (books[x].book_id == book_id) {
                const quantity = books[x].quantity
                finalData[i].quantity = quantity
              }
            }

          }
          
        }

        const sorted = finalData.sort((a, b) => new Date(b.date) - new Date(a.date))
        setReqList(sorted)

      })
      .catch((error) => console.log(error))

    })
    .catch((error) => console.log(error))

  },[message])

  const handleUpdateReq = (id, book_id, response) => {

    if (id,response) {

      let updateData = filteredData
      for (let i = 0; i < filteredData.length; i++) {
        if (filteredData[i].id === id) {
          updateData[i].status = response
        }
      }
      
      if (response === 'approved') {
        for (let i = 0; i < updateData.length; i++) {
          if (updateData[i].book_id === book_id) {
            updateData[i].quantity -= 1
          }
        }
      }

      if (response === 'returned') {
        for (let i = 0; i < updateData.length; i++) {
          if (updateData[i].book_id === book_id) {
            updateData[i].quantity += 1
          }
        }
      }

      setReqList(updateData)

      axios.post('http://localhost:5001/borrow/updateReq', {response, id, book_id})
      .then((res) => {
        const result = res.data
        const message = result.message
        console.log(message)
      }).catch((err) => console.log(err))
    }
    


  }

  const handleDelete = (id) => {

    axios.post('http://localhost:5001/borrow/deleteReq', {id})
    .then((res) => {
      const result = res.data
      const message = result.message
      setMessage(message)
      setIsShowNotification(true)

      setTimeout(() => {
        setIsShowNotification(false)
        setMessage('')
      }, 3000);

    }).catch((err) => console.log(err))
    
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
                    data.quantity > 0 && <button id={style.btnAction} onClick={() => handleUpdateReq(data.id, data.book_id, 'approved')} style={{ backgroundColor: 'rgb(56, 127, 57)' }}>Approved</button>
                  }
                  <button id={style.btnAction} onClick={() => handleUpdateReq(data.id, data.book_id, 'rejected')} style={{ backgroundColor: '#F5004F' }}>Reject</button>
                </>
              ) ||
              data.status === 'approved' &&
              (
                <>
                  <button id={style.btnAction} onClick={() => handleUpdateReq(data.id, data.book_id, 'returned')} style={{ backgroundColor: '#B43F3F' }}>Returned</button>
                </>
              ) ||
              data.status === 'returned' &&
              (
                <>
                  <button id={style.btnAction} disabled={true}>Returned</button>
                  <button id={style.deleteBtn}><AiFillDelete size={15} title='delete' onClick={() => handleDelete(data.id)}/></button>
                </>
              ) ||
              data.status === 'rejected' &&
              (
                <>
                  <button id={style.btnAction} disabled={true}>Rejected</button>
                  <button id={style.deleteBtn}><AiFillDelete size={15} title='delete' onClick={() => handleDelete(data.id)}/></button>
                </>
              )
              
            }
            
          </div>
          
      }
  ]
  

  const [filterText, setFilterText] = useState('');
  
  // Filter the data based on the search query
  const filteredData = reqList.filter(item => 
    item.book_id && item.book_id.toLowerCase().includes(filterText.toLowerCase()) || 
    item.title && item.title.toLowerCase().includes(filterText.toLowerCase()) ||
    item.author_name && item.author_name.toLowerCase().includes(filterText.toLowerCase()) ||
    item.status && item.status.toLowerCase().includes(filterText.toLowerCase()) ||
    item.acct_name && item.acct_name.toLowerCase().includes(filterText.toLowerCase())
  );

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
                dataSource={filteredData} 
                pagination={{ pageSize: 5 }} 
                bordered
                scroll={{ x: '1000px' }}
            />
        </ConfigProvider>
      </div>
    </div>
  )
}

export default RequestBookComponent
