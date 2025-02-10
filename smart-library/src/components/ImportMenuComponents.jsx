import React, { useContext, useEffect, useState } from 'react'
import style from './ImportMenuComponents.module.css'
import { FaFile } from "react-icons/fa"
import { IoAddCircleSharp } from "react-icons/io5"
import { FaFileCircleCheck, FaDownload, FaFileCircleXmark} from "react-icons/fa6"
import AddBookComponents from './AddBookComponents'
import loadingGif from '../assets/loading.gif'
import axios from 'axios'
import NotificationComponents from './NotificationComponents'
import * as XLSX from 'xlsx';
import { Progress } from 'antd';
import { NotificationContext } from '../context/notificationContext'
import { getBranch } from '../services/branchServices'
import { getBooks } from '../services/bookServices'
import Fuse from "fuse.js"

const ImportMenuComponents = () => {


  const [branchList, setBranchList] = useState([])
  const [bookList, setBookList] = useState(null)
  const [fileAcceptable, setFileAcceptable] = useState(false)
  const [file, setFile] = useState(null)

  const [isShowModal, setIsShowModal] = useState(false)
  const [isShowForm, setIsShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isShowImportedData, setIsShowImportedData] = useState(true)

  const [isShowNotification, setIsShowNotification] = useState(false)
  const [message, setMessage] = useState('')
  const [notifStatus, setNotifStatus] = useState(false)
  const [dataList, setDataList] = useState([])

  const [uploadProgress, setUploadProgress] = useState(0)

  const userDetails = JSON.parse(localStorage.getItem('user'))
  const selectedBranch = userDetails?.branch || null

  const { notify } = useContext(NotificationContext)

  const url = 'http://localhost:5001/'

  useEffect(() => {

    const fetchData = async () => {
      try {
        const [ branch, books ] = await Promise.all([
          getBranch(), getBooks()
        ])

        if (branch) setBranchList(branch)
        if (books) setBookList(books)

      } catch (error) {
        console.log(error)
      }
    }

    fetchData()

  },[])

  const handleFileUpload = (e) => {
    const data = e.target.files[0]
    const reader = new FileReader();

    if (data) {
      if (
        data.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        data.type === 'application/vnd.ms-excel'
      ) {
        setFileAcceptable(true)
        setFile(data)

        setIsLoading(true)

        reader.onload = (e) => {
          const binaryStr = e.target.result;
          const workbook = XLSX.read(binaryStr, { type: 'binary' });
          const numberOfSheets = workbook.SheetNames.length

          let finalData = []

          for (let i = 0; i < numberOfSheets; i++) {
            const sheetName = workbook.SheetNames[i];
            let worksheet = workbook.Sheets[sheetName];

            const result = XLSX.utils.sheet_to_json(worksheet, {
              raw: false, // Forces date parsing
              dateNF: 'YYYY-MM-DD' // Specifies date format
            }); // Convert to JSON

            let updatedResult = [...result]

            for (let x = 0; x < updatedResult.length; x++) {
              updatedResult[x].quantity = parseInt(updatedResult[x].quantity)
              
              if (updatedResult[x].title === null || updatedResult[x].title === '' || !updatedResult[x].title) {
                updatedResult[x].title = 'no title'
              }

              if (updatedResult[x].ISBN === null || updatedResult[x].ISBN === '' || !updatedResult[x].ISBN) {
                updatedResult[x].ISBN = 'unknown'
              }

              if (updatedResult[x].access_no === null || updatedResult[x].access_no === '' || !updatedResult[x].access_no) {
                updatedResult[x].access_no = 'unknown'
              }
              

              if (updatedResult[x].author_name === null || updatedResult[x].author_name === '' || !updatedResult[x].author_name) {
          
                updatedResult[x].author_name = 'unknown'
              }

              if (updatedResult[x].genre === null || updatedResult[x].genre === '' || !updatedResult[x].genre) {
              
                updatedResult[x].genre = 'unknown'
              }

              if (updatedResult[x].quantity === null || updatedResult[x].quantity === '' || !updatedResult[x].quantity) {
                updatedResult[x].quantity = 0
              }else {
                updatedResult[x].quantity = parseInt(updatedResult[x].quantity)
              }

              if (updatedResult[x].amount === null || updatedResult[x].amount === '' || !updatedResult[x].amount) {
                updatedResult[x].amount = 0
              }else {
                updatedResult[x].amount = parseInt(updatedResult[x].amount)
              }

              if (updatedResult[x].total_value === null || updatedResult[x].total_value === '' || !updatedResult[x].total_value) {
                updatedResult[x].total_value = 0
              }else {
                updatedResult[x].total_value = parseInt(updatedResult[x].total_value)
              }

              if (updatedResult[x].date_acquired === null || updatedResult[x].date_acquired === '' || !updatedResult[x].date_acquired) {
                updatedResult[x].date_acquired = null
              }

              if (updatedResult[x].publication === null || updatedResult[x].publication === '' || !updatedResult[x].publication) {
                updatedResult[x].publication = null
              }

              if (userDetails?.branch !== 'any') {
                updatedResult[x].branch = userDetails?.branch
              }else{
                if (updatedResult[x].branch === null || updatedResult[x].branch === '' || !updatedResult[x].branch) {
                  updatedResult[x].branch = userDetails?.branch
                }
              }


            }

            updatedResult.forEach((data) => {
              const updatedData = { ...data };
            
              // Check and parse date fields
              ['date_acquired', 'publication'].forEach((key) => {
                if (typeof data[key] === 'number') {
                  const parsedDate = XLSX.SSF.parse_date_code(data[key]);
                  
                  // Format with leading zeros
                  const month = String(parsedDate.m).padStart(2, '0');
                  const day = String(parsedDate.d).padStart(2, '0');
                  const year = String(parsedDate.y);
            
                  updatedData[key] = `${month}/${day}/${year}`;
                }
              });
            
              
              finalData.quantity
              
              finalData.push(updatedData);
            });

          }

          if (finalData.length <= 0) {
            notify('Excel file has no data.', false)
            return
          }

          const unique = finalData.filter((book) => !bookList.some(a => a.title.trim().toLowerCase() == book.title.trim().toLowerCase()))

          finalData = [...new Set(unique)]
          setDataList(finalData)
          setIsShowImportedData(true)
          setIsLoading(false)
        };

        reader.readAsBinaryString(data)

      }else {
        setFileAcceptable(false)
        const message = "Invalid file upload."
        notify(message, false)
      }
    }else {
      setFileAcceptable(false)
      const message = "Failed to upload file."
      notify(message, false)
    }
    
  }

  const handleImport = async ()  => {
    setIsLoading(true)
    let success = 0
    let failed = 0 
    let current_message = ''  
    let totalProcess = dataList.length

    console.log(dataList)

    const sendRequestsSequentially = async () => {

      for (let i = 0; i < dataList.length; i++) {
        try {
          const res = await axios.post(`${url}book/addBook`, dataList[i])
          const result = res.data
          const message = result.message
          current_message = message  
          success ++
        } catch (err) {
          failed ++
          console.log(err)
        }

        setUploadProgress(Math.round(((i + 1) / totalProcess) * 100))
      }
    }
    
    await sendRequestsSequentially()  
    setIsLoading(false)

    if (dataList.length == success) {
      notify(current_message, true)
      setIsShowModal(false)
      setIsShowImportedData(false)
    }else {
      notify(`Failed to add ${failed} books, ${success} books added.`, false)
    }

  }

  const handleCancelButton = () => {
    setFileAcceptable(false)
    setFile(null)
    setIsShowModal(false)
    setIsShowImportedData(false)
    setDataList([])
  }

  const handleCloseForm = (status) => {
    setIsShowForm(status)
  }

  const handleDownload = () => {
  
    const filePath = "./../../public/excel-format-final.xlsx";
    
    const link = document.createElement("a");
    link.href = filePath;
    link.download = "excel-format-final.xlsx";
    link.click();
    link.remove();
  };


  return (
    <div className={style.container}>

      {
        isLoading && (
          <div className={style.loading}>
            <img src={loadingGif} alt="loading.." />
            <h1>Loading...</h1>
            <Progress
              className='d-flex justify-content-center mt-2'
              percent={uploadProgress}
              percentPosition={{ align: 'end', type: 'inner' }}
              size={[300, 20]}
              strokeColor="#ffa600"
            />
          </div>
        )
      }

      { isShowNotification && 
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <NotificationComponents message={message} status={notifStatus}/>
        </div>
      }

      {
        (isShowImportedData && dataList.length > 0) && (
          <div className={style.dataDiv}>
            <div className={style.cardList}>
              {
                dataList?.map((data, index) => (
                  <div className={style.cardData} key={index}>
                    <h2>{data?.title == undefined ? 'N/A' : data?.title}</h2>
                    <p>{data?.author_name} {data?.publication}</p>
                  </div>
                ))
              }
              
             
            </div>
            <div className={style.miniDashboard}>
              <p>Total Books: {dataList.length}</p>
              <div>
                
              </div>
              <div className='d-flex w-100 gap-2'>
                <button onClick={handleImport} disabled={dataList.length > 0 ? false : true}>Import</button>
                <button 
                  style={{ backgroundColor: '#B8001F', width: '30%', }} 
                  onClick={handleCancelButton}
                >Cancel</button>
              </div>
            </div>
          </div>
        )
      }

      {isShowModal && (
          <div className={style.modal}>
            {fileAcceptable ? 
              <FaFileCircleCheck size={60} color='#347928'/> : 
              <FaFileCircleXmark size={60} color='#C7253E'/>
            }
            <input type="file" accept='.xlsx, .xls' onChange={handleFileUpload}/>
            <div className='d-flex flex-column w-100 gap-2'>
              <button 
                style={{ backgroundColor: '#B8001F'}} 
                onClick={handleCancelButton}
              >Cancel</button>
              <button 
                onClick={handleDownload}
              ><FaDownload/> Download Excel Format</button>
            </div>
          </div>
        )}

      {isShowForm && (
          <div className={style.formDiv}>
            <AddBookComponents 
              handleCloseForm={handleCloseForm} 
              selectedBranch={selectedBranch}
            />
          </div>
      )}
      
      <div className={style.content}>
        <div className={style.card} onClick={() => setIsShowModal(true)}>
          <FaFile size={30}/>
          <div className='d-flex flex-column align-items-center'>
            <h2>Import Data</h2>
            <p>Only Excel files are accepted. Please upload a valid file.</p>
          </div>
          
        </div>
        <div className={style.card} onClick={() => handleCloseForm(true)}>
          <IoAddCircleSharp size={35}/>
          <div className='d-flex flex-column align-items-center'>
            <h2>Add Manual</h2>
            <p>Manual Entry of Books</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ImportMenuComponents
