import React from 'react'


const Login = () => {
  return (
    <div className='sign-up-container'>
    <div className='border-1'>
      <h1 className='text-center'>Login</h1>
      <form className='form-container'>
        <div>
          <label>Full Name</label>
          <input className='input-width' type='text' placeholder='Enter full name' />
        </div>
        <div>
          <label>Username</label>
          <input className='input-width' type='text' placeholder='Enter user name' />
        </div>
      </form>
      <div className='btn-1'>
      <button type='submit' className='btn-width'>Login</button>
      </div>
    </div>
  </div>
  )
}

export default Login