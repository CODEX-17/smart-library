import React, { useEffect, useState } from 'react'
import style from './TableViewComponents.module.css'
import axios from 'axios'
import DataTable from 'react-data-table-component';
import { AiFillDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { filter } from 'rxjs';
import TableEditModalComponents from './TableEditModalComponents';
import NotificationComponents from './NotificationComponents';

const TableViewComponents = ({ currentTable }) => {

   //Column Variables
   const columnGenre = [
    {
        name: 'ID',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Genre name',
        selector: row => row.genre_name,
        sortable: true,
    },
    {
        name: 'Action',
        cell: row => (
            <div className='d-flex gap-2 p-2'>
                <button id={style.btnAction} style={{ backgroundColor: '#387F39' }} onClick={() =>handleEdit(row)}><MdEditSquare size={20} title='edit'/></button>
                <button id={style.btnAction} onClick={() => handleDelete(row)}><AiFillDelete size={20} title='delete'/></button>
            </div>
        ),
    },
  ]

  const columnBranch = [
    {
        name: 'ID',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Branch name',
        selector: row => row.branch_name,
        sortable: true,
    },
    {
        name: 'Action',
        cell: row => (
            <div className='d-flex gap-2 p-2'>
                <button id={style.btnAction} style={{ backgroundColor: '#387F39' }} onClick={() =>handleEdit(row)}><MdEditSquare size={20} title='edit'/></button>
                <button id={style.btnAction} onClick={() => handleDelete(row)}><AiFillDelete size={20} title='delete'/></button>
            </div>
        ),
    },
  ]

  const columnFeedback = [
    {
        name: 'ID',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Message',
        selector: row => row.message,
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
        name: 'Action',
        cell: row => (
            <div className='d-flex gap-2 p-2'>
                <button id={style.btnAction} style={{ backgroundColor: '#B8001F' }} onClick={() => handleDelete(row)}><AiFillDelete size={20} title='delete'/></button>
            </div>
        ),
    },
  ]

  const url = 'http://localhost:5001'
  const [genreList, setGenreList] = useState([])
  const [branchList, setBranchList] = useState([])
  const [feedbackList, setFeedbackList] = useState([])
  
  const [filterText, setFilterText] = useState('')

  const [currentDataList, setCurrentDataList] = useState(genreList)
  const [currentColumn, setCurrentColumn] = useState(columnGenre)
  const [selectedData, setSelectedData] = useState(null)

  const [isLoading, setIsLoading] = useState(false)
  const [isShowEditModal, setIssShowEditModal] = useState(false)
  const [isShowNotification, setIsShowNotification] = useState(false)

  const [message, setMessage] = useState('')
  const [notifStatus, setNotifStatus] = useState(true)

  useEffect( () => {

    const gettingDatas = async () => {

      try {
        const [genreRes, branchRes, feedbackRes] = await Promise.all([
          axios.get(`${url}/genre/getGenre`),
          axios.get(`${url}/branch/getBranch`),
          axios.get(`${url}/feedback/getFeedback`)
        ])

        setGenreList(genreRes.data)
        setBranchList(branchRes.data)
        setFeedbackList(feedbackRes.data)

        setCurrentDataList(genreRes.data)
        
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    gettingDatas()

  },[url, message])

  const configData = () => {
    if (currentTable === 'tableFeedback') {
      setCurrentDataList(feedbackList)
      setCurrentColumn(columnFeedback)
    }else if (currentTable === 'tableBranch') {
      setCurrentDataList(branchList)
      setCurrentColumn(columnBranch)
    }else {
      setCurrentDataList(genreList)
      setCurrentColumn(columnGenre)
    }
  }

  useEffect(() => {
    configData()
  },[currentTable])

  useEffect(() => {
    if (filterText != '' && currentDataList.length > 0) {
      setCurrentDataList(() => {
        return currentDataList.filter((data) => 
          data.branch_name && data.branch_name.toLowerCase().includes(filterText.toLowerCase()) ||
          data.genre_name && data.genre_name.toLowerCase().includes(filterText.toLowerCase()) ||
          data.message && data.message.toLowerCase().includes(filterText.toLowerCase())
        )
      })
    }else {
      configData()
    }
  },[filterText])

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

  
  //Functions
  const handleEdit = (data) => {
    setSelectedData(data)
    setIssShowEditModal(true)
  }

  const handleDelete = () => {
    
  }

  const notificationConfig = ( message, status) => {
    setMessage(message)
    setNotifStatus(status)
    setIsShowNotification(true)

    setTimeout(() => {
      setIsShowNotification(false)
      setMessage('')
    }, 3000);
  }


  return (
    <div className={style.container}>
      {
        isShowNotification &&
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <NotificationComponents message={message} status={notifStatus}/>
        </div>
      }

      { isShowEditModal && 
        <div className={style.modalEdit}>
          <TableEditModalComponents 
            currentTable={currentTable}
            selectedData={selectedData} 
            setIssShowEditModal={setIssShowEditModal}
            notificationConfig={notificationConfig}
          /> 
        </div>
      }
      {
        isLoading ? <p>Loading...</p> :
        <>
          <div className={style.head}>
            <h1>{
              currentTable === 'tableGenre' && 'Genre Table' ||
              currentTable === 'tableFeedback' && 'Feedback Table' ||
              currentTable === 'tableBranch' && 'Branch Table'
            }</h1>
            <div className={style.searchBar}>
              <input 
                type="text" 
                placeholder='Enter keyword.'
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
              <IoSearch size={20} color='#38b6ff'/>
            </div>
            
          </div>
          <div className={style.content}>
            <DataTable 
              columns={currentColumn}
              data={currentDataList}
              highlightOnHover
              pointerOnHover
              striped
              pagination
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5, 10]}
              className={style.table}
              customStyles={customStyles}
            >
            </DataTable>
          </div>
        </>
      }
    </div>
  )
}

export default TableViewComponents
