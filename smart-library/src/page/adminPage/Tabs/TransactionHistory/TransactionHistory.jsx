import React, { useEffect, useState } from 'react'
import style from './TransactionHistory.module.css'
import { Table, ConfigProvider } from 'antd';
import { convertTimeTo12HourFormat, convertDateFormatIntoString } from '../../../../utils/dateUtils';
import { getTransactionHistory } from '../../../../services/transactionServices';


const TransactionHistory = () => {

   const [transactionList, setTransactionList] = useState([])

   const userDetails = JSON.parse(localStorage.getItem('user'))

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
            title: 'Transaction Type',
            dataIndex: 'transaction',
            key: 'transaction',
            sorter: (a, b) => a.transaction.localeCompare(b.transaction),
            responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
          title: 'Borrower',
          dataIndex: 'name',
          key: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
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
   ]

   useEffect(() => {
    const fetchData = async () => {
        try {
            const result = await getTransactionHistory()
         
            if (result) {

              const filteredData =  result.filter(data => data.branch === userDetails?.branch)

              const updated = filteredData.sort((a, b) => {
                  // Combine date and time into a single Date object
                  const dateTimeA = new Date(`${a.date}T${a.time}`);
                  const dateTimeB = new Date(`${b.date}T${b.time}`);
                  return dateTimeB - dateTimeA
              })
              
              setTransactionList(updated)
            }

        } catch (error) {
            console.log(error)
        }
    }

    fetchData()
   },[])

  return (
    <div className={style.container}>
      <h3>Transaction History</h3>
      <ConfigProvider
            theme={{
                components: {
                Table: {
                    headerBg: '#38b6ff7c', // Custom header background color
                    cellFontSize: '.8em',
                    margin: 10,
                },
                },
            }}
        >
            <Table 
                columns={column} 
                dataSource={transactionList} 
                pagination={{ pageSize: 10 }} 
                bordered
                scroll={{ x: '1000px' }}
            />
        </ConfigProvider>
    </div>
  )
}

export default TransactionHistory
