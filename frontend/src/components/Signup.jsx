import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { signup } from '../apiEndpoint';
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QAuth from './QAuth';

function Signup() {
  const navigate=useNavigate();
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [loading,setLoading]=useState(false);
  const [error, setError] = useState(null);

  let userDetails={
    "username":name,
    "email":email,
    "password":password
  }


  const handleSubmit=(e)=>{
    setLoading(true);
    e.preventDefault();
    axios.post(signup,userDetails)
    .then(
      ()=>{
        setName("");
        setEmail("");
        setPassword("");
        setLoading(false);
        setError(null);
        navigate('/signin');
        toast.success('Signp Done Successfully', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          });
          
      }
      

      
    )
    .catch(
      (err)=>{
        setLoading(false);
        setError(err);
       
        toast.error('Signup Failed', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          });
          

      }
    )

  }
  return (
    <div className='my-7 flex flex-col gap-5 max-w-lg mx-auto'>
      <h2 className='text-4xl font-semibold text-center'>Signup</h2>
      <form className='flex flex-col gap-4' >
        <input type="text" placeholder='Username' value={name} onChange={(e)=>setName(e.target.value)} className='border rounded-lg p-3' />
        <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} className='border rounded-lg p-3' />
        <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} className='border rounded-lg p-3' />
      </form>
      <button className='bg-slate-700 text-white p-3 rounded-lg' onClick={handleSubmit}>
          SIGNUP
        </button>
      <QAuth/>
      <div className='flex space-x-2'>
        <p> Aleady have an account?</p>
        <Link to="/signin" className='text-blue-600'>Sign in</Link>
      </div>
      <ToastContainer />

      
    </div>
  )
}

export default Signup;
