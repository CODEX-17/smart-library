import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './page/loginPage';
import './App.css'
import SearchBookPage from './page/SearchBookPage';
import RegistrationPage from './page/RegistrationPage';
import AdminPage from './page/AdminPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/*" element={<LoginPage/>} />
          <Route path="/searchBook" element={<SearchBookPage/>}/>
          <Route path="/registration" element={<RegistrationPage/>}/>
          <Route path="/admin" element={<AdminPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
