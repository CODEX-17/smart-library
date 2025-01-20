import React from 'react'
import style from './ModalLoading.module.css'
import logoGif from '../assets/loading.gif'
import loadingStore from '../Store/loadingStore'

const ModalLoading = () => {
 
  const { loadingMessage } = loadingStore()
    
  return (
    <div className={style.container}>
        <div className={style.card}>
            <img src={logoGif} alt="animation" />
            <h3>{loadingMessage}</h3>
        </div>
    </div>
  )
}

export default ModalLoading
