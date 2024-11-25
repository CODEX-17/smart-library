import React, { useEffect, useState } from 'react'
import style from './AddBookComponents.module.css'
import axios from 'axios'
import { useForm } from 'react-hook-form';

const AddBookComponents = ({ handleCloseForm, handleNoticationConfig, selectedBranch }) => {

const [branchList, setBranchList] = useState([])
const [genreList, setGenreList] = useState([])

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  defaultValues: {
    amount: 0,
    quantity: 0,
    call_no: 0,
    total_value: 0,
  }
});

useEffect(() => {

  axios.get('http://localhost:5001/branch/getBranch')
  .then((res) => {setBranchList(res.data)})
  .catch((err) => console.log(err))

  axios.get('http://localhost:5001/genre/getGenre')
  .then((res) => {setGenreList(res.data)})
  .catch((err) => console.log(err))

},[])

const onSubmit = (data) => {
  let updated = data
  updated.branch = selectedBranch

  axios.post('http://localhost:5001/book/addBook', updated)
  .then((res) =>{
    const result = res.data
    const message = result.message
    handleNoticationConfig(message, true)
    handleCloseForm(false)
  })
  .catch((err) => console.log(err))
}

const handleClose = () => {
  handleCloseForm(false)
}

  return (
    <div className={style.container}>
      <div className={style.content}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='d-flex w-100 gap-2 mb-2'>
            <div className='d-flex flex-column w-100'>
              <label>Item number <b>*</b></label>
              <input 
                type="number" 
                placeholder='ex. 0000'
                {...register('item_no', { 
                  required: 'Item number is required',
                  minLength: {
                    value: 4,
                    message: "Item number must be 4 digit only.",
                  },
                  maxLength: {
                    value: 4,
                    message: "Item number must be 4 digit.",
                  }
                })}
              />
              {errors.item_no && <p>{errors.item_no.message}</p>}
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
              {...register('author', { required: 'Author name is required.' })}
            />
            {errors.author && <p>{errors.author.message}</p>}
          </div>

          <div className='d-flex gap-2 w-100 mb-2'>
            <div className='d-flex flex-column w-100'>
              <label>Genre <b>*</b></label>
              <select 
                {...register('genre', { required: 'Genre is required.' })}
              >
                <option value="">Select genre</option>
                {
                  genreList.map((genre, index) => (
                    <option value={genre.genre_name} key={index}>{genre.genre_name}</option>
                  )) 
                }
              </select>
              {errors.genre && <p>{errors.genre.message}</p>}
            </div>
          </div>

          <div className='d-flex w-100 gap-2 mb-2'>
            <div className='d-flex flex-column w-100'>
              <label>Amount</label>
              <input
                type="number"
                {...register('amount')}
              />
              {errors.amount && <p>{errors.amount.message}</p>}
            </div>
            
            <div className='d-flex flex-column w-100'>
              <label>Quantity</label>
              <input type="number" {...register('quantity')}/>
            </div>
          </div>
          <div className='d-flex w-100 gap-2 mb-2'>
            <div className='d-flex flex-column w-100'>
              <label>Call number</label>
              <input 
                type="number" 
                {...register('call_no', {
                  pattern: {
                    value: /^09\d{9}$/,
                    message: "Contact number must start with 09 and be 11 digits",
                  },
                  minLength: {
                    value: 11,
                    message: "Contact number must be 11 digits",
                  },
                  maxLength: {
                    value: 11,
                    message: "Contact number must be 11 digits",
                  },
                }
                )}/>
                {errors.call_no && <p>{errors.call_no.message}</p>}
            </div>
            <div className='d-flex flex-column w-100'>
              <label>Total Value</label>
              <input type="number" {...register('total_value')}/>
            </div>
            <div className='d-flex flex-column w-100'>
              <label>Date Acquired</label>
              <input type="date" {...register('date_acquired')}/>
            </div>
          </div>

          <div className={style.botMenu}>
              <button type='submit'>Submit</button>
              <button style={{
                  width: '20%',
                  backgroundColor: '#B8001F'
              }} onClick={handleClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBookComponents
