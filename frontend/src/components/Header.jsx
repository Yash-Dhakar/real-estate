import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function Header() {
    const [searchTerm,setSearchTerm]=useState('');
    const {currentUser}=useSelector(state=>state.user);
    const navigate=useNavigate();
    
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        const urlParams=new URLSearchParams(window.location.search);
        urlParams.set('searchTerm',searchTerm);
        const searchQuery= urlParams.toString();
        console.log(searchQuery);
        navigate(`/search?${searchQuery}`)

    }

    useEffect(
        ()=>{
            const urlParams=new URLSearchParams(location.search);
            const searchTermFromUrl=urlParams.get('searchTerm');
            if (searchTermFromUrl){
                setSearchTerm(searchTermFromUrl);
            }


        },[location.search]
    )
    

    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-5'>
                <h1 className='font-bold text-sm sm:text-2xl flex flex-wrap hover:scale-105'>
                    <span className='text-slate-500 hover:text-slate-700'>Estate</span>
                    <span className='text-slate-700 hover:text-slate-500'>Elite</span>
                </h1>
                <form  onSubmit={handleSubmit} className='bg-slate-100 p-4 rounded-lg flex justify-around items-center'>
                    <input type="text" placeholder='Search..' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className='bg-transparent focus:outline-none w-24 sm:w-64' />
                    <button>
                    <FaSearch className='text-slate-500 text-xl'></FaSearch>
                    </button>
                    
                </form>
                <ul className='flex gap-5 text-xl font-semibold text-slate-600'>
                    <NavLink to="/"> <li className='hidden md:inline-block hover:underline mb-2'>Home</li></NavLink>
                    <NavLink to="/about"> <li className='hidden md:inline-block hover:underline mb-2'>About</li></NavLink>
                    
                    {currentUser?                    <NavLink to='/profile' className='hover:scale-105'>
                   <img
                className='rounded-full h-8 w-8 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
          </NavLink>:
                      <NavLink to='/signin'>
                      <li className=' text-slate-700 hover:underline'> Sign in</li>
                
                  </NavLink>}






                </ul>

            </div>
        </header>
    )
}
