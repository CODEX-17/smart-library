import React from 'react'
import style from './BranchModal.module.css'
import { RiCloseLargeLine } from "react-icons/ri";
import { useForm } from 'react-hook-form';
import { addBranch, updateBranch } from '../../../../../services/branchServices';

const BranchModal = ({ setIsShowModal, selectedData, notificationConfig }) => {

  const { 
    handleSubmit, 
    register, 
    formState: {errors} 
} = useForm({
    defaultValues: {
        id: selectedData?.id,
        branch_name: selectedData?.branch_name,
    }
}) 


const onSubmitData = async (data) => {

    const result = selectedData ? await updateBranch(data) : await addBranch(data)
   
    if (result) {
        notificationConfig(result.message, true)
    }

    setIsShowModal(false)
}

  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className='d-flex w-100 align-items-center justify-content-between'>
            <h3>{selectedData ? 'Edit Branch' : 'Add Branch'}</h3>
            <RiCloseLargeLine cursor={'pointer'} onClick={() => setIsShowModal(false)}/>
        </div>
        <hr />
        <div className='w-100 mt-2'>
            <form onSubmit={handleSubmit(onSubmitData)}>
                <div className='d-flex flex-column'>
                    <label>Branch Name</label>
                    <input 
                        type="text" 
                        placeholder='ex. Cavite City'
                        {...register('branch_name', {required: 'Branch Name is required.'})}
                    />
                    {errors.branch_name && <p style={{ color: 'red', fontSize: '.8rem',margin: 0 }}>{errors.branch_name?.message}</p>}
                </div>
                <button className='rounded mt-3' type='submit'>Submit</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default BranchModal
