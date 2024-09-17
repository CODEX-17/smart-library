import React, { useEffect, useState } from 'react'
import style from './AddBookComponents.module.css'
import axios from 'axios'


const AddBookComponents = () => {

const [branchList, setBranchList] = useState([])
const [genreList, setGenreList] = useState([])
const [isToast, setIsToast] = useState(false)

const [bookName, setBookName] = useState('')
const [author, setAuthor] = useState('')
const [publication, setPublication] = useState('')
const [genre, setGenre] = useState('')
const [branch, setBranch] = useState('')
const [totalCopies, setTotalCopies] = useState(0)

useEffect(() => {

  axios.get('http://localhost:5001/branch/getBranch')
  .then((res) => {setBranchList(res.data)})
  .catch((err) => console.log(err))

  axios.get('http://localhost:5001/genre/getGenre')
  .then((res) => {setGenreList(res.data)})
  .catch((err) => console.log(err))

},[])

const handleClear = () => {
  setBookName('')
  setAuthor('')
  setBranch('')
  setGenre('')
  setPublication('')
}

const handleSubmit = (e) => {
  e.preventDefault()
  const data = {
    title: bookName,
    author_name: author,
    publication,
    genre,
    branch,
    total_copies: totalCopies
  }

  axios.post('http://localhost:5001/book/addBook', data)
  .then((res) =>{
    const result = res.data
    const message = result.message

    console.log(message)
    setIsToast(true)
    handleClear()

    setTimeout(() => {
      setIsToast(false)
    }, 5000);

  })
  .catch((err) => console.log(err))
}




  return (
    <div className={style.container}>
      {       
          isToast && (
            <div className={style.toast}>
              Successfully add book.
            </div>
          )
        }
      <h1>Add Book</h1>
      <div className={style.content}>
        <form action="" onSubmit={handleSubmit}>
            <p>Book Name</p>
            <input type="text" value={bookName} required onChange={(e) => setBookName(e.target.value)}/>
            <p>Author</p>
            <input type="text" value={author} required onChange={(e) => setAuthor(e.target.value)}/>
            <p>Book Publication</p>
            <input type="text" value={publication} required onChange={(e) => setPublication(e.target.value)}/>
            <p>Number of copies</p>
            <input type="number" value={totalCopies} required onChange={(e) => setTotalCopies(e.target.value)}/>
            <p>Genre</p>
            <select id={style.select} value={genre} class="form-select" style={
                {
                    border: '2px solid #38b6ff',
                    color: '#38b6ff'
                }
            } required onChange={(e) => setGenre(e.target.value)}>
              <option value="">Select genre</option>
              {
                genreList.map((genre, index) => (
                  <option value={genre.genre_name} key={index}>{genre.genre_name}</option>
                )) 
              }
                
            </select>
            <p className='mt-2'>Branch</p>
            <select id={style.select} value={branch} class="form-select" style={
                {
                    border: '2px solid #38b6ff',
                    color: '#38b6ff'
                }
            } required onChange={(e) => setBranch(e.target.value)}>
              <option value="">Select branch</option>
              {
                branchList.map((branch, index) => (
                  <option value={branch.branch_name} key={index}>{branch.branch_name}</option>
                )) 
              }
                
            </select>
            <div className={style.botMenu}>
                <button type='submit'>Add Book</button>
                <button style={{
                    width: '20%',
                    backgroundColor: '#ffa600'
                }} onClick={handleClear}>Clear</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default AddBookComponents
