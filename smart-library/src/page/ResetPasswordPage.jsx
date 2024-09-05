import React, {useState} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'

const ResetPasswordPage = () => {

const { token } = useParams(); 
const [password, setPassword] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5001/account/reset-password/${token}`, { password });
      alert('Password has been reset');
    } catch (error) {
      console.error('There was an error resetting the password!', error);
    }
};

  return (
    <div>
       <form onSubmit={handleSubmit}>
        <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your new password" 
            required 
        />
        <button type="submit">Reset Password</button>
        </form>
    </div>
  )
}

export default ResetPasswordPage
