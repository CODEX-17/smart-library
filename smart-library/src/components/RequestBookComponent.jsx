import React, { useEffect, useState } from 'react'
import style from './RequestBookComponent.module.css'
import DataTable from 'react-data-table-component';
import { AiFillDelete } from "react-icons/ai";
import axios from 'axios';

const RequestBookComponent = () => {

  const [reqList, setReqList] = useState([])
  const userAccount = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    axios.get('http://localhost:5001/borrow/getBorrow')
    .then((res) => {
      setReqList(res.data)
    })
    .catch((error) => console.log(error))
  },[])

  const handleApprovedReq = (id,response) => {

    if (id,response) {

      let updateData = filteredData
      for (let i = 0; i < filteredData.length; i++) {
        if (filteredData[i].id === id) {
          updateData[i].status = response
        }
      }
      
      setReqList(updateData)

      axios.post('http://localhost:5001/borrow/updateReq', {response, id})
      .then((res) => {
        const result = res.data
        const message = result.message
        console.log(message)
      }).catch((err) => console.log(err))
    }
    


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
      name: 'Action',
      cell: row => (
        <div className='d-flex gap-2 p-2'>
          {
            row.status === 'pending' && (
              <>
                <button id={style.btnAction} onClick={() => handleApprovedReq(row.id,'approved')} style={{ backgroundColor: 'rgb(56, 127, 57)' }}>Approved</button>
                <button id={style.btnAction} onClick={() => handleApprovedReq(row.id,'rejected')} style={{ backgroundColor: '#F5004F' }}>Reject</button>
                <button id={style.deleteBtn}><AiFillDelete size={15} title='delete'/></button>
              </>
            ) ||
            row.status === 'approved' &&
            (
              <>
                <button id={style.btnAction} onClick={() => handleApprovedReq(row.id,'returned')} style={{ backgroundColor: '#B43F3F' }}>Returned</button>
                <button id={style.deleteBtn}><AiFillDelete size={15} title='delete'/></button>
              </>
            ) ||
            row.status === 'returned' &&
            (
              <>
                <button id={style.btnAction} disabled={true}>Returned</button>
                <button id={style.deleteBtn}><AiFillDelete size={15} title='delete'/></button>
              </>
            ) ||
            row.status === 'rejected' &&
            (
              <>
                <button id={style.btnAction} disabled={true}>Rejected</button>
                <button id={style.deleteBtn}><AiFillDelete size={15} title='delete'/></button>
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
