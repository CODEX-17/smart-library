import React, { useState, useEffect } from 'react'
import style from './LibraryBooks.module.css'
import { MdEditSquare } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import axios from 'axios';
import { Table, ConfigProvider } from 'antd';
import { convertDateFormatIntoString } from '../../../../utils/dateUtils';
import { getBooks } from '../../../../services/bookServices';
import AddCopyModal from './Modal/AddCopyModal';

const LibraryBooks = () => {

    const column = [
        {
          title: 'Book ID',
          dataIndex: 'book_id',
          key: 'book_id',
          sorter: (a, b) => a.book_id - b.book_id,
           responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
          title: 'Item no.',
          dataIndex: 'item_no',
          key: 'item_no',
          sorter: (a, b) => a.item_no - b.item_no,
           responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
            title: 'ISBN',
            dataIndex: 'ISBN',
            key: 'ISBN',
            sorter: (a, b) => a.ISBN - b.ISBN,
             responsive: ['xs', 'sm', 'md', 'lg'],
          },
        {
          title: 'Access no.',
          dataIndex: 'access_no',
          key: 'access_no',
          sorter: (a, b) => a.access_no - b.access_no,
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
          title: 'Genre',
          dataIndex: 'genre',
          key: 'genre',
          sorter: (a, b) => a.genre.localeCompare(b.genre),
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
          title: 'Total Copies',
          key: 'quantity',
          dataIndex: 'quantity',
          sorter: (a, b) => a.quantity - b.quantity,
          responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
          title: 'Date Acquired',
          render: (data) => convertDateFormatIntoString(data.date_acquired),
          key: 'date_acquired',
          sorter: (a, b) => new Date(a.date_acquired) - new Date(b.date_acquired),
          responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
            title: 'Publication',
            render: (data) => convertDateFormatIntoString(data.publication),
            key: 'publication',
            sorter: (a, b) => new Date(a.publication) - new Date(b.publication),
            responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 150,
            responsive: ['xs', 'sm', 'md', 'lg'],
            render: (data) => 
            <div className='d-flex gap-2'>
                {/* <button 
                    id={style.btnAction}    
                    title='edit' 
                    style={{ backgroundColor: 'rgb(56, 127, 57)'}}
                    onClick={() => handleEdit(data)}
                ><MdEditSquare size={15}/></button> */}
                <button 
                    id={style.btnAction}    
                    title='Add Copies' 
                    style={{ backgroundColor: 'rgb(56, 127, 57)'}}
                    onClick={() => {
                        setSelectedBook(data), 
                        setIsShowModalAddCopy(true)
                    }}
                ><MdEditSquare size={15}/> Add Copies</button>
            </div>,
        },
    ]

    const [bookList, setBookList] = useState([])
    const [isShowModalAddCopy, setIsShowModalAddCopy] = useState(false)
    const [isToast, setIsToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const userDetails = JSON.parse(localStorage.getItem('user'))

    const [selectedBook, setSelectedBook]= useState(null)
    const [filterText, setFilterText] = useState('')
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            try {
                
                const result = await getBooks()

                if (result) {
                    const updated = result.filter((book) => book.branch === userDetails?.branch)
                    setBookList(updated)
                    setFilteredData(updated)
                }

            } catch (error) {
                console.log(error)
            }
        }

        fetchData()

    },[])

    useEffect(() => {

        if (filterText !== '') {

            const lowerCaseSearchText = filterText.toLowerCase()

            setFilteredData((old) => {
            
                const updated = old.filter(
                    (data) => ( 
                        data.title && data.title.toLowerCase().includes(lowerCaseSearchText) || 
                        data.author_name && data.author_name.toLowerCase().includes(lowerCaseSearchText) ||
                        data.book_id && data.book_id.toString().includes(lowerCaseSearchText) ||
                        data.item_no && data.item_no.toString().includes(lowerCaseSearchText) ||
                        data.access_no && data.access_no.toLowerCase().includes(lowerCaseSearchText) ||
                        data.ISBN && data.ISBN.toString().includes(lowerCaseSearchText)
                    )
                )

                if (updated.length < 0) {
                    return old
                }else {
                    return updated
                }

                
            })
            
        }else {
            setFilteredData(bookList)
        }
        
    },[filterText])

    // const handleDelete = (book_id) => {

    //     axios.post('http://localhost:5001/book/deleteBooks', { book_id })
    //     .then((res) => {
    //         const result = res.data
    //         const message = result.message

    //         setFilteredData((oldData) => {
    //             const data = oldData.filter((data) => data.book_id !== book_id)
    //             return data
    //         })

    //         setToastMessage(message)
    //         setIsToast(true)
    //         setIsShowEditModal(false)

    //         setTimeout(() => {
    //             setIsToast(false)
    //           }, 5000);
    //     })
    //     .catch((err) => console.log(err))
    // }

    // const handleEdit = (data) => {
    //     setSelectedBook(data)
    //     setIsShowEditModal(true)
    //     console.log(data)
    // }

    // const onSubmit = (data) => {
    //    console.log(data)
    //     const book_id = data.book_id

    //     axios.post(`${url}book/updateBooks`, data)
    //     .then((res) => {
    //         const result = res.data
    //         const message = result.message

    //         let updated = bookList.filter((book) => book.book_id !== book_id)
    //         updated.push(data)
    //         setBookList(updated)
    //         setFilteredData(updated)

    //         setToastMessage(message)
    //         setIsToast(true)
    //         setIsShowEditModal(false)

    //         setTimeout(() => {
    //             setIsToast(false)
    //           }, 5000);
          
    //     }).catch((err) => console.log(err))
    // }

  return (
    <div className={style.container}>
        {       
            isToast && (
                <div className={style.toast}>
                    {toastMessage}
                </div>
            )
        }

        {
            isShowModalAddCopy &&
            <div 
                style={{ 
                    position: 'absolute', 
                    width: '100%', 
                    height: '100%',
                    zIndex: 20, 
                }}>
                <AddCopyModal
                    selectedBook={selectedBook}
                    setIsShowModalAddCopy={setIsShowModalAddCopy}
                    setIsToast={setIsToast}
                    setToastMessage={setToastMessage}
                />
            </div>
        }

        <div className={style.content}>
            <div className={style.searchBar}>
                <input type="text" placeholder='Enter search phrase...' onChange={(e) => setFilterText(e.target.value)}/> 
                <IoSearch size={25}/>
            </div>
            <div className='w-100 h-100'>
                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                headerBg: '#38b6ff7c', // Custom header background color
                                cellFontSize: '1em',
                                width: '100%',
                                minWidth: 'none',
                            },
                        },
                    }}
                >
                    <div style={{ width: '100%', overflowX: 'auto' }}>
                        <Table 
                            className={style.table} 
                            headerBg={'#38b6ff'}
                            columns={column} 
                            dataSource={filteredData} 
                            pagination={{ pageSize: 5 }} 
                            bordered
                            scroll={{ x: '1000px' }}
                        />
                    </div>
                </ConfigProvider>
            </div>
            
        </div>
  </div>
  )
}

export default LibraryBooks
