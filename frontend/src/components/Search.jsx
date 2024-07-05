import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { filteredListings } from '../apiEndpoint';
import axios from 'axios';
import ListingItem from './ListingItem';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('all');
  const [parking, setParking] = useState(false);
  const [offer, setOffer] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);


  const handleTypeChange = (newType) => {
    setType(newType);
  };

  const set_Sort_Order = (value) => {
    const [sorted, ordered] = value.split('_');
    setSort(sorted);
    setOrder(ordered);
  };

  useEffect(() => {
    setShowMore(false);
    const urlParams = new URLSearchParams(location.search);
    setSearchTerm(urlParams.get('searchTerm') || '');
    setType(urlParams.get('type') || 'all');
    setOffer(urlParams.get('offer') === 'true');
    setParking(urlParams.get('parking') === 'true');
    setFurnished(urlParams.get('furnished') === 'true');
    setSort(urlParams.get('sort') || 'createdAt');
    setOrder(urlParams.get('order') || 'desc');

    setLoading(true);
    axios.get(filteredListings + `?${urlParams.toString()}`)
      .then((res) => {
        console.log("Filtered data", res.data);
        if (res.data.length>8){
          setShowMore(true);
        }
        else{
          setShowMore(false);
        }
        
        setListings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Filtered listings fetching error", err);
        setLoading(false);
        setShowMore(false);
        
      });
  }, [location.search]);

  const handleReadMore=()=>{
    
    const startIndex=listings.length;
    const urlParams=new URLSearchParams(window.location.search);
    urlParams.set('startIndex',startIndex);
    axios.get(
      filteredListings+`?${urlParams.toString()}`
    )
    .then(
      (res)=>{
        setListings([...listings,...res.data]);
        if (res.data.length<9){
          setShowMore(false)
        }
        else{
          setShowMore(true)
        }
      }
    )


  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', searchTerm);
    urlParams.set('type', type);
    urlParams.set('offer', offer);
    urlParams.set('parking', parking);
    urlParams.set('furnished', furnished);
    urlParams.set('sort', sort);
    urlParams.set('order', order);
    const queryUrl = urlParams.toString();
    navigate(`/search?${queryUrl}`);
  }

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='md:min-h-screen border-b-2 md:border-r-2 p-7'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex items-center gap-4'>
            <label className='whitespace-nowrap font-semibold text-xl'>Search Term:</label>
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='border p-4 w-full rounded-lg'
            />
          </div>
          <div className='flex items-center gap-3 flex-wrap'>
            <span className='text-xl font-semibold'>Type: </span>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={type === 'all'}
                onChange={() => handleTypeChange('all')}
                className='size-6 rounded-lg'
              />
              <label className='text-lg font-base'>Rent & Sale </label>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={type === 'rent'}
                onChange={() => handleTypeChange('rent')}
                className='size-6'
              />
              <label className='text-lg font-base'>Rent </label>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={type === 'sell'}
                onChange={() => handleTypeChange('sell')}
                className='size-6'
              />
              <label className='text-lg font-base'>Sale</label>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={offer}
                onChange={(e) => setOffer(e.target.checked)}
                className='size-6'
              />
              <label className='text-lg font-base'>Offer</label>
            </div>
          </div>
          <div className='flex items-center gap-3 flex-wrap'>
            <span className='text-xl font-semibold'>Amenities: </span>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={parking}
                onChange={(e) => setParking(e.target.checked)}
                className='size-6 rounded-lg'
              />
              <label className='text-lg font-base'>Parking</label>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={furnished}
                onChange={(e) => setFurnished(e.target.checked)}
                className='size-6'
              />
              <label className='text-lg font-base'>Furnished </label>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label htmlFor='' className='text-xl font-semibold'>Sort: </label>
            <select
              onChange={(e) => set_Sort_Order(e.target.value)}
              value={`${sort}_${order}`}
              name=''
              id=''
              className='border-2 rounded-lg p-4'
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to high</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button type='submit' className='p-3 bg-slate-800 text-white border rounded-lg'>
            Search
          </button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Listing results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 ? "No Listing found" : null}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}
          {!loading && listings && listings.map(
            (listing) => (
              <ListingItem key={listing._id} listing={listing} />
            )
          )}
          {
            showMore?
            <button type='button' onClick={handleReadMore} className='text-green-600 text-lg hover:opacity-85'> Show More ...</button>
            :null
          }
        </div>
      </div>
    </div>
  );
}

export default Search;
