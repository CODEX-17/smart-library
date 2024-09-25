import React, { useState, useEffect } from 'react'
import style from './LibraryBooksComponents.module.css'
import DataTable from 'react-data-table-component';
import { AiFillDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import axios from 'axios';

const LibraryBooksComponents = () => {

    const [bookList, setBookList] = useState([])
    const [genreList, setGenreList] = useState([])
    const [branchList, setBranchList] = useState([])
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [isToast, setIsToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    const [bookID, setBookID] = useState(0)
    const [title, setTitle] = useState('')
    const [authorName, setAuthorName] = useState('')
    const [publication, setPublication] = useState('')
    const [category, setCategory] = useState('')
    const [branch, setBranch] = useState('')
    const [totalCopies, setTotalCopies] = useState(0)

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
            fontSize: '12pt',
        },
        },
    }

    const column = [
        
        {
            name: 'Book ID',
            selector: row => row.book_id,
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
            name: 'Publication',
            selector: row => row.publication,
            sortable: true,
        },
        {
            name: 'Category',
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
            selector: row => row.total_copies,
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
        item.book_id && item.book_id === filterText || 
        item.title && item.title.toLowerCase().includes(filterText.toLowerCase()) ||
        item.author_name && item.author_name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.publication && item.publication.toLowerCase().includes(filterText.toLowerCase()) ||
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
        if (data) {
            setIsShowEditModal(true)
            setBookID(data.book_id)
            setTitle(data.title)
            setAuthorName(data.author_name)
            setPublication(data.publication)
            setCategory(data.genre)
            setBranch(data.branch)
            setTotalCopies(data.total_copies)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:5001/book/updateBooks', { title, authorName, publication, category, branch, totalCopies, bookID })
        .then((res) => {
            const result = res.data
            const message = result.message

           setBookList((oldData) => {
                let updated = [...oldData]

                for (let i = 0; i < updated.length; i++) {
                    if (updated[i].book_id === bookID) {
                        updated[i].title = title
                        updated[i].author_name = authorName
                        updated[i].publication = publication
                        updated[i].genre = category
                        updated[i].branch = branch
                        updated[i].total_copies = totalCopies
                    }
                }

                return updated
           })

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
            isShowEditModal && (
                <div className={style.modal}>
                    <div className={style.modalHead}>
                        <div id={style.badge}>
                            Book ID: {bookID}
                        </div>
                        
                        <IoMdClose size={25} title='closed' cursor={'pointer'} onClick={() => setIsShowEditModal(false)}/>
                    </div>
                    <form action="" onSubmit={handleSubmit}>
                        <div className={style.modalContent}>
                            <div className='w-100 mb-2'>
                                <p>Title</p>
                                <input type="text" value={title} required onChange={(e) => setTitle(e.target.value)}/>
                            </div>
                            <div className='w-100 mb-2'>
                                <p>Author Name</p>
                                <input type="text" value={authorName} required onChange={(e) => setAuthorName(e.target.value)}/>
                            </div>
                            <div className='w-100 mb-2'>
                                <p>Publication</p>
                                <input type="text" value={publication} required onChange={(e) => setPublication(e.target.value)}/>
                            </div>
                            <div className='w-100 d-flex gap-2 mb-2'>
                                <div className='w-50'>
                                    <p>Category</p>
                                    <select value={category} required onChange={(e) => setCategory(e.target.value)}>
                                        {
                                            genreList.map((genre, index) => (
                                                <option key={index} value={genre.genre_name}>{genre.genre_name}</option>
                                            ))
                                        }                              
                                    </select>
                                </div>
                                <div className='w-50'>
                                    <p>Branch</p>
                                    <select value={branch} required onChange={(e) => setBranch(e.target.value)}>
                                        {
                                            branchList.map((branch, index) => (
                                                <option key={index} value={branch.branch_name}>{branch.branch_name}</option>
                                            ))
                                        }                              
                                    </select>
                                </div>
                            </div>
                            <div className='w-100 mb-5'>
                                <p>Total Copies</p>
                                <input type="number" value={totalCopies} required onChange={(e) => setTotalCopies(e.target.value)}/>
                            </div>

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
