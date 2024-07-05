import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../assets/defaultHouseImage.jpg'; // Adjust the path as needed
import { MdLocationOn } from 'react-icons/md';

function ListingItem({ listing }) {
  const [imageUrl, setImageUrl] = useState(listing.imageUrls[0]);

  const handleImageError = () => {
    setImageUrl(defaultImage);
  };

  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] flex-grow flex-basis-[calc(33%-1rem)] mb-4'>
      <Link to={`/show-listing/${listing._id}`} className='flex gap-4 flex-col'>
        <img 
          src={imageUrl} 
          alt={listing.name} 
          onError={handleImageError} 
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
      </Link>
      <div className='flex flex-col p-3 gap-4'>
        <p className='text-base font-medium truncate'>{listing.name}</p>
        <div className='flex items-center gap-2'>
          <MdLocationOn className='text-green-700 text-lg' />
          <p className='text-slate-700 truncate'>{listing.address}</p>
        </div>
        <p className='line-clamp-2'>{listing.description}</p> 
        <p className='text-slate-500 font-medium text-lg'>
          {listing.offer ? listing.discountedPrice : listing.regularPrice}
          {listing.type === "rent" ? " /month" : null}
        </p>
        <div className='flex gap-2 font-semibold'>
          <span>
            {listing.bedrooms}
            {listing.bedrooms > 1 ? ' Beds' : ' Bed'}
          </span>
          <span>
            {listing.bathrooms}
            {listing.bathrooms > 1 ? ' Baths' : ' Bath'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ListingItem;
