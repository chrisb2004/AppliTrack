import { useState } from 'react';
import './Login.css'
import { GoogleLogin } from '@react-oauth/google';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <>
      <div className='login-page-container'>
        <h1>Login</h1>
        <input type='email' placeholder='Email' />
        
        <div className='password-wrapper'>
          <input type={showPassword ? 'text' : 'password'} placeholder='Create password' />
          <button onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
        </div>

        <button className='login-button'>Login</button>

        <p>Don't have an account? <Link to="/sign-up">Sign Up</Link></p>

        <div className='divider'><p>Or</p></div>

        <GoogleLogin
            onSuccess={(credentialResponse) => console.log(credentialResponse)}
            onError={() => console.log('Login Failed')}
            width="256"
        />
      </div>
    </>
  )
}

export default Login