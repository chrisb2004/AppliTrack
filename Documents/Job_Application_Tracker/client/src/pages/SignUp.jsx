import { useState } from 'react';
import './SignUp.css'
import { GoogleLogin } from '@react-oauth/google';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

function SignUp() {
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <div className='sign-in-page-container'>
        <h1>Sign Up</h1>
        <input type='text' placeholder='Name' />
        <input type='text' placeholder='Last Name' />
        <input type='email' placeholder='Email' />
        
        <div className='password-wrapper'>
          <input type={showCreatePassword ? 'text' : 'password'} placeholder='Create password' />
          <button onClick={() => setShowCreatePassword(!showCreatePassword)}>
            {showCreatePassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
        </div>

        <div className='password-wrapper'>
          <input type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm password' />
          <button onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
        </div>

        <button className='sign-in-button'>Sign Up</button>

        <p>Already have an account? <Link to="/login">Login</Link></p>

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

export default SignUp