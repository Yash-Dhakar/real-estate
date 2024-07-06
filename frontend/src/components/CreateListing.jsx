import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import React, { useState } from 'react';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { createListing } from '../apiEndpoint';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateListing() {
  const {currentUser}=useSelector(state=>state.user) ; 
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('sell');
  const [parking, setParking] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [offer, setOffer] = useState(false);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [regularPrice, setRegularPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [imageUrls, setImageURL] = useState([]);
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const [uploading, setUploading] = useState(false);

  const navigate=useNavigate();

  const handleFileUpload = (e) => {
    e.preventDefault();
    console.log(files);
    setUploading(true);
    setImageUploadError(null);

    if (files && files.length > 0 && files.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
            setImageURL(urls);
          console.log('Uploaded URLs:', urls);
          setUploading(false);
          setImageUploadError(null);
        })
        .catch((err) => {
          console.error('Error uploading images:', err);
          setImageUploadError('Image upload failed (2 MB max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can upload up to 6 images per listing');
      console.log('Please select between 1 to 6 files.');
      // setFiles(null);
      setUploading(false);
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

  const handleCheckboxChange = (value) => {
    setType(value);
    console.log(type);
  };
  const discountPriceChecker=(e)=>{
    const intDiscount=parseInt(e.target.value);
    setDiscountedPrice(intDiscount);
    if (discountedPrice>regularPrice){
     setDiscountedPrice(regularPrice);


    }
    

  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    if (imageUrls.length<1){
        return setError('You must upload at least 1 image')
    } 
    if (+regularPrice < +discountedPrice){
        return setError('Discount price must be lower than regular price');
    }
    setLoading(true);
    setError(false);
    const listingDetails={
        userRef:currentUser._id,
        name:name,
        description:description,
        address:address,
        type:type,
        parking:parking,
        furnished:furnished,
        offer:offer,
        bedrooms:bedrooms,
        bathrooms:bathrooms,
        regularPrice:regularPrice,
        discountedPrice:regularPrice>discountedPrice?discountedPrice:regularPrice,
        imageUrls:imageUrls
    }
    console.log(listingDetails);
    axios.post(createListing,listingDetails)
    .then(
        (res)=>{
            console.log(res.data);
            setLoading(false);
            const listingId=res.data._id;
            navigate(`/show-listing/${listingId}`);

        }
    )
  .catch(
    (err)=>{
        setError(error.message);

        setLoading(false);
        return 
    }
  )
       

 
  }

  return (
    <main className='p-3 max-w-5xl mx-auto'>
      <h2 className='my-7 font-bold text-4xl text-center'>Create a Listing</h2>
      <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-5 flex-1'>
          <input type="text" placeholder='Name' className='border p-3 rounded-lg' value={name} onChange={(e) => setName(e.target.value)} />
          <textarea className='border p-3 rounded-lg' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          <input type="text" placeholder='Address' className='border p-3 rounded-lg' value={address} onChange={(e) => setAddress(e.target.value)} />
          <div className='flex gap-4 flex-wrap'>
            <div className='flex gap-2'>
              <input type="checkbox" className='w-6 h-6' checked={type === 'sell'} onChange={() => handleCheckboxChange('sell')} />
              <span className='text-lg'>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" className='w-6 h-6' checked={type === 'rent'} onChange={() => handleCheckboxChange('rent')} />
              <span className='text-lg'>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" className='w-6 h-6' checked={parking} onChange={() => setParking(!parking)} />
              <span className='text-lg'>Parking Spot</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" className='w-6 h-6' checked={furnished} onChange={() => setFurnished(!furnished)} />
              <span className='text-lg'>Furnished</span>
            </div>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" className='w-6 h-6'  onChange={(e) => setOffer(e.target.checked)} checked={offer} />
            <span className='text-lg'>Offer</span>
          </div>
          <div className='flex flex-wrap gap-8 items-center'>
            <div className='flex gap-2 items-center'>
              <input type="number" min={0} className='w-14 h-14 p-3 border border-gray-300 rounded-lg' value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
              <span className='text-lg'>beds</span>
            </div>
            <div className='flex gap-2 items-center'>
              <input type="number" className='w-14 h-14 p-3 border rounded-lg' value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
              <span className='text-lg' min={0}>Baths</span>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <input type="number" className='w-18 h-16 p-3 border rounded-lg' value={regularPrice} onChange={(e) => setRegularPrice(parseInt(e.target.value))} />
            <span className='text-lg'>Regular Price</span>
          </div>
          {offer ? (
            <div className='flex items-center gap-3'>
              <input type="number" max={regularPrice} className='w-18 h-16 p-3 border rounded-lg' value={discountedPrice} onChange={discountPriceChecker} />
              <span className='text-lg'>Discounted Price</span>
            </div>
          ) : null}
          {
            discountedPrice>regularPrice? <p className='text-red-700'>Discounted Price must be less than the regular price</p>
            :null
          }

        </div>
        <div className='flex flex-col flex-1 gap-6'>
          <p className='font-semibold'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className='flex gap-3'>
            <input multiple type="file"   key={files}  className='border border-slate-300 p-5 rounded-lg' accept='image/*' onChange={(e) => setFiles(e.target.files)} />
            <button type='button' className='border border-green-600 rounded-lg text-green-600 px-6 py-3' onClick={handleFileUpload}>{uploading ? 'UPLOADING...' : 'UPLOAD'}</button>
          </div>
          <p className='text-red-700 text-sm'>
            {imageUploadError}
          </p>

          <button type='button' disabled={loading || uploading}    className='text-white bg-slate-700 p-4 rounded-lg disabled:bg-slate-300' onClick={handleSubmit}>
          {loading ? 'Creating...' : 'Create listing'}

          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
