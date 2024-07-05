import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getListingById } from '../apiEndpoint';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import Contact from './Contact';
function Listing() {

   const [listing,setListing]=useState(null) ;
   const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied,setCopied]=useState(false);
  const [contact, setContact] = useState(false);

   const params=useParams(); 
   console.log("params",params);
   const { currentUser } = useSelector((state) => state.user);

   const {listingId}=params; 
   useEffect(
    
    ()=>{
    setLoading(true);
    setError(false);
    axios.get(getListingById+ `?_id=${listingId}`)
    .then(
      (res)=>{
           setListing(res.data);
           setLoading(false);
           setError(false);
      }
    )
    .catch(
       (err)=>{
        console.log("Error fetching listing Details",err);
        setError(true);
        setLoading(false);
       }
    )
    },[listingId]
   )

  return (
    <main>
     {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}

{
    !loading&&!error&&listing?
        <div>
           <Swiper navigation>
            {
                listing.imageUrls.map(
                    (url)=>(
                     <SwiperSlide key={url}>
                                     <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>


                     </SwiperSlide>
                    )
                )
            }
            </Swiper> 
            <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col gap-6 p-3 my-7 max-w-4xl mx-auto'>
        
  <p className='text-3xl font-semibold my-4'>
    {listing.name} - $
    {listing.offer ? listing.discountedPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
    {listing.type === "rent" ? " /month" : null}
  </p>

        
           <p className='flex gap-2 items-center'>
            <FaMapMarkerAlt className='text-green-700 text-'>
            </FaMapMarkerAlt>
            <span className='text-slate-500 font-medium text-lg'>{listing.address}</span>
           </p>
          <div className='flex gap-3'>
           <button className='border bg-red-800 rounded-lg text-white px-[70px] py-3'>For
           {listing.type=="rent"?" Rent":' Sell'}  </button>
           {
            listing.offer?
            <button className='border bg-green-900 rounded-lg text-white px-[70px] py-3'> $ {(listing.regularPrice-listing.discountedPrice).toLocaleString('en-US')} Discount</button>
           :null 
        }
            

          </div>
          <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>
           <ul className='flex flex-wrap items-center gap-4'>
            <li className='text-green-800 flex gap-2'>
              <FaBed className='text-2xl'
              ></FaBed>
              <span className='text-base font-medium'>{listing.bedrooms} {listing.bedrooms>0?"Beds":"Bed"} </span>
            </li>
            <li className='text-green-800 flex gap-2 items-center'>
            <FaBath className='text-2xl'
              ></FaBath>
              <span className='text-base font-medium'>{listing.bathrooms} {listing.bathrooms>0?"Baths":"Bath"} </span>


            </li>
            <li className='text-green-800 flex gap-1 items-center'>
             <FaParking className='text-2xl'>

               

             </FaParking>
             <span className='text-base font-medium'>
                    {listing.parking?"Parking Spot":"No Parking"}
                </span>
            </li>
            <li className='text-green-800 text-lg flex gap-1'>
             
             <FaChair className='text-2xl'>
             
             </FaChair>
             <span className='text-base font-medium'>
                    {listing.furnished?"Furnished":"Not Furnished"}
                </span>

            </li>
            </ul> 

            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}


          </div>




        </div>
    :null
}
    </main>
  )
}

export default Listing

