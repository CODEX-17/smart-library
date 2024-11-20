import React, { useEffect } from 'react'
import style from './TableEditModalComponents.module.css'
import { useForm } from 'react-hook-form'
import { IoMdClose } from "react-icons/io";
import axios from 'axios';

const TableEditModalComponents = ({ currentTable, selectedData, setIssShowEditModal }) => {

    const url = 'http://localhost:5001'

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            id: selectedData?.id,
            genre_name: selectedData?.genre_name,
            branch_name: selectedData?.branch_name,
            message: selectedData?.message,
            date: selectedData?.date,
            time: selectedData?.time,
        }
    })

  const onSubmit = (data) => {
    console.log(data)

    if (currentTable === 'tableBranch') {
        axios.post()
    }else if (currentTable === 'tableGenre') {
        
    }else if (currentTable === 'tableFeedback') {
        
    }
  }

    return (
    <div className={style.container}>
        <div className={style.card}>
            <div className='d-flex w-100 align-items-center justify-content-between mb-4'>
                <h2>{currentTable}</h2>
                <IoMdClose size={25} color='#38b6ff' cursor={'pointer'} onClick={() => setIssShowEditModal(false)}/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='d-flex flex-column w-100 mb-2'>
                    <label>ID</label>
                    <input 
                        type="number"
                        disabled={true}
                        {...register('id')} 
                    />
                </div>
                {
                    currentTable === 'ta'
                }
                <div className='d-flex flex-column w-100 mb-2'>
                    <label>
                    {
                        currentTable === 'tableBranch' && 'Branch name' ||
                        currentTable === 'tableGenre' && 'Genre name' ||
                        currentTable === 'tableFeedback' && 'Message'
                    }
                    </label>
                    {
                        currentTable === 'tableBranch' && 
                        <input 
                            type="text"
                            {...register('branch_name', { required: 'Branch name is required.' })} 
                        /> ||
                        currentTable === 'tableGenre' && 
                        <input 
                            type="text"
                            {...register('genre_name', { required: 'Genre name is required.' })} 
                        /> ||
                        currentTable === 'tableFeedback' && 
                        <input 
                            type="text"
                            {...register('message', { required: 'Message name is required.' })} 
                        /> 
                    }
                    {
                        errors.genre_name && <p>{errors.genre_name.message}</p> ||
                        errors.branch_name && <p>{errors.branch_name.message}</p> ||
                        errors.message && <p>{errors.message.message}</p>
                    }
                </div>
                {
                    currentTable === 'tableFeedback' &&
                    <div className='d-flex w-100 gap-2'>
                        <div className='d-flex flex-column w-100 mb-2'>
                            <label>Date</label>
                            <input 
                                type="date"
                                {...register('date', { required: 'Date is required.'})}
                            />
                        </div>
                        <div className='d-flex flex-column w-100 mb-2'>
                            <label>Time</label>
                            <input 
                                type='time'
                                {...register('time', { required: 'Time is required.'})}
                            />
                        </div>
                    </div>
                }
                
                <div className='d-flex w-100 mt-4'>
                    <button type='submit'>Update</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default TableEditModalComponents
