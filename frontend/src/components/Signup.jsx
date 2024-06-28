import React from 'react'
import { Link } from 'react-router-dom';
function Signup() {
  return (
    <div className='flex flex-col max-w-lg mx-auto'>
      <h2 className='text-4xl font-semibold text-center my-8'>Signup</h2>
      <form className='flex flex-col space-y-5' >
        <input type="text" placeholder='Username' className='border rounded-lg p-3' />
        <input type="email" placeholder='Email' className='border rounded-lg p-3' />
        <input type="password" placeholder='Password' className='border rounded-lg p-3' />
      </form>
      <button block className='bg-slate-700 text-white p-3 rounded-lg my-5'>
          SIGNUP
        </button>
      <div className='flex space-x-2'>
        <p>Have an account?</p>
        <Link to="/signin" className='text-blue-600'>Sign in</Link>
      </div>

      
    </div>
  )
}

export default Signup;
