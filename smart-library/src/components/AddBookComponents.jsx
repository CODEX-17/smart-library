import React, { useEffect, useState } from 'react'
import style from './AddBookComponents.module.css'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { addBook } from '../services/bookServices';
import { bookGenres } from '../data/genreListData';

const AddBookComponents = ({ handleCloseForm, handleNoticationConfig, selectedBranch }) => {

const [branchList, setBranchList] = useState([])

const {
  register,
  handleSubmit,
  watch,
  setValue,
  formState: { errors },
} = useForm({
  defaultValues: {
    quantity: 0,
    call_no: 0,
    total_value: 0,
  }
});

useEffect(() => {

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
      const message = result.message
      handleNoticationConfig(message, true)
      handleCloseForm(false)
    }

  } catch (error) {
    console.log(error)
  }
}

const handleClose = () => {
  handleCloseForm(false)
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
              {...register('title', { required: 'Book title is required.'})}
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
                <input 
                  type='text'
                  placeholder='ex.Drama'
                  {...register('genre', { required: 'Genre is required.' })}
                />
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
              <input type="number" {...register('quantity')}/>
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
