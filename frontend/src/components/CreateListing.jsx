import { getStorage, ref, uploadBytesResumable,getDownloadURL } from 'firebase/storage';
import React, { useState } from 'react';
import { app } from '../firebase';


function CreateListing() {

   const [files,setFiles]=useState([]);
   const [imageUploadError,setImageUploadError]=useState(null);
   const [upload,setUpload]=useState(false);
   const handleFileUpload = (e) => {
    e.preventDefault();
    console.log(files);
    setUpload(true);

    if (files.length > 0 && files.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          console.log('Uploaded URLs:', urls);
          setUpload(false);
        })
        .catch((err) => {
          console.error('Error uploading images:', err);
          setImageUploadError('Error Uploading images');
          setUpload(true);
        });
    } else {
      setImageUploadError('You can upload upto 6 images per listing')  
      console.log('Please select between 1 to 6 files.');
      setUpload(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  return (
 <main className='p-3 max-w-5xl mx-auto'>
    <h2 className='my-7 font-bold text-4xl text-center'>Create a Listing</h2>
    <form  className='flex flex-col sm:flex-row gap-4'>
       <div className='flex flex-col gap-5 flex-1 '>
        <input type="text" placeholder='Name' className='border p-3 rounded-lg' />
        <textarea name="" id=""  className='border p-3 rounded-lg' placeholder='Description' ></textarea>
        <input type="text" placeholder='Address' className='border p-3 rounded-lg' />
        <div className='flex gap-4'>
            <div className='flex gap-2'> <input type="checkbox" className='w-6 h-6'  />
            <span className='text-lg'>Sell</span></div>
            <div className='flex gap-2'> <input type="checkbox" className='w-6 h-6'  />
            <span className='text-lg'>Rent</span></div>
            <div className='flex gap-2'> <input type="checkbox" className='w-6 h-6'  />
            <span className='text-lg'>Parking Spot</span></div>
            <div className='flex gap-2'> <input type="checkbox" className='w-6 h-6'  />
            <span className='text-lg'>Furnished</span></div>  

        </div>
       

        <div className='flex gap-2'> <input type="checkbox" className='w-6 h-6'  />
        <span className='text-lg'>Offer</span></div>  
        
        
        <div className='flex flex-wrap gap-8 items-center'>
        <div className='flex gap-2 items-center'> <input type="number" className='w-14 h-14 p-3 border border-gray-300 rounded-lg '  />
        <span className='text-lg'>beds</span></div>
        <div className='flex gap-2 items-center'> <input type="number" className='w-14 h-14 p-3 border rounded-lg'  />
        <span className='text-lg'>Baths</span></div>
        </div>
        <div className='flex items-center gap-3'>
            <input type="number" className='w-18 h-16 p-3 border rounded-lg' />
            <span className='text-lg'>Regular Price</span>
        </div>

        </div>  
        <div className='flex flex-col flex-1 gap-6'>
          <p className='font-semibold'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover (max 6)
            </span>

          </p>
          <div className='flex gap-3'>
           <input multiple type="file" name="" id="" className='border border-slate-300 p-5 rounded-lg' accept='image/*' onChange={(e)=>setFiles(e.target.files)} /> 
           <button  type='button' className='border border-green-600 rounded-lg text-green-600  px-6 py-3' onClick={handleFileUpload}>{upload?'UPLOADING...':'UPLOAD'}</button> 
          </div>
          <p  className='text-red-700'>{imageUploadError}</p>
          <button className='text-white bg-slate-700 p-4 rounded-lg'>
            CREATE LISTING
          </button>

          </div>
  

    </form>

</main>
  )
}

export default CreateListing;
