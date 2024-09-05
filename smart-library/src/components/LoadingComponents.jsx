import React from 'react'
import style from './LoadingComponents.module.css'
import loadingAnim from '../assets/loading.gif'

const LoadingComponents = () => {
  return (
    <div className={style.container}>
      <div className={style.card}>
        <img src={loadingAnim} alt="animation" />
      </div>
    </div>
  )
}

export default LoadingComponents
