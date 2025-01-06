import React, { useState, useEffect } from 'react'
import style from './LibraryBooksComponents.module.css'
import { AiFillDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { IoMdClose } from "react-icons/io"; 
import { IoSearch } from "react-icons/io5";
import axios from 'axios';
import { useForm } from 'react-hook-form';

import { Table, ConfigProvider, Button } from 'antd';
import { convertDateFormatIntoString } from '../utils/dateUtils';

const LibraryBooksComponents = () => {

    const column = [
        {
          title: 'Book ID',
          dataIndex: 'book_id',
          key: 'book_id',
          sorter: (a, b) => a.book_id - b.book_id,
        },
        {
          title: 'Item no.',
          dataIndex: 'item_no',
          key: 'item_no',
          sorter: (a, b) => a.item_no - b.item_no,
        },
        {
            title: 'ISBN',
            dataIndex: 'ISBN',
            key: 'ISBN',
            sorter: (a, b) => a.ISBN - b.ISBN,
          },
        {
          title: 'Access no.',
          dataIndex: 'access_no',
          key: 'access_no',
          sorter: (a, b) => a.access_no - b.access_no,
        },
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
          title: 'Author',
          dataIndex: 'author_name',
          key: 'author_name',
          sorter: (a, b) => a.author_name.localeCompare(b.author_name),
        },
        {
          title: 'Genre',
          dataIndex: 'genre',
          key: 'genre',
          sorter: (a, b) => a.genre.localeCompare(b.genre),
        },
        {
          title: 'Branch',
          dataIndex: 'branch',
          key: 'branch',
          sorter: (a, b) => a.branch.localeCompare(b.branch),
        },
        {
          title: 'Total Copies',
          dataIndex: 'quantity',
          key: 'quantity',
          sorter: (a, b) => a.quantity - b.quantity,
        },
        {
          title: 'Date Acquired',
          render: (data) => convertDateFormatIntoString(data.date_acquired),
          key: 'date_acquired',
          sorter: (a, b) => new Date(a.date_acquired) - new Date(b.date_acquired)
        },
        {
            title: 'Publication',
            render: (data) => convertDateFormatIntoString(data.publication),
            key: 'publication',
            sorter: (a, b) => new Date(a.publication) - new Date(b.publication)
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 150,
            render: (data) => 
            <div className='d-flex gap-2'>
                <button 
                    id={style.btnAction}    
                    title='edit' 
                    style={{ backgroundColor: 'rgb(56, 127, 57)'}}
                    onClick={() => handleEdit(data)}
                ><MdEditSquare size={15}/></button>

                <button 
                    id={style.btnAction} 
                    title='delete' 
                    onClick={() => handleDelete(data.book_id)}
                ><AiFillDelete size={15}/></button>
            </div>,
        },
    ]

    const [bookList, setBookList] = useState([])
    const [genreList, setGenreList] = useState([])
    const [branchList, setBranchList] = useState([])
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [isToast, setIsToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    const [selectedBook, setSelectedBook]= useState(null)
    const [filterText, setFilterText] = useState('')
    const [filteredData, setFilteredData] = useState([])

    const url = 'http://localhost:5001/'

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            book_id: selectedBook?.book_id,
            item_no: selectedBook?.item_no,
            ISBN: selectedBook?.ISBN,
            access_no: selectedBook?.access_no,
            title: selectedBook?.title,
            author:  selectedBook?.author_name,
            branch:  selectedBook?.branch.toUpperCase(),
            genre:  selectedBook?.genre,
            amount:  selectedBook?.amount,
            quantity:  selectedBook?.quantity || 1,
            total_value:  selectedBook?.total_value,
            date_acquired:  selectedBook?.date_acquired,
            publication:  selectedBook?.publication,
        }
    })

    useEffect(() => {
        if (selectedBook) {
            reset({
                book_id: selectedBook?.book_id,
                item_no: selectedBook?.item_no,
                ISBN: selectedBook?.ISBN,
                access_no: selectedBook?.access_no,
                title: selectedBook?.title,
                author:  selectedBook?.author_name,
                branch:  selectedBook?.branch,
                genre:  selectedBook?.genre,
                amount:  selectedBook?.amount,
                quantity:  selectedBook?.quantity,
                call_no:  selectedBook?.call_no,
                total_value:  selectedBook?.total_value,
                date_acquired:  selectedBook?.date_acquired,
                publication:  selectedBook?.publication,
            });
        }
    }, [selectedBook, reset]);

    useEffect(() => {

        axios.get('http://localhost:5001/book/getBooks')
        .then((res) => {
            setBookList(res.data)
            setFilteredData(res.data)
        })
        .catch((error) => console.log(error))

        axios.get('http://localhost:5001/genre/getGenre')
        .then((res) => {
            setGenreList(res.data)
        })
        .catch((error) => console.log(error))

        axios.get('http://localhost:5001/branch/getBranch')
        .then((res) => {
            setBranchList(res.data)
        })
        .catch((error) => console.log(error))

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

    const handleDelete = (book_id) => {

        axios.post('http://localhost:5001/book/deleteBooks', { book_id })
        .then((res) => {
            const result = res.data
            const message = result.message

            setFilteredData((oldData) => {
                const data = oldData.filter((data) => data.book_id !== book_id)
                return data
            })

            setToastMessage(message)
            setIsToast(true)
            setIsShowEditModal(false)

            setTimeout(() => {
                setIsToast(false)
              }, 5000);
        })
        .catch((err) => console.log(err))
    }

    const handleEdit = (data) => {
        setSelectedBook(data)
        setIsShowEditModal(true)
        console.log(data)
    }

    const onSubmit = (data) => {
       console.log(data)
        const book_id = data.book_id

        axios.post(`${url}book/updateBooks`, data)
        .then((res) => {
            const result = res.data
            const message = result.message

            let updated = bookList.filter((book) => book.book_id !== book_id)
            updated.push(data)
            setBookList(updated)
            setFilteredData(updated)

            setToastMessage(message)
            setIsToast(true)
            setIsShowEditModal(false)

            setTimeout(() => {
                setIsToast(false)
              }, 5000);
          
        }).catch((err) => console.log(err))
    }




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
            (isShowEditModal && selectedBook) && (
                <div className={style.modal}>
                    <div className='d-flex align-item-center justify-content-between mb-2'>
                        <h1>Edit book detail</h1>
                        <div className={style.closeDiv}>
                            <IoMdClose 
                                size={25} 
                                title='closed' 
                                cursor={'pointer'} 
                                onClick={() => setIsShowEditModal(false)}
                            />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='d-flex w-100 gap-2 mb-2'>
                            <div className='d-flex flex-column w-100'>
                                <label>Item number(optional)</label>
                                <input 
                                    type="number" 
                                    placeholder='ex. 0000'
                                    {...register('item_no')}
                                />
                            </div>
                            <div className='d-flex flex-column w-100'>
                                <label>Accession number <b>*</b></label>
                                <input 
                                    type="text" 
                                    placeholder='ex. 801111 pl' 
                                    {...register('access_no', { required: 'Accession number is required.' })}
                                />
                                {errors.access_no && <p>{errors.access_no.message}</p>}
                            </div>
                        </div>
                        
                        <div className='d-flex flex-column w-100 mb-2'>
                            <label>Book title <b>*</b></label>
                            <input 
                                type="text"
                                id='title' 
                                placeholder='Alamat ng saging' 
                                {...register('title', { required: 'Book title is required.'})}
                            />
                            {errors.title && <p>{errors.title.message}</p>}
                        </div>

                        <div className='d-flex gap-2 w-100 mb-2'>
                            <div className='d-flex flex-column w-100 mb-2'>
                                <label>Author name <b>*</b></label>
                                <input 
                                    type="text"
                                    id='author'
                                    placeholder='Juan Dela Cruz'
                                    {...register('author', { required: 'Author name is required.' })}
                                />
                                {errors.author && <p>{errors.author.message}</p>}
                            </div>
                            <div className='d-flex flex-column w-100 mb-2'>
                                <label>ISBN<b>*</b></label>
                                <input 
                                    type="text"
                                    id='ex.978 971 508 3390'
                                    placeholder='Juan Dela Cruz'
                                    {...register('ISBN', { required: 'ISBN is required.' })}
                                />
                                {errors.ISBN && <p>{errors.ISBN.message}</p>}
                            </div>
                        </div>

                        
                        <div className='d-flex gap-2 w-100 mb-2'>
                            <div className='d-flex flex-column w-100'>
                                <label>Genre <b>*</b></label>
                                <select 
                                    {...register('genre', { required: 'Genre is required.' })}
                                >
                                    <option value="">Select genre</option>
                                    {
                                        genreList.map((genre, index) => (
                                            <option value={genre.genre_name} key={index}>{genre.genre_name}</option>
                                        )) 
                                    }
                                </select>
                                {errors.genre && <p>{errors.genre.message}</p>}
                            </div>
                            <div className='d-flex flex-column w-100'>
                                <label>Branch <b>*</b></label>
                                <select 
                                    {...register('branch', { required: 'branch is required.' })}
                                >
                                    <option value="">Select genre</option>
                                    {
                                        branchList.map((branch, index) => (
                                            <option value={branch.branch_name.toUpperCase()} key={index}>{branch.branch_name}</option>
                                        )) 
                                    }
                                </select>
                                {errors.genre && <p>{errors.genre.message}</p>}
                            </div>
                        </div>

                        <div className='d-flex w-100 gap-2 mb-2'>
                            <div className='d-flex flex-column w-100'>
                            <label>Amount(optional)</label>
                            <input
                                type="number"
                                {...register('amount')}
                            />
                            {errors.amount && <p>{errors.amount.message}</p>}
                            </div>
                            
                            <div className='d-flex flex-column w-100'>
                            <label>Quantity  <b>*</b></label>
                            <input type="number" {...register('quantity', {required: 'Quantity is required.'})}/>
                            </div>
                        </div>

                        <div className='d-flex w-100 gap-2 mb-2'>
                            <div className='d-flex flex-column w-100'>
                                <label>Date Acquired(optional)</label>
                                <input type="date" {...register('date_acquired')}/>
                            </div>
                            <div className='d-flex flex-column w-100'>
                                <label>Publication(optional)</label>
                                <input type="date" {...register('publication')}/>
                            </div>
                        </div>

                        <div className='d-flex w-100 mt-2'>
                            <button type='submit'>Update</button>
                        </div>
                    </form>
                </div>
            )
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

export default LibraryBooksComponents
