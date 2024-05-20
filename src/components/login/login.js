import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import './login.css'
import AuthService from '../../services/authservice';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const authService = new AuthService;
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        try{
          const data = await authService.login(username, password);
          console.log('Authentication successful! Token:', data.token);
          if(data.role == 'ADMIN'){
            navigate("/admin");
          }
          
        }catch(error){
          console.error('Authentication failed: ', error.message);
          setError('Invalid login data');
          setTimeout(() => setError(null), 3000);
        }
      };


    return (
        <div className="login-container">
        <h2>Login page for Bug Ticket Application</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-input">
            <label htmlFor="username" className="login-label">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="login-input">
            <label htmlFor="password" className="login-label">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        {error && <Alert className='custom-alert' variant="filled" severity="error">Invalid Login Data</Alert>} 
      </div>
    )
}

export default Login;