import React, { useState, useEffect } from 'react'
import style from './AdminCatalogue.module.css'
import { IoSearch } from "react-icons/io5";
import { getBooks } from '../../../../services/bookServices';
import { getGenre } from '../../../../services/genreServices';
import SidebarCatalogue from './SidebarCatalogue';
import { Table, ConfigProvider } from 'antd';
import { filterByDateRange } from './services/dateFilter';
import { convertDateFormatIntoString } from '../../../../utils/dateUtils';



const AdminCatalogue = () => {

  const [genreList, setGenreList] = useState([])
  const [bookList, setBookList] = useState([])
  const [enableBtn, setEnableBtn] = useState(false)
  const [isShowTable, setIsShowTable] = useState(false)

  const [selectedGenre, setSelectedGenre] = useState([])
  const [selectedBranch, setSelectedBranch] = useState('all')
  const [selectDateAcquired, setSelectDateAcquired] = useState({ start: '', end: '' })
  const [filterText, setFilterText] = useState('')

  // Filter the data based on the search query
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
  
   const fetchData = async () => {

    try {
      const dataBooks = await getBooks()
      const dataGenre = await getGenre()

      if (dataBooks) {
        setBookList(dataBooks)
        setFilteredData(dataBooks)
      }
      if (dataGenre) setGenreList(dataGenre)
      
    } catch (error) {
      console.log(error)
    }
   } 

   fetchData()
      
  },[])


  useEffect(() => {

    if (filterText !== '' && selectedGenre !== '') {
      setEnableBtn(true)
    }else {
      setEnableBtn(false)
      setIsShowTable(false)
    }

  },[filterText, selectedGenre])
  

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
      sorter: (a, b) => a.title - b.title,
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'Author',
      dataIndex: 'author_name',
      key: 'author_name',
      sorter: (a, b) => a.author_name - b.author_name,
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
      sorter: (a, b) => a.genre - b.genre,
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
      sorter: (a, b) => a.branch - b.branch,
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'Total Copies',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'Date Acquired',
      render: (data) => convertDateFormatIntoString(data.date_acquired),
      key: 'date_acquired',
      sorter: (a, b) => a.date_acquired - b.date_acquired,
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
  ]

  useEffect(() => {
    
    const lowerCaseSearchText = filterText.toLowerCase();
    
    const oldData = [...bookList]
    let updateData = []

    for (let i = 0; i < oldData?.length; i++) {

      if (selectedBranch !== 'all') {
        if (oldData[i].branch === selectedBranch) {
          updateData.push(oldData[i])
        }
      }else {
        updateData.push(oldData[i])
      }
      
    }

    if (selectDateAcquired.start !== '' && selectDateAcquired.end !== '') {
      const result = filterByDateRange(updateData, selectDateAcquired.start, selectDateAcquired.end)
      updateData = result
    }

    if (selectedGenre?.length > 0) {
      updateData = updateData.filter((data) => selectedGenre.includes(data.genre))
    }

    if (filterText.length > 0) {
      updateData = updateData.filter(
        (data) => ( 
          data.title && data.title.toLowerCase().includes(lowerCaseSearchText) || 
          data.author_name && data.author_name.toLowerCase().includes(lowerCaseSearchText) ||
          data.book_id && data.book_id.toString().includes(lowerCaseSearchText) ||
          data.item_no && data.item_no.toString().includes(lowerCaseSearchText) ||
          data.access_no && data.access_no.toLowerCase().includes(lowerCaseSearchText)
          
        )
      )
    }
    
    setFilteredData(updateData)

    

  },[filterText, selectedGenre, selectedBranch, selectDateAcquired])




  const handleSearchFilter = ({ branch = null, date_acquired = null, genre = null, search_text = '' }) => {

    if (search_text !== '') {
      
      const lowerCaseSearchText = search_text.toLowerCase();

      setFilteredData(
        (oldData) => oldData.filter(
          (data) => (
            data.title.toLowerCase().includes(lowerCaseSearchText) ||
            data.author_name.toLowerCase().includes(lowerCaseSearchText)
          )
        )
      )

    }else {
      setFilteredData(bookList)
    }

  }

  return (
    <div className={style.container}>
      <div className={style.sidebar}>
        <SidebarCatalogue 
          setSelectedBranch={setSelectedBranch} 
          setSelectedGenre={setSelectedGenre} 
          selectedGenre={selectedGenre}
          setSelectDateAcquired={setSelectDateAcquired}
        />
      </div>
      <div className={style.content}>
        <div className={style.searchBar}>
          <input type="text" placeholder='Enter search phrase...' onChange={(e) => setFilterText(e.target.value)}/> 
          <IoSearch size={25}/>
        </div>
        <div className={style.tableDiv}>
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
              dataSource={filteredData} 
              pagination={{ pageSize: 5 }} 
          />
          </ConfigProvider>
        </div>
      </div>
    </div>
  )
}

export default AdminCatalogue
