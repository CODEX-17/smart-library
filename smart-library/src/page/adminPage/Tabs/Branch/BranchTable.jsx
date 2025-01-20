import React, { useEffect, useState } from 'react'
import style from './BranchTable.module.css'
import axios from 'axios'
import { Table, ConfigProvider } from 'antd';
import { AiFillDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import TableEditModalComponents from '../../../../components/TableEditModalComponents';
import NotificationComponents from '../../../../components/NotificationComponents';
import DeleteNotifComponents from '../../../../components/DeleteNotifComponents';
import { FaPlus } from "react-icons/fa";
import LoadingComponents from '../../../../components/LoadingComponents';
import { getBranch } from '../../../../services/branchServices';
import BranchModal from './Modal/BranchModal';


const BranchTable = ({ currentTable }) => {

  const column = [
      {
        title: 'Branch ID',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
        responsive: ['xs', 'sm', 'md', 'lg'],
      },
      {
        title: 'Branch Name',
        dataIndex: 'branch_name',
        key: 'branch_name',
        sorter: (a, b) => a.branch_name - b.branch_name,
        responsive: ['xs', 'sm', 'md', 'lg'],
      },
      {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        width: 200,
        responsive: ['xs', 'sm', 'md', 'lg'],
        render: (data) => 
          <div className='d-flex gap-2 p-2'>
            <button 
              id={style.btnAction} 
              style={{ backgroundColor: '#387F39' }} 
              onClick={() => {setSelectedData(data), setIsShowModal(true)}}
            >
                <MdEditSquare size={20} title='edit'/>
            </button>
            <button 
              id={style.btnAction} 
              onClick={() => handleDelete(data)}
            >
              <AiFillDelete 
                size={20} 
                title='delete'
              />
            </button>
          </div>        
      }
  ]

  const url = 'http://localhost:5001'

  const [branchList, setBranchList] = useState([])
  const [filterData, setFilterData] = useState([])
  
  const [filterText, setFilterText] = useState('')

  const [selectedData, setSelectedData] = useState(null)

  const [isLoading, setIsLoading] = useState(false)
  const [isShowModal, setIsShowModal] = useState(false)
  const [isShowNotification, setIsShowNotification] = useState(false)
  const [isShowDeleteNotification, setIsShowDeleteNotification] = useState(false)

  const [message, setMessage] = useState('')
  const [notifStatus, setNotifStatus] = useState(true)

  useEffect( () => {

    const gettingDatas = async () => {

      try {
        const result = await getBranch()

        if (result) {
          setBranchList(result)
          setFilterData(result)
        }
       
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    gettingDatas()

  },[url, message])

  useEffect(() => {
    if (filterText != '' && filterData.length > 0) {
      setFilterData(() => {
        return filterData.filter((data) => 
          data.branch_name && data.branch_name.toLowerCase().includes(filterText.toLowerCase()) ||
          data.genre_name && data.genre_name.toLowerCase().includes(filterText.toLowerCase()) ||
          data.message && data.message.toLowerCase().includes(filterText.toLowerCase())
        )
      })
    }else {
      setFilterData(branchList)
    }
  },[filterText])

  const notificationConfig = ( message, status) => {
    setMessage(message)
    setNotifStatus(status)
    setIsShowNotification(true)

    setTimeout(() => {
      setIsShowNotification(false)
      setMessage('')
    }, 3000);
  }

  const handleDelete = (data) => {
    setSelectedData(data)
    setIsShowDeleteNotification(true)
  }

  const handleDeleteResponse = (data) => {

    if (data && selectedData) {

      const id = selectedData?.id

      axios.post(`${url}/branch/deleteBranch`, { id })
      .then((res) => {
        const result = res.data
        setMessage(result.message)
        notificationConfig(result.message, true)
        setIsShowDeleteNotification(false)
      })
      .catch(err => console.log(err))

    }
}


  return (
    <div className={style.container}>
      {
        isShowDeleteNotification && 
        <div style={{ position: 'absolute', zIndex: '20', width: '100%', height: '100%',}}>
          <DeleteNotifComponents handleDeleteResponse={handleDeleteResponse}/>
        </div>
      }
      {
        isShowNotification &&
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <NotificationComponents message={message} status={notifStatus}/>
        </div>
      }
      {
        isShowModal && (
          <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 20,}}>
            <BranchModal 
              setIsShowModal={setIsShowModal} 
              selectedData={selectedData}
              notificationConfig={notificationConfig}
            />
          </div>
        )
      }
      {
        isLoading ? <LoadingComponents /> :
        <>
          <div className={style.head}>
            <h1>Branch Table</h1>
            <div className='d-flex gap-2 w-50'>
              <div className={style.searchBar}>
                <input 
                  type="text" 
                  placeholder='Enter keyword.'
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
                <IoSearch size={20} color='#38b6ff'/>
              </div>
              {
                currentTable !== 'tableFeedback' &&
                <button 
                  title='add data' 
                  onClick={() => {setSelectedData(null), setIsShowModal(true)}}
                  >Add <FaPlus size={10}/>
                </button>
              }
              
            </div>
            
          </div>
          <div className={style.content}>
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  headerBg: '#38b6ff7c', // Custom header background color
                  cellFontSize: '1em',
                },
              },
            }}
          >
          <Table 
              className={style.table} 
              headerBg={'#38b6ff'}
              columns={column} 
              dataSource={filterData} 
              pagination={{ pageSize: 5 }} 
          />
          </ConfigProvider>
          </div>
        </>
      }
    </div>
  )
}

export default BranchTable
