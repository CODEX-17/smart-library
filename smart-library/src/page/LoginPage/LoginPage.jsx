import React, { useEffect, useState } from 'react'
import style from './LoginPage.module.css'
import bookLogo from '../../assets/logo-white.png'
import { PiUserSwitchFill } from "react-icons/pi";
import LoadingComponents from '../../components/LoadingComponents';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [enableButton, setEnableButton] = useState(true)
    const [loginType, setLoginType] = useState('admin')
    const [loadingState, setLoadingState] = useState(false)
    const [isShowErrorMessage, setisShowErrorMessage] = useState(false)
    const adminAccess = useParams()
    const navigate = useNavigate()

    useEffect(() => {

        if (email, password) {
            setEnableButton(false)
        }

        if (localStorage.getItem('user')) {
            const accountDetails = JSON.parse(localStorage.getItem('user'))
            if (accountDetails?.acctype === 'admin') {
                navigate('/admin')
            }else {
                navigate('/guestHomepage')
            }
        }
    },[email, password])

    const handleChangeLoginType = () => {
        if (loginType === 'admin') {
            setLoginType('guest')
        }else {
            setLoginType('admin')
        }
    }

    const handleLogin = async () => {
      
        try {
           const result = await axios.post('http://localhost:5001/account/checkAccount', {email, password})

           if (result) {
                let userData = result.data
                const imageID = userData.imageID

                if (imageID !== 'default') {
                        const fetchData = await axios.get('http://localhost:5001/image/getImageByImageID/' + imageID)
                        const imageDetail = fetchData.data[0]
                        userData.image = 'http://localhost:5001/' + imageDetail.filename
                }

                if (userData.acctype === loginType || userData.acctype === 'super' && loginType === 'admin') {
                    localStorage.setItem("user", JSON.stringify(userData))
                    if (loginType === 'admin' || userData.acctype === 'super') {
                        navigate('/admin')
                    }else {
                        navigate('/guestHomepage')
                    }
                    
                }else {
                    setisShowErrorMessage(true)
                    setTimeout(() => {
                        setisShowErrorMessage(false)
                    }, 3000);
                }
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
                    <h1>{loginType === 'admin' ? 'Admin Login' : 'Guest Login'}</h1>
                    <input className={style.inputBox} type="email" placeholder='Enter email' onChange={(e) => setEmail(e.target.value)}/>
                    <input className={style.inputBox} type={isShowPassword ? "text" : "password"} placeholder='Enter password' onChange={(e) => setPassword(e.target.value)}/>
                    <div className='d-flex gap-2 mb-2'>
                        <input type="checkbox" value={false} onClick={() => setIsShowPassword(!isShowPassword)}/>
                        Show password
                    </div>
                    <button onClick={handleLogin} disabled={enableButton}>Login</button>
                    <div className='d-flex gap-5'>
                         <p id={style.linkClick} onClick={() => {
                            navigate('/forgetPassword')
                        }}>Forget password?</p>
                        <p id={style.linkClick} onClick={() => {
                            navigate('/createAccount', { state: { type: 'guest' }})
                        }}>Create Account</p>
                    </div>
                   
                    {
                        isShowErrorMessage &&  <p style={{ color: 'red' }}>Account doesn't exist!</p>
                    }
                   
                </div>
                <div className='d-flex gap-2'>
                    <PiUserSwitchFill size={25} color='#38b6ff'/>
                    <p id={style.linkClick} onClick={handleChangeLoginType}>{loginType === 'admin' ? 'Login as Guest' : 'Login as Admin'}</p>
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