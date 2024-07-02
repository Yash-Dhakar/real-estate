import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { google } from '../apiEndpoint';
import axios from 'axios';
import { signInSuccess } from '../redux/userSlice';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function QAuth() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    console.log(useSelector(state=>state.user));
   const handleGoogleClick=async (e)=>{
    e.preventDefault();
    try{
        const provider=new  GoogleAuthProvider();
        const auth= getAuth(app);
        const result=await signInWithPopup(auth,provider);
        console.log(result.user);
        console.log(result.user.email);
        console.log(result.user.displayName);
        console.log(result.user.photoURL);
        const userDetails={
            name:result.user.displayName,
            email:result.user.email,
            avatar:result.user.photoURL
        }
        axios.post(google,userDetails)
        .then(
            (res)=>{
                dispatch(signInSuccess(res.data))
                console.log(res.data);
                navigate("/");
            }
        )
        .catch(
            (err)=>{
                
                console.log(err.message);
            }
        )
        

    }
    catch(err){
        console.log(err);

    }

   
   } 
  return (
    
            <button className='bg-red-700 text-white p-3 rounded-lg block' onClick={handleGoogleClick}>
       CONTINUE WITH GOOGLE   
        </button>
  )
}

export default QAuth;
