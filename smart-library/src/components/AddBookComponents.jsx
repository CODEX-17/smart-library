import React from 'react'
import style from './AddBookComponents.module.css'

const AddBookComponents = () => {
  return (
    <div className={style.container}>
      <h1>Add Book</h1>
      <div className={style.content}>
        <form action="">
            <p>Book Name</p>
            <input type="text" />
            <p>Author</p>
            <input type="text" />
            <p>Book Publication</p>
            <input type="text" />
            <p>Genre</p>
            <select class="form-select" style={
                {
                    border: '2px solid #38b6ff',
                    color: '#38b6ff'
                }
            }>
                <option value="">Select Genre</option>
            </select>
            <div className={style.botMenu}>
                <button>Add Book</button>
                <button style={{
                    width: '20%',
                    backgroundColor: '#ffa600'
                }}>Clear</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default AddBookComponents
