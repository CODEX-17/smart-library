import React, { useEffect, useState } from 'react'
import style from './RequestBookComponent.module.css'
import DataTable from 'react-data-table-component';
import { AiFillDelete } from "react-icons/ai";
import axios from 'axios';

const RequestBookComponent = () => {

  const [reqList, setReqList] = useState([])
  const [bookList, setBookList] = useState([])

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

        console.log(finalData)
        setReqList(finalData)

      })
      .catch((error) => console.log(error))

    })
    .catch((error) => console.log(error))

  },[])

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
      console.log(message)
    }).catch((err) => console.log(err))
  }

  

  const requestColumns = [
    
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
      name: 'Borrower',
      selector: row => row.acct_name,
      sortable: true,
    },
    {
      name: 'Date',
      selector: row => row.date,
      sortable: true,
    },
    {
      name: 'Time',
      selector: row => row.time,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
    },
    {
      name: 'Total Copies',
      selector: row => row.quantity,
      sortable: true,
    },
    
    {
      name: 'Action',
      cell: row => (
        <div className='d-flex gap-2 p-2'>
          {
            row.status === 'pending' && (
              <>
                {
                  row.quantity > 0 && <button id={style.btnAction} onClick={() => handleUpdateReq(row.id, row.book_id, 'approved')} style={{ backgroundColor: 'rgb(56, 127, 57)' }}>Approved</button>
                }
                <button id={style.btnAction} onClick={() => handleUpdateReq(row.id, row.book_id, 'rejected')} style={{ backgroundColor: '#F5004F' }}>Reject</button>
              </>
            ) ||
            row.status === 'approved' &&
            (
              <>
                <button id={style.btnAction} onClick={() => handleUpdateReq(row.id, row.book_id, 'returned')} style={{ backgroundColor: '#B43F3F' }}>Returned</button>
              </>
            ) ||
            row.status === 'returned' &&
            (
              <>
                <button id={style.btnAction} disabled={true}>Returned</button>
                <button id={style.deleteBtn}><AiFillDelete size={15} title='delete' onClick={() => handleDelete(row.id)}/></button>
              </>
            ) ||
            row.status === 'rejected' &&
            (
              <>
                <button id={style.btnAction} disabled={true}>Rejected</button>
                <button id={style.deleteBtn}><AiFillDelete size={15} title='delete' onClick={() => handleDelete(row.id)}/></button>
              </>
            )
            
          }
          
        </div>
      ),
    },
  ];

  const [filterText, setFilterText] = useState('');
  
  // Filter the data based on the search query
  const filteredData = reqList.filter(item => 
    item.book_id && item.book_id.toLowerCase().includes(filterText.toLowerCase()) || 
    item.title && item.title.toLowerCase().includes(filterText.toLowerCase()) ||
    item.author_name && item.author_name.toLowerCase().includes(filterText.toLowerCase()) ||
    item.status && item.status.toLowerCase().includes(filterText.toLowerCase()) ||
    item.acct_name && item.acct_name.toLowerCase().includes(filterText.toLowerCase())
  );

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
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <h1>Request Book List</h1>
        <div className={style.tableDiv}>
          <input
            id={style.searchBar}
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        
            <DataTable 
              columns={requestColumns}
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

export default RequestBookComponent
