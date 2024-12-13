import React, { useEffect, useState } from 'react'
import style from './ImportMenuComponents.module.css'
import { FaFile } from "react-icons/fa"
import { IoAddCircleSharp } from "react-icons/io5"
import { FaFileCircleCheck, FaDownload, FaFileCircleXmark} from "react-icons/fa6"
import AddBookComponents from './AddBookComponents'
import loadingGif from '../assets/loading.gif'
import axios from 'axios'
import NotificationComponents from './NotificationComponents'
import * as XLSX from 'xlsx';

const ImportMenuComponents = () => {


  const [branchList, setBranchList] = useState([])
  const [fileAcceptable, setFileAcceptable] = useState(false)
  const [file, setFile] = useState(null)

  const [isShowModal, setIsShowModal] = useState(false)
  const [isShowForm, setIsShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isShowImportedData, setIsShowImportedData] = useState(true)

  const [isShowNotification, setIsShowNotification] = useState(false)
  const [message, setMessage] = useState('')
  const [notifStatus, setNotifStatus] = useState(false)
  const [dataList, setDataList] = useState([]);

  const userDetails = JSON.parse(localStorage.getItem('user'))
  const selectedBranch = userDetails?.branch || null

  const url = 'http://localhost:5001/'

  useEffect(() => {
    axios.get(`${url}branch/getBranch`)
    .then((res) => {
      const result = res.data
      if (result) setBranchList(result)
    })
    .catch(err => console.log(err))
  },[])

  const handleNoticationConfig = (message, status) => {
    console.log('mes',message)
    setMessage(message)
    setNotifStatus(status)
    setIsShowNotification(true)
    setTimeout(() => {
      setIsShowNotification(false)
    }, 3000);
  }

  const handleFileUpload = (e) => {
    const data = e.target.files[0]
    const reader = new FileReader();
    console.log(data)
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
          
          console.log(numberOfSheets)

          let finalData = []

          for (let i = 0; i < numberOfSheets; i++) {
            const sheetName = workbook.SheetNames[i];
            let worksheet = workbook.Sheets[sheetName];
            console.log('worksheet', worksheet)

            // if (
            //   worksheet?.A1?.v == 'The NATIONAL LIBRARY' ||
            //   worksheet?.A1?.v == 'NAIC MUNICIPAL LIBRARY' ||
            //   worksheet?.A1?.v == '#'
            // ) {
            //   worksheet.A1.v = 'item_no'
            //   worksheet.A1.w = 'item_no'
            // }

            const result = XLSX.utils.sheet_to_json(worksheet, {
              raw: false, // Forces date parsing
              dateNF: 'YYYY-MM-DD' // Specifies date format
            }); // Convert to JSON

            console.log('result', result)

            result.forEach((data) => {
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
            
              finalData.push(updatedData);
            });

            //const final = result.filter((data) => data.AUTHOR || data.ISBN || data.TITLE || data.__EMPTY)
            
            // for (let x = 0; x < final.length; x++) {
            //   let updated = final[x]

            //   if (updated.__EMPTY) {
            //     updated.title = updated.__EMPTY
            //     delete updated.__EMPTY
            //   }

            //   if (updated.__EMPTY_1) {
            //     updated.author = updated.__EMPTY_1
            //     delete updated.__EMPTY_1
            //   }

            //   if (updated.TITLE) {
            //     updated.title = updated.TITLE
            //     delete updated.TITLE
            //   }
              
            //   if (updated.AUTHOR) {
            //     updated.author = updated.AUTHOR
            //     delete updated.AUTHOR
            //   }

            //   if (updated.ISBN) {
            //     updated.isbn = updated.ISBN
            //     delete updated.ISBN
            //   }
             
            //   updated.access_no = updated.__EMPTY_2
            //   updated.call_no = updated.__EMPTY_3
            //   updated.quantity = updated.__EMPTY_4 || 0
            //   updated.date_acquired = updated.__EMPTY_6
            //   updated.amount = updated.__EMPTY_7
            //   updated.total_value = updated.__EMPTY_8
            //   updated.branch = selectedBranch
            //   updated.genre = 'n/a'
       
            //   delete updated.__EMPTY_2
            //   delete updated.__EMPTY_3
            //   delete updated.__EMPTY_4
            //   delete updated.__EMPTY_5
            //   delete updated.__EMPTY_6
            //   delete updated.__EMPTY_7
            //   delete updated.__EMPTY_8
            //   delete updated.ISBN
              
            //   if (
            //     updated.title == 'T I T L E' ||
            //     updated.item_no == '000-099 - (GENERALITIES)' ||
            //     updated.title == '000-099 - (GENERALITIES)' 
            //   ) {
            //     continue
            //   }else {
            //     finalData.push(updated)
            //   }

              
            // }
          }

          if (finalData.length <= 0) {
            handleNoticationConfig('Excel file has no data.', false)
          }

          finalData = [...new Set(finalData)]
          setDataList(finalData)
          setIsShowImportedData(true)
          console.log("finalData", finalData)
          setIsLoading(false)
        };

        reader.readAsBinaryString(data)

      }else {
        setFileAcceptable(false)
        const message = "Invalid file upload."
        handleNoticationConfig(message, false)
      }
    }else {
      setFileAcceptable(false)
      const message = "Failed to upload file."
      handleNoticationConfig(message, false)
    }
    
  }

  const handleImport = async ()  => {
    setIsLoading(true)
    let success = 0
    let failed = 0 
    let current_message = ''  

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
      }
    }
    
    await sendRequestsSequentially()  
    setIsLoading(false)

    if (dataList.length == success) {
      handleNoticationConfig(current_message, true)
      setIsShowModal(false)
      setIsShowImportedData(false)
    }else {
      handleNoticationConfig(`Failed to add ${failed} books, ${success} books added.`, false)
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
  
    const filePath = "./../../public/excel-format.xlsx";
    
    const link = document.createElement("a");
    link.href = filePath;
    link.download = "excel-template.xlsx";
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
            <AddBookComponents handleCloseForm={handleCloseForm} handleNoticationConfig={handleNoticationConfig} selectedBranch={selectedBranch}/>
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
