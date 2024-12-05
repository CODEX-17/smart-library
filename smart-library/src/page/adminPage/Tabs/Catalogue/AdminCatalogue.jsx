import React, { useState, useEffect } from 'react'
import style from './AdminCatalogue.module.css'
import { IoSearch } from "react-icons/io5";
import DataTable from 'react-data-table-component';
import { getBooks } from '../../../../services/bookServices';
import { getGenre } from '../../../../services/genreServices';
import SidebarCatalogue from './SidebarCatalogue';
import { Table, ConfigProvider } from 'antd';


const AdminCatalogue = () => {

  const [genreList, setGenreList] = useState([])
  const [bookList, setBookList] = useState([])
  const [enableBtn, setEnableBtn] = useState(false)
  const [isShowTable, setIsShowTable] = useState(false)
  const [selectedGenre, setSelectedGenre] = useState([])

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

  
  const [filterText, setFilterText] = useState('')
  const [category, setCategory] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('')
  

  useEffect(() => {

    if (filterText !== '' && category !== '') {
      setEnableBtn(true)
    }else {
      setEnableBtn(false)
      setIsShowTable(false)
    }

  },[filterText, category])
  
  

  const column = [
    {
      title: 'Book ID',
      dataIndex: 'book_id',
      key: 'book_id',
    },
    {
      title: 'Item no.',
      dataIndex: 'item_no',
      key: 'item_no'
    },
    {
      title: 'Access no.',
      dataIndex: 'access_no',
      key: 'access_no',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author_name',
      key: 'author_name',
    },
    {
      title: 'Category',
      dataIndex: 'genre',
      key: 'genre',
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
    },
    {
      title: 'Total Copies',
      dataIndex: 'quantity',
      key: 'quantity',
    },
  ]

  const customStyles = {
    headCells: {
      style: {
        fontWeight: 'bold',
        fontSize: '1rem',
      },
    },
  };

  const handleSearch = () => {

    const searchWord = filterText.toLowerCase()
    const genre = category.toLowerCase()

    if (searchWord) {
      if (category === '') {
        setFilteredData(
          bookList.filter((book) => (
            book.title.toLowerCase().includes(searchWord) ||
            book.author_name.toLowerCase().includes(searchWord)
          ))
        )
      }else if (category !== '') {
        setFilteredData(
          bookList.filter((book) => (
            book.title.toLowerCase().includes(searchWord) && book.genre.toLowerCase() == genre ||
            book.author_name.toLowerCase().includes(searchWord) && book.genre.toLowerCase() == genre
          ))
        )
      }
    }

    setIsShowTable(true)
  }   

  return (
    <div className={style.container}>
      <div className={style.sidebar}>
        <SidebarCatalogue 
          setSelectedBranch={setSelectedBranch} 
          setSelectedGenre={setSelectedGenre} 
          selectedGenre={selectedGenre}
        />
      </div>
      <div className={style.content}>
        <div className={style.searchBar}>
          <input type="text" placeholder='Enter search phrase...' onChange={(e) => setFilterText(e.target.value)}/>
          <button disabled={filterText === '' ? true : false} onClick={handleSearch}>Search <IoSearch/></button> 
        </div>
        <div className={style.tableDiv}>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: '#38b6ff7c', // Custom header background color
                cellFontSize: 14,
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
