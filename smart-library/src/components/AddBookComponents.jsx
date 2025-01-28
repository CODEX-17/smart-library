import React, { useEffect, useState } from 'react'
import style from './AddBookComponents.module.css'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { addBook, getBooks } from '../services/bookServices';
import { getBranch } from '../services/branchServices';
import { bookGenres } from '../data/genreListData';

const AddBookComponents = ({ handleCloseForm, handleNoticationConfig, selectedBranch }) => {

const [branchList, setBranchList] = useState([])
const [bookList, setBookList] = useState([])
const userDetails = JSON.parse(localStorage.getItem('user'))


const {
  register,
  handleSubmit,
  watch,
  setValue,
  formState: { errors },
} = useForm({
  defaultValues: {
    quantity: 1,
    call_no: 0,
    total_value: 0,
  }
})

const title = watch('title')

useEffect(() => {

  const fetchData = async () => {
    try {
      
      const [ branch, books ] = await Promise.all([ getBranch(), getBooks() ]) 

      if (branch) {
        setBranchList(branch)
      }

      if (books) {
        const updated = books.filter( books => books.branch === userDetails?.branch)
        console.log(updated)
        setBookList(updated)
      }


    } catch (error) {
      console.log(error)
    }
  }

  fetchData()

  axios.get('http://localhost:5001/branch/getBranch')
  .then((res) => {setBranchList(res.data)})
  .catch((err) => console.log(err))

},[])

const onSubmit = async (data)  => {
  let updated = data
  updated.branch = selectedBranch

  try {
    const result = await addBook(updated)
    if (result) {
      handleNoticationConfig('Successfully added book.', true)
      handleCloseForm(false)
    }

  } catch (error) {
    console.log(error)
  }
}

const handleClose = () => {
  handleCloseForm(false)
}

const handleCheckBookTitle = () => {
  if (title) {
    if (bookList.some( books => books.title === title)) {
      return 'Book title is already exist.'
    }
  }
}

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className='d-flex w-100'>
          <h1>Add Book</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='d-flex w-100 gap-2 mb-2'>
            <div className='d-flex flex-column w-100'>
              <label>Item number(optional)</label>
              <input 
                type="number" 
                placeholder='ex. 0000'
                {...register('item_no')}
              />
            </div>
            <div className='d-flex flex-column w-100'>
              <label>Accession number <b>*</b></label>
              <input 
                type="text" 
                placeholder='ex. 801111 pl' 
                {...register('access_no', { required: 'Accession number is required.' })}
              />
              {errors.access_no && <p>{errors.access_no.message}</p>}
            </div>
          </div>
          
          <div className='d-flex flex-column w-100 mb-2'>
            <label>Book title <b>*</b></label>
            <input 
              type="text" 
              placeholder='Alamat ng saging' 
              {...register('title', { 
                required: 'Book title is required.',
                validate: handleCheckBookTitle,
              })}
            />
            {errors.title && <p>{errors.title.message}</p>}
          </div>

          <div className='d-flex flex-column w-100 mb-2'>
            <label>Author name <b>*</b></label>
            <input 
              type="text" 
              placeholder='Juan Dela Cruz'
              {...register('author_name', { required: 'Author name is required.' })}
            />
            {errors.author && <p>{errors.author.message}</p>}
          </div>

          <div className='d-flex gap-2 w-100 mb-2'>
            
            <div className='d-flex flex-column w-100'>
                <label>Genre <b>*</b></label>
                <select 
                {...register('genre', { required: 'Genre is required.' })}
                >
                  <option value="">Select Genre</option>
                  {
                    bookGenres.map(genre => (
                      <option value={genre}>{genre}</option>
                    ))
                  }
                </select>
                {errors.genre && <p>{errors.genre.message}</p>}
            </div>
   
            <div className='d-flex flex-column w-100 mb-2'>
              <label>ISBN <b>*</b></label>
              <input 
                type="text" 
                placeholder='ex.978 971 508 3393'
                {...register('ISBN', { required: 'Author name is required.' })}
              />
              {errors.ISBN && <p>{errors.ISBN.message}</p>}
            </div>
          </div>

          <div className='d-flex w-100 gap-2 mb-2'>
            <div className='d-flex flex-column w-100'>
              <label>Amount <p id={style.optional}>(optional)</p></label>
              <input
                type="number"
                {...register('amount')}
              />
              {errors.amount && <p>{errors.amount.message}</p>}
            </div>
            
            <div className='d-flex flex-column w-100'>
              <label>Quantity <p id={style.optional}>(optional)</p></label>
              <input type="number" {...register('quantity', { required: 'Quantity is required.' })}/>
            </div>
          </div>
          <div className='d-flex w-100 gap-2 mb-2'>
            <div className='d-flex flex-column w-100'>
              <label>Date Acquired <p id={style.optional}>(optional)</p></label>
              <input type="date" {...register('date_acquired')}/>
            </div>
            <div className='d-flex flex-column w-100'>
              <label>Publication <p id={style.optional}>(optional)</p></label>
              <input type="date" {...register('publication')}/>
            </div>
          </div>

          <div className={style.botMenu}>
              <button type='submit'>Submit</button>
              <button style={{
                  width: '30%',
                  backgroundColor: '#B8001F'
              }} onClick={handleClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBookComponents
