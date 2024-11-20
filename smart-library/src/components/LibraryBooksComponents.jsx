import React, { useState, useEffect } from 'react'
import style from './LibraryBooksComponents.module.css'
import DataTable from 'react-data-table-component';
import { AiFillDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import axios from 'axios';
import { useForm } from 'react-hook-form';

const LibraryBooksComponents = () => {

    const [bookList, setBookList] = useState([])
    const [genreList, setGenreList] = useState([])
    const [branchList, setBranchList] = useState([])
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [isToast, setIsToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    const [selectedBook, setSelectedBook]= useState(null)

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
        }
    })

    useEffect(() => {
        if (selectedBook) {
            reset({
                book_id: selectedBook.book_id,
                item_no: selectedBook.item_no,
                title: selectedBook.title,
                author:  selectedBook.author_name,
                branch:  selectedBook.branch,
                genre:  selectedBook.genre,
                amount:  selectedBook.amount,
                quantity:  selectedBook.quantity,
                call_no:  selectedBook.call_no,
                total_value:  selectedBook.total_value,
                date_acquired:  selectedBook.date_acquired,
                access_no: selectedBook.access_no,
            });
        }
    }, [selectedBook, reset]);

    useEffect(() => {

        axios.get('http://localhost:5001/book/getBooks')
        .then((res) => {
            setBookList(res.data)
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

    const customStyles = {
        table: {
            style: {
                color: 'red'
            },
        },
        headCells: {
            style: {
                fontWeight: 'bold',
                fontSize: '10pt',
            },
        },
    }

    const column = [
        {
            name: 'Item no.',
            selector: row => row.item_no,
            sortable: true,
        },
        {
            name: 'access no.',
            selector: row => row.access_no,
            sortable: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Author',
            selector: row => row.author_name,
            sortable: true,
        },
        {
            name: 'Genre',
            selector: row => row.genre,
            sortable: true,
        },
        {
            name: 'Branch',
            selector: row => row.branch,
            sortable: true,
        },
        {
            name: 'Total Copies',
            selector: row => row.quantity,
            sortable: true,
        },
        {
            name: 'Date Acquired',
            selector: row => row.date_acquired,
            sortable: true,
        },
        
        {
            name: 'Action',
            cell: row => (
                <div className='d-flex gap-2 p-2'>
                    <button id={style.btnAction} style={{ backgroundColor: '#387F39' }} onClick={() =>handleEdit(row)}><MdEditSquare size={20} title='edit'/></button>
                    <button id={style.btnAction} onClick={() => handleDelete(row.book_id)}><AiFillDelete size={20} title='delete'/></button>
                </div>
            ),
        },
    ]

    const [filterText, setFilterText] = useState('')
    
    // Filter the data based on the search query
    const filteredData = bookList.filter(item => 
        item.item_no && item.item_no === filterText || 
        item.title && item.title.toLowerCase().includes(filterText.toLowerCase()) ||
        item.author_name && item.author_name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.access_no && item.access_no.toLowerCase().includes(filterText.toLowerCase()) ||
        item.genre && item.genre.toLowerCase().includes(filterText.toLowerCase())
    );


    const handleDelete = (book_id) => {

        axios.post('http://localhost:5001/book/deleteBooks', { book_id })
        .then((res) => {
            const result = res.data
            const message = result.message

            setBookList((oldData) => {
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
                    <div className='w-100 d-flex align-items-center justify-content-end'>
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
                                <label>Item number <b>*</b></label>
                                <input 
                                    type="number" 
                                    placeholder='ex. 0000'
                                    {...register('item_no', { 
                                    required: 'Item number is required',
                                    minLength: {
                                        value: 4,
                                        message: "Item number must be 4 digit only.",
                                    },
                                    maxLength: {
                                        value: 4,
                                        message: "Item number must be 4 digit.",
                                    }
                                    })}
                                />
                                {errors.item_no && <p>{errors.item_no.message}</p>}
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
                                            <option value={branch.branch_name} key={index}>{branch.branch_name}</option>
                                        )) 
                                    }
                                </select>
                                {errors.genre && <p>{errors.genre.message}</p>}
                            </div>
                        </div>

                        <div className='d-flex w-100 gap-2 mb-2'>
                            <div className='d-flex flex-column w-100'>
                            <label>Amount</label>
                            <input
                                type="number"
                                {...register('amount')}
                            />
                            {errors.amount && <p>{errors.amount.message}</p>}
                            </div>
                            
                            <div className='d-flex flex-column w-100'>
                            <label>Quantity</label>
                            <input type="number" {...register('quantity')}/>
                            </div>
                        </div>
                        <div className='d-flex w-100 gap-2 mb-2'>
                            <div className='d-flex flex-column w-100'>
                            <label>Call number</label>
                            <input 
                                type="number" 
                                {...register('call_no', {
                                pattern: {
                                    value: /^09\d{9}$/,
                                    message: "Contact number must start with 09 and be 11 digits",
                                },
                                minLength: {
                                    value: 11,
                                    message: "Contact number must be 11 digits",
                                },
                                maxLength: {
                                    value: 11,
                                    message: "Contact number must be 11 digits",
                                },
                                }
                                )}/>
                                {errors.call_no && <p>{errors.call_no.message}</p>}
                            </div>
                            <div className='d-flex flex-column w-100'>
                            <label>Total Value</label>
                            <input type="number" {...register('total_value')}/>
                            </div>
                            <div className='d-flex flex-column w-100'>
                            <label>Date Acquired</label>
                            <input type="date" {...register('date_acquired')}/>
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
            <h1>Book List</h1>
            <div className={style.tableDiv}>
                <input
                    id={style.searchBar}
                    type="text"
                    placeholder="Search..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
                <DataTable 
                    columns={column}
                    data={filteredData}
                    highlightOnHover
                    pointerOnHover
                    striped
                    pagination
                    paginationPerPage={5}  // Default rows per page
                    paginationRowsPerPageOptions={[5, 10]}  // Custom dropdown options
                    className={style.table}
                    customStyles={customStyles}
                >
                </DataTable>
            </div>
        </div>
  </div>
  )
}

export default LibraryBooksComponents
