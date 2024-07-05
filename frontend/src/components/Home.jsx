import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { filteredListings } from '../apiEndpoint';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from './ListingItem';
function Home() {

  const [offerListings,setOfferListings]=useState([]);
  const [sellListings,setSellListings]=useState([]);
  const [rentListings,setRentListings]=useState([]);
  SwiperCore.use([Navigation]);

  useEffect(
    ()=>{
   
      axios.get(filteredListings+`?offer=true`)
      .then(
        (res)=>{
          setOfferListings(res.data);
          console.log("Offer Listings",offerListings);
          handleSellListings();
        }
      )
      .catch(
        (err)=>{
          console.log("Error fetching offerListings " ,err)
        }
      )
    },[]
  )
   const handleSellListings=()=>{
    axios.get(`${filteredListings}?type=sell`)
    .then(
      (res)=>{
        setSellListings(res.data);
        handleRentListings();

      }
    )
    .catch(
      (err)=>{
        console.log("Error fetching sell Listings " ,err)
      }
    )
   }

  const handleRentListings=()=>{
    axios.get(`${filteredListings}?type=rent`)
    .then(
      (res)=>{
        setRentListings(res.data);
        console.log(rentListings);

      }
    )
    .catch(
      (err)=>{
        console.log("Error fetching Rent Listings " ,err)
      }
    )
  } 
  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className=' text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-slate-400 text-sm md:text-lg my-4'>
          <p>Sahand Estate will help you find your home fast, easy and comfortable.
          </p>

          <p>
            Our expert support are always available.
          </p>

        </div>
        <Link to='/search' className='text-blue-700 font-semibold text-base md:text-lg hover:underline'>
        Let's Start now..
        </Link>
        <div>

        </div>
      </div>
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

     
      {/* listing results for offer, sale and rent */}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {sellListings && sellListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {sellListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
