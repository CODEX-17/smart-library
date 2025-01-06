import React, { useEffect, useState } from 'react'
import style from './TableEditModalComponents.module.css'
import { useForm } from 'react-hook-form'
import { IoMdClose } from "react-icons/io";
import axios from 'axios';

const TableEditModalComponents = ({ currentTable, selectedData, setIssShowEditModal, notificationConfig }) => {

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
        }
    })

  const onSubmit = (data) => {

    if (currentTable === 'tableBranch') {
        axios.post(`${url}/branch/updateBranch`, data)
        .then((res) => {
            const result = res.data
            setIssShowEditModal(false)
            notificationConfig(result.message, true)
        })
        .catch(err => console.log(err))
    }else if (currentTable === 'tableGenre') {
        axios.post(`${url}/genre/updateGenre`, data)
        .then((res) => {
            const result = res.data
            setIssShowEditModal(false)
            notificationConfig(result.message, true)
        })
        .catch(err => console.log(err))
    }
  }

    return (
    <div className={style.container}>
        <div className={style.card}>
            <div className='d-flex w-100 align-items-center justify-content-between mb-4'>
                <h2>
                {
                    currentTable === 'tableBranch' && 'Table Branch' ||
                    currentTable === 'tableGenre' && 'Table Genre'
                }
                </h2>
                <IoMdClose size={25} color='#38b6ff' cursor={'pointer'} onClick={() => setIssShowEditModal(false)}/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
                <div className='d-flex flex-column w-100 mb-2'>
                    <label>ID</label>
                    <input 
                        type="number"
                        disabled={true}
                        {...register('id')} 
                    />
                </div>
                <div className='d-flex flex-column w-100 mb-2'>
                    <label>
                    {
                        currentTable === 'tableBranch' && 'Branch name' ||
                        currentTable === 'tableGenre' && 'Genre name'
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
                        />
                    }
                    {
                        errors.genre_name && <p>{errors.genre_name.message}</p> ||
                        errors.branch_name && <p>{errors.branch_name.message}</p>
                    }
                </div>
                
                <div className='d-flex w-100 mt-4'>
                    <button type='submit'>Update</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default TableEditModalComponents
