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
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/show-listing/${listing._id}`}>
        <img 
          src={imageUrl} 
          alt={listing.name} 
          onError={handleImageError} 
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2 w-full'>
        <p className='truncate text-lg font-semibold text-slate-700'>{listing.name}</p>
        <div className='flex items-center gap-1'>
          <MdLocationOn className='h-4 w-4 text-green-700' />
          <p className='text-sm text-gray-600 truncate w-full'>{listing.address}</p>
        </div>
        <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p> 
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
