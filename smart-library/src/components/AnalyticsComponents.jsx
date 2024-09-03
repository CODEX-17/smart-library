import React from 'react'
import style from './AnalyticsComponents.module.css'
import { MdOutlineMenuBook } from "react-icons/md";
import { RiUser3Fill } from "react-icons/ri";
import { MdAssignmentReturn } from "react-icons/md";
import { MdAssignmentReturned } from "react-icons/md";

const AnalyticsComponents = () => {
  return (
    <div className={style.container}>
      <div className={style.cardAnalyticsBar}>
        <div className={style.card} style={{ backgroundColor: '#387F39' }}>
            <div className={style.cardHead}>
                <h1>90</h1>
                <MdOutlineMenuBook size={50}/>
            </div>
            <p>Total number of books</p>
        </div>
        <div className={style.card} style={{ backgroundColor: '#FFB200' }}>
            <div className={style.cardHead}>
                <h1>90</h1>
                <RiUser3Fill size={50}/>
            </div>
            <p>Total number of books</p>
        </div>
        <div className={style.card} style={{ backgroundColor: '#2E236C' }}>
            <div className={style.cardHead}>
                <h1>90</h1>
                <MdAssignmentReturn size={50}/>
            </div>
            <p>Total number of books</p>
        </div>
        <div className={style.card} style={{ backgroundColor: '#B60071' }}>
            <div className={style.cardHead}>
                <h1>90</h1>
                <MdAssignmentReturned size={50}/>
            </div>
            <p>Total number of books</p>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsComponents
