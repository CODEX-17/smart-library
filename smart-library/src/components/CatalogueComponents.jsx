import React, { useState, useEffect } from 'react'
import style from './CatalogueComponents.module.css'
import { IoSearch } from "react-icons/io5";
import DataTable from 'react-data-table-component';
import axios from 'axios';

const CatalogueComponents = () => {

  const [genreList, setGenreList] = useState([])
  const [bookList, setBookList] = useState([])
  const [enableBtn, setEnableBtn] = useState(false)
  const [isShowTable, setIsShowTable] = useState(false)
  useEffect(() => {
  
    axios.get('http://localhost:5001/genre/getGenre')
    .then((res) => {setGenreList(res.data)})
    .catch((err) => console.log(err))

    axios.get('http://localhost:5001/book/getBooks')
    .then((res) => {setBookList(res.data)})
    .catch((err) => console.log(err))
  
  },[])

  

  const [filterText, setFilterText] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {

    if (filterText !== '' && category !== '') {
      setEnableBtn(true)
    }else {
      setEnableBtn(false)
      setIsShowTable(false)
    }

  },[filterText, category])
  
  // Filter the data based on the search query
  const [filteredData, setFilteredData] = useState([])

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
  ]

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

  const handleSearch = () => {
    setFilteredData(
      bookList.filter(item => 
        (
          item.book_id && item.genre && item.genre.toLowerCase().includes(category.toLowerCase()) && item.book_id === filterText 
        ) || 
        (
          item.title && item.genre && item.genre.toLowerCase().includes(category.toLowerCase()) && item.title.toLowerCase().includes(filterText.toLowerCase())
        ) ||
        (
          item.author_name && item.genre && item.genre.toLowerCase().includes(category.toLowerCase()) && item.author_name.toLowerCase().includes(filterText.toLowerCase())
        ) ||
        (
          item.publication && item.genre && item.genre.toLowerCase().includes(category.toLowerCase()) && item.publication.toLowerCase().includes(filterText.toLowerCase())
        )
         
      )
    )
    setIsShowTable(true)
  }

  return (
    <div className={style.container}>
      <div className={style.searchBar}>
         <input type="text" placeholder='Enter search phrase...' onChange={(e) => setFilterText(e.target.value)}/>
         <button disabled={enableBtn ? false : true} onClick={handleSearch}>Search <IoSearch/></button> 
      </div>
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Categories</option>
        {
          genreList?.map((genre, index) => (
            <option value={genre.genre_name} key={index}>{genre.genre_name}</option>
          ))
        }
      </select>

      {
        isShowTable && 
        (
          <div className={style.tableDiv}>
            <DataTable 
              columns={column}
              data={filteredData}
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
        )
      }


     
     
    </div>
  )
}

export default CatalogueComponents
