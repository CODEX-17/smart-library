import React from 'react'
import style from './RegistrationPage.module.css'

const RegistrationPage = () => {
  return (
    <div className={style.container}>
      <div className='container p-5'>
        <h1>Registration</h1>
        <form action="">
            <div class="input-group mb-2">
                <span class="input-group-text">Library Card Number</span>
                <input class="form-control" aria-label="With textarea"></input>
            </div>
            <div class="input-group mb-2">
                <span class="input-group-text">Firstname</span>
                <input class="form-control" aria-label="With textarea"></input>
            </div>
            <div class="input-group mb-2">
                <span class="input-group-text">Middlename</span>
                <input class="form-control" aria-label="With textarea"></input>
            </div>
            <div class="input-group mb-2">
                <span class="input-group-text">Lastname</span>
                <input class="form-control" aria-label="With textarea"></input>
            </div>
            <div className='d-flex gap-2'>
                <div class="input-group mb-2">
                    <span class="input-group-text">Date of Birth</span>
                    <input type='date' class="form-control" aria-label="With textarea"></input>
                </div>
                <div class="input-group mb-2">
                    <span class="input-group-text">Gender</span>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Select gender</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                    </select>
                </div>
            </div>
            <div class="input-group mb-2">
                <span class="input-group-text">Street address</span>
                <input class="form-control" aria-label="With textarea"></input>
            </div>
            <div className='d-flex gap-2'>
                <div class="input-group mb-2">
                    <span class="input-group-text">Municipality/City</span>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Select gender</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                    </select>
                </div>
            </div>
            <div className='d-flex gap-2 mb-2'>
                <div class="input-group mb-2">
                    <span class="input-group-text">Email</span>
                    <input type='email' class="form-control" aria-label="With textarea"></input>
                </div>
                <div class="input-group mb-2">
                    <span class="input-group-text">Contact Number</span>
                    <input type='tel' class="form-control" pattern="[0-9]{10}" placeholder="Enter your phone number" required></input>
                </div>
            </div>
            <button>Submit</button>

        </form>

      </div>
    </div>
  )
}

export default RegistrationPage
