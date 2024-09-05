import React, { useState } from 'react'
import style from './LoginPage.module.css'
import bookLogo from '../assets/logo-white.png'
import { PiUserSwitchFill } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [loginType, setLoginType] = useState('admin')
    const navigate = useNavigate()

    const handleChangeLoginType = () => {
        if (loginType === 'admin') {
            setLoginType('student')
        }else {
            setLoginType('admin')
        }
    }

    const handleLogin = () => {
        navigate('/registration')
    }

    return (
        <div className={style.container}>
            <div className={style.content}>
                <div className={ loginType === 'admin' ? style.adminModal : style.studentModal}>
                    <h1>{loginType === 'admin' ? 'Admin Login' : 'Student Login'}</h1>
                    <input className={style.inputBox} type="email" placeholder='Enter email' onChange={(e) => setEmail(e.target.value)}/>
                    <input className={style.inputBox} type={isShowPassword ? "text" : "password"} placeholder='Enter password' onChange={(e) => setPassword(e.target.value)}/>
                    <div className='d-flex gap-2 mb-2'>
                        <input type="checkbox" value={false} onClick={() => setIsShowPassword(!isShowPassword)}/>
                        Show password
                    </div>
                    <button onClick={handleLogin}>Login</button>
                    <p id={style.linkClick} onClick={() => {
                        navigate('forgetPassword')
                    }}>Forget password?</p>
                </div>
                <div className='d-flex gap-2'>
                    <PiUserSwitchFill size={25} color='#38b6ff'/>
                    <p id={style.linkClick} onClick={handleChangeLoginType}>{loginType === 'admin' ? 'Login as Student' : 'Login as Admin'}</p>
                </div>
                
            </div>
            <div className={style.footer}>
                <img id={style.bookLogo} src={bookLogo} alt="logo" />
                <div className='d-flex flex-column'>
                    <h1>SMART LIBRARY</h1>
                    <h2>OF CITY PUBLIC</h2>
                    <p>Book are great!</p>
                </div>
               
            </div>
           
        </div>
    );
};

export default LoginPage