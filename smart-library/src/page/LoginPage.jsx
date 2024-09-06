import React, { useEffect, useState } from 'react'
import style from './LoginPage.module.css'
import bookLogo from '../assets/logo-white.png'
import { PiUserSwitchFill } from "react-icons/pi";
import LoadingComponents from '../components/LoadingComponents';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [enableButton, setEnableButton] = useState(true)
    const [loginType, setLoginType] = useState('admin')
    const [loadingState, setLoadingState] = useState(false)
    const [isShowErrorMessage, setisShowErrorMessage] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (email, password) {
            setEnableButton(false)
        }
    },[email, password])

    const handleChangeLoginType = () => {
        if (loginType === 'admin') {
            setLoginType('student')
        }else {
            setLoginType('admin')
        }
    }

    const handleLogin = async () => {
        console.log('click')
        try {
           const result = await axios.post('http://localhost:5001/account/checkAccount', {email, password})
           let userData = result.data
           const imageID = userData.imageID
           if (imageID !== 'default') {
                const fetchData = await axios.get('http://localhost:5001/image/getImageByImageID/' + imageID)
                const imageDetail = fetchData.data[0]
                userData.image = 'http://localhost:5001/' + imageDetail.filename
           }
           
           if (result && userData.acctype === loginType) {
                localStorage.setItem("user", JSON.stringify(userData))
                navigate('/admin')
           }else {
                setisShowErrorMessage(true)
                setTimeout(() => {
                    setisShowErrorMessage(false)
                }, 3000);
           }
        } catch (error) {
            console.log(error)
            setisShowErrorMessage(true)
            setTimeout(() => {
                setisShowErrorMessage(false)
            }, 3000);            
        }
        
        
    }

    return (
        <div className={style.container}>
                {
                    loadingState && (
                    <div className={style.loading}>
                        <LoadingComponents/>
                    </div>
                    )
                }

            <div className={style.content}>
                <div className={ loginType === 'admin' ? style.adminModal : style.studentModal}>
                    <h1>{loginType === 'admin' ? 'Admin Login' : 'Student Login'}</h1>
                    <input className={style.inputBox} type="email" placeholder='Enter email' onChange={(e) => setEmail(e.target.value)}/>
                    <input className={style.inputBox} type={isShowPassword ? "text" : "password"} placeholder='Enter password' onChange={(e) => setPassword(e.target.value)}/>
                    <div className='d-flex gap-2 mb-2'>
                        <input type="checkbox" value={false} onClick={() => setIsShowPassword(!isShowPassword)}/>
                        Show password
                    </div>
                    <button onClick={handleLogin} disabled={enableButton}>Login</button>
                    <p id={style.linkClick} onClick={() => {
                        navigate('forgetPassword')
                    }}>Forget password?</p>
                    {
                        isShowErrorMessage &&  <p style={{ color: 'red' }}>Account doesn't exist!</p>
                    }
                   
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