import './SignIn.css'

function SignIn() {
  return (
    <>
      <div className='sign-in-page-container'>
        <h1>Sign In</h1>
        <input type='email' placeholder='Email'></input>
        <input type='password' placeholder='Password'></input>
      </div>
    </>
  )
}

export default SignIn