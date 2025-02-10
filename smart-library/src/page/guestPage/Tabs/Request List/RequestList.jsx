import React, { useContext, useEffect, useState } from 'react'
import { Table, ConfigProvider } from 'antd';
import style from './RequestList.module.css'
import { 
    convertDateFormatIntoString, 
    convertTimeTo12HourFormat
} from '../../../../utils/dateUtils';
import { deleteBorrowBoook, getRequestBooks } from '../../../../services/borrowBookServices';
import loadingAnim from '../../../../assets/loading.gif'
import notificationStore from '../../../../Store/notificationStore';
import { NotificationContext } from '../../../../context/notificationContext';


const RequestList = () => {

    const [requestList, setRequestList] = useState([])
    const userDetails = JSON.parse(localStorage.getItem('user')) || null
    const [isLoading, setIsLoading] = useState(false)
    const { notify } = useContext(NotificationContext)
    const [filterData, setFilterData] = useState([])
    const [filterText, setFilterText] = useState('')

    const columns = [
        {
          title: 'Book ID',
          dataIndex: 'book_id',
          key: 'book_id',
          sorter: (a, b) => a.book_id - b.book_id,
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
          title: 'Borrower',
          dataIndex: 'acct_name',
          key: 'acct_name',
          sorter: (a, b) => a.acct_name.localeCompare(b.acct_name),
          responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
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
          title: 'time',
          render: (data) => convertTimeTo12HourFormat(data.time),
          key: 'time',
          sorter: (a, b) => new Date(a.time) - new Date(b.time),
          responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
          title: 'Action',
          key: 'action',
          fixed: 'right',
          width: 150,
          render: (data) => 
             <button 
                id={style.btnBorrow} 
                disabled={ data.status === 'approved' ? true : false }
                onClick={() => handleDeleteReq(data.id)}>
                Delete
            </button>
        },
    ]


    useEffect(() => {
        const fetchData = async () => {
           const result = await getRequestBooks()

           if (result) {
            //Filter books by designated branch
            const filter = 
                result.filter(data => data.acct_id === userDetails?.id)
                .sort((a, b) => {
                    // Combine date and time into a single Date object
                    const dateTimeA = new Date(`${a.date}T${a.time}`);
                    const dateTimeB = new Date(`${b.date}T${b.time}`);
                    return dateTimeB - dateTimeA
                })

            setFilterData(filter)
            setRequestList(filter)

           }
        }

        fetchData()
    },[isLoading])

    const handleDeleteReq = async (id) => {
        setIsLoading(true)
        try {
            const result = await deleteBorrowBoook(id)

            if (result) {
                notify(result.message, true)
                setIsLoading(false)
            }

            
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
    
    const lowerCaseSearchText = filterText.toLowerCase();
    
    let updateData = [...requestList]
    
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
                    <h3>Request Lists</h3>
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

export default RequestList
