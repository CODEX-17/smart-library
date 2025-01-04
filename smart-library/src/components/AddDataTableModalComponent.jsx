import React from 'react'
import style from './AddDataTableModalComponent.module.css'
import { IoMdClose } from "react-icons/io";
import { useForm } from 'react-hook-form';
import axios from 'axios';


const AddDataTableModalComponent = ({ currentTable, setisShowAddModal, notificationConfig }) => {

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const url = 'http://82.112.236.213:5001'

  const onSubmit = (data) => {
    if (currentTable === 'tableGenre') {
        axios.post(`${url}/genre/addGenre`, data)
        .then((res) => {
            const result = res.data
            setisShowAddModal(false)
            notificationConfig(result.message, true)
        })
        .catch(err => console.log(err))
    }else if (currentTable === 'tableBranch') {
        axios.post(`${url}/branch/addBranch`, data)
        .then((res) => {
            const result = res.data
            setisShowAddModal(false)
            notificationConfig(result.message, true)
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.head}>
            <h1>
                {
                    currentTable === 'tableGenre' && 'Add Genre' ||
                    currentTable === 'tableBranch' && 'Add Branch'
                }
            </h1>
            <IoMdClose size={25} cursor={'pointer'} onClick={() => setisShowAddModal(false)}/>
        </div>
        <div className={style.content}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='d-flex flex-column w-100'>
                    <label>
                    {
                        currentTable === 'tableGenre' && 'Genre name' ||
                        currentTable === 'tableBranch' && 'Branch name'
                    } <b>*</b></label>
                    {
                        currentTable === 'tableGenre' && 
                            <input 
                                type="text"
                                placeholder='ex. Horror'
                                {...register('genre_name', { required: 'Genre name is required.'})} 
                            />
                        || currentTable === 'tableBranch' && 
                            <input 
                                type="text"
                                placeholder='ex. Horror'
                                {...register('branch_name', { required: 'Branch name is required.'})} 
                            />
                    }
                    {errors.genre_name && <p>{errors.genre_name.message}</p>}
                    {errors.branch_name && <p>{errors.branch_name.message}</p>}
                </div>
                <div className='d-flex flex-column w-100 mt-4'>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default AddDataTableModalComponent
