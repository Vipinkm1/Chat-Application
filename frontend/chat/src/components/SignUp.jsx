import React from 'react'
import { useNavigate } from 'react-router-dom'



const SignUp = () => {

  const navigate = useNavigate()

  return (
    <div className='sign-up-container'>
      <div className='border-1'>
        <h1 className='text-center'> Sign Up</h1>
        <form className='form-container'>
          <div>
            <label>Full Name</label>
            <input className='input-width' type='text' placeholder='Enter full name' />
          </div>
          <div>
            <label>Username</label>
            <input className='input-width' type='text' placeholder='Enter user name' />
          </div>
          <div>
            <label>Password</label>
            <input className='input-width' type='text' placeholder='Enter passowrd' />
          </div>
          <div>
            <label>Confirm Password</label>
            <input className='input-width' type='text' placeholder='Enter confirm password' />
          </div>
        </form>
        <div className='btn-1'>
          <button type='submit' className='btn-width'>SignUp</button>
        </div>
      </div>
    </div>
  )
}

export default SignUp