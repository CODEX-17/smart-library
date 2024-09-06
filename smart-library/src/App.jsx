import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './page/loginPage';
import './App.css'
import SearchBookPage from './page/SearchBookPage';
import RegistrationPage from './page/RegistrationPage';
import AdminPage from './page/AdminPage';
import CreateAccount from './page/CreateAccount';
import ForgetPasswordPage from './page/ForgetPasswordPage';
import ResetPasswordPage from './page/ResetPasswordPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/*" element={<AdminPage/>} />
          <Route path="/searchBook" element={<SearchBookPage/>}/>
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
