import React, { useEffect, useState } from 'react'
import style from './AddCopyModal.module.css'
import { CgCloseO } from "react-icons/cg";
import { useForm } from 'react-hook-form';
import { updateBook } from '../../../../../services/bookServices';

const AddCopyModal = ({ selectedBook, setIsShowModalAddCopy, setToastMessage, setIsToast}) => {

   const { 
        handleSubmit, 
        reset, 
        register, 
        formState: {errors} 
    } = useForm({
        defaultValues: {
            quantity: selectedBook?.quantity
        }
    })

    const [currentBook, setCurrentBook] = useState(null)

    useEffect(() => {
        setCurrentBook(selectedBook)
    },[])

    const handleModifiedQuantity = async (data) => {

        try {

            let updatedData = currentBook
            updatedData.quantity = parseInt(data?.quantity)
          
            const result = await updateBook(updatedData)

            if (result) {
                setIsShowModalAddCopy(false)
                setToastMessage(result.message)
                setIsToast(true)

                setTimeout(() => {
                    setIsToast(false)
                }, 3000);
            }

        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className={style.container}>
        <form onSubmit={handleSubmit(handleModifiedQuantity)}>
            <div className={style.card}>
                <div className='d-flex w-100 flex-column position-relative'>
                    <CgCloseO 
                        cursor={'pointer'} 
                        title='closed'
                        size={20}
                        style={{ position: 'absolute', top: 0, right: 0 }}
                        onClick={() => setIsShowModalAddCopy(false)}
                    />
                    <h1>Modified Copies</h1>
                    <p><b>Book Title:</b> sample</p>
                </div>
                <input 
                    type="number" 
                    min="0"
                    {...register('quantity', { required: 'Quantity is required.' })}
                />
                {errors.quantity && <p style={{ color: 'red', fontSize: '.7rem' }}>{errors.quantity?.message}</p>}
                <button type='submit' className='mt-2'>Add</button>
            </div>
      </form>
    </div>
  )
}

export default AddCopyModal
