import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './page/LoginPage/LoginPage';
import './App.css'
import GuestHomePage from './page/guestPage/GuestHomepage';
import RegistrationPage from './page/RegistrationPage';
import AdminPage from './page/adminPage/AdminPage';
import CreateAccount from './page/CreateAccount';
import ForgetPasswordPage from './page/ForgetPasswordPage';
import ResetPasswordPage from './page/ResetPasswordPage';
import { useEffect } from 'react';
import { checkSchedules } from './services/scheduleServices';

function App() {

  useEffect(() => {
    
    const sendRequest = async () => {
      try {
        const result = await checkSchedules()

        if (result) {
          console.log(result?.message)
          console.log(result?.obj)
        }

      } catch (error) {
        console.log(error)
      }
    }

    sendRequest()

   
  },[])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/*" element={<AdminPage/>} />
          <Route path="/guestHomepage" element={<GuestHomePage/>}/>
          <Route path="/registration" element={<RegistrationPage/>}/>
          <Route path="/admin" element={<AdminPage/>}/>
          <Route path="/createAccount" element={<CreateAccount/>}/>
          <Route path="/forgetPassword" element={<ForgetPasswordPage/>}/>
          <Route path="/reset-password/:token" element={<ResetPasswordPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
