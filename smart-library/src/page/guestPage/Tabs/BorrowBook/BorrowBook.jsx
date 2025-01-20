import React, { useEffect, useState } from 'react'
import { Table, ConfigProvider } from 'antd';
import style from './BorrowBook.module.css'
import { getBooks } from '../../../../services/bookServices';
import { 
    convertDateFormatIntoString, 
    getCurrentDateString, 
    getCurrentTimeString 
} from '../../../../utils/dateUtils';
import { getCurrentUserFullname } from '../../../../utils/userNameUtil';
import { addBorrowBook } from '../../../../services/borrowBookServices';
import loadingAnim from '../../../../assets/loading.gif'
import notificationStore from '../../../../Store/notificationStore';


const BorrowBook = () => {

    const [bookList, setBookList] = useState([])
    const userDetails = JSON.parse(localStorage.getItem('user')) || null
    const [isLoading, setIsLoading] = useState(false)
    const { notificationConfig } = notificationStore()
    const [filterData, setFilterData] = useState([])
    const [filterText, setFilterText] = useState('')

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
            responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
            title: 'Author',
            dataIndex: 'author_name',
            key: 'author_name',
            sorter: (a, b) => a.author_name.localeCompare(b.author_name),
            responsive: ['xs', 'sm', 'md', 'lg'],
        },   
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
            sorter: (a, b) => a.genre - b.genre,
            responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
            title: 'Branch',
            dataIndex: 'branch',
            key: 'branch',
            sorter: (a, b) => a.branch - b.branch,
            responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
            title: 'Total Copies',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: (a, b) => a.quantity - b.quantity,
            responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
            title: 'Date Acquired',
            render: (data) => convertDateFormatIntoString(data.date_acquired),
            key: 'date_acquired',
            sorter: (a, b) => a.date_acquired - b.date_acquired,
            responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 150,
            render: (data) => 
                <div className='d-flex gap-2'>
                    <button 
                        id={style.btnBorrow} 
                        disabled={ data.quantity <=0 ? true : false } 
                        onClick={() => handleBorrow(data)}
                    >Borrow</button>
                </div>
        },
    ]

    const handleBorrow = async (data) => {

        if (isLoading) return
        setIsLoading(true)
        
        try {

            const finalData = {
                book_id: data.book_id,
                title: data.title,
                author_name: data.author_name,
                acct_id: userDetails.id,
                acct_name: getCurrentUserFullname(),
                date: getCurrentDateString(),
                time: getCurrentTimeString(),
                status: 'pending',
                branch: data.branch,
            }

            const result = await addBorrowBook(finalData)

            if (result) {
                setTimeout(() => {
                    setIsLoading(false)
                    notificationConfig(result.message, true)
                }, 3000)
            }
            
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        const fetchData = async () => {
           const result = await getBooks()

           if (result) {

            //Filter books by designated branch
            const filter = result.filter(data => data.branch === userDetails?.branch)
            setFilterData(filter)
            setBookList(filter)

           }
        }

        fetchData()
    },[])

    useEffect(() => {
    
    const lowerCaseSearchText = filterText.toLowerCase();
    
    let updateData = [...bookList]
    
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

  return (
    <div className={style.container}>
        {
            isLoading &&
            <div className='d-flex align-items-center justify-content-center w-100 h-100 position-absolute' style={{ zIndex: 20 }}>
                <div className={style.loading}>
                    <img src={loadingAnim} alt="animation" />
                    <h1>Submitting Request...</h1>
                </div>
            </div>
        }
        <div className='d-flex flex-column w-100 h-100 align-items-center justify-content-center'>
            <div className='container d-flex flex-column gap-2'>
                <div className='w-100 d-flex justify-content-between'>
                    <h3>Search Books</h3>
                    <input 
                        type="text" 
                        className='w-50'
                        placeholder='Search here...'
                        onChange={(e) => setFilterText(e.target.value)}
                    />
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
                        columns={columns}
                        dataSource={filterData} 
                        pagination={{ pageSize: 5 }} 
                        bordered
                        scroll={{ x: '1000px' }}
                    />
                </ConfigProvider>
            </div>
            
        </div>
        
    </div>
  )
}

export default BorrowBook
