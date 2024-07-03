import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { update,deleteAPI,signOut,getListings } from "../apiEndpoint";
import { updateStart, updateSuccess, updateFailure, signInSuccess ,deleteStart,deleteFailure,deleteSuccess} from "../redux/userSlice";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const { currentUser } = useSelector((state) => state.user); 
  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [username, setUserName] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('');
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef();
  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
  }, [currentUser, navigate]);



  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = Date.now() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.log("error in uploading", error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setAvatar(downloadURL);
          })
          .catch((error) => {
            console.log("Error getting download URL", error);
          });
      }
    );
  };
  
  const deleteUser=(e)=>{

    dispatch(deleteStart());
    console.log(currentUser._id);
    console.log(currentUser);
    const data={_id:currentUser._id}
    axios.post(deleteAPI,data)
    .then(
        (res)=>{
            console.log(res.data);

            dispatch(deleteSuccess(res.data));
            navigate("/signin");

        }
    )
    .catch(
        (err)=>{
            console.log("Error",err);
            dispatch(deleteFailure(err));
            toast.error('Error Deleting Profile!', {
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
    

  }

  const handleSignOut = async () => {
    try {
      dispatch(deleteStart());
      const res = await fetch(signOut);
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteFailure(data.message));
        return;
      }
      dispatch(deleteSuccess(data));
      navigate("/signin");
    } catch (error) {
      dispatch(deleteFailure(data.message));
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      _id:currentUser._id,  
      username: username,
      email: email,
      avatar: avatar,
    };

    if (password) {
      userDetails.password = password;
    }

    dispatch(updateStart());
    axios.post(update, userDetails)
      .then((res) => {
        dispatch(signInSuccess(res.data));
        toast.success('Profile Updated Successfully', {
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
      })
      .catch((err) => {
        dispatch(updateFailure(err.message));
        toast.error('Error Updating Profile!', {
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
      });
  };

  const showListings=(e)=>{
    e.preventDefault();
    setShowListingsError(false);
    
    axios.get(getListings +`?userRef=${currentUser._id}`)
    .then(
      (res)=>{
        setUserListings(res.data);
      }
      
    )
    .catch(
      (err)=>{
       console.log("Error fecthing listings",err);
       setShowListingsError(true);
      }
    )
  }

  

  useEffect(() => {
    if (file) {
      if (file.size < (2 * 1024 * 1024)) {
        handleFileUpload(file);
      } else {
        setFileUploadError(true);
        setFile(null);
      }
    }
  }, [file]);

  return (
    <div className="flex flex-col max-w-lg mx-auto gap-6">
      <h2 className="text-4xl font-semibold text-center my-8">Profile</h2>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <input
          hidden
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileInputRef}
          accept="image/*"
        />
        <img
          onClick={() => fileInputRef.current.click()}
          src={avatar}
          className="rounded-full w-[104px] h-[104px] cover self-center"
          alt="Profile Picture"
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error in uploading Image (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>

        <input
          type="text"
          className="border rounded-lg p-4"
          placeholder="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          className="border rounded-lg p-4"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border rounded-lg p-4"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-slate-700 text-white p-4 rounded-lg font-medium">
          UPDATE
        </button>
      </form>
      <Link to='/create-listing' className="bg-green-700 text-white p-4 rounded-lg font-medium text-center">
        CREATE LISTING
      </Link>
      <div className="flex justify-between">
    
        <Link className="text-red-700 text-xl font-medium" onClick={deleteUser}>Delete Account</Link>
        <Link className="text-red-700 text-xl font-medium" onClick={handleSignOut} >Sign Out</Link>
      </div>
      <Link className="text-green-700 text-xl self-center" onClick={showListings} >SHOW LISTING</Link>

      <ToastContainer />
      <p>{showListingsError?'Error showing listings' : ''}</p>{
        userListings.length>0?
        userListings.map(
          (listing)=>(
           <div className="border border-lg shadow-md p-3 flex justify-between items-center gap-5">
           <Link> <img src={listing.imageUrls[0]} className='h-16 w-16 object-contain'alt="" /></Link>
          <Link className='text-slate-700 font-semibold  hover:underline truncate flex-1'><p >{listing.name}</p></Link>
          <div className="flex gap-2 flex-col md:flex-row">
            <button className="border px-4 py-2 rounded-2xl text-white bg-blue-500">Edit</button>
            <button className="border p-2 rounded-2xl text-black bg-red-600">Delete</button>
          </div>


           </div>
          )
        )
        :''
      }
      
    </div>
  );
}

export default Profile;
