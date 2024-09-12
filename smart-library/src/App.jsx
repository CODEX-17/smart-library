import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './page/loginPage';
import './App.css'
import StudentHomePage from './page/StudentHomePage';
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
          <Route path="/searchBook" element={<StudentHomePage/>}/>
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
