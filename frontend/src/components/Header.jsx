import React from 'react'
import { FaSearch } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
export default function Header() {
    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <h1 className='font-bold text-sm sm:text-2xl flex flex-wrap'>
                    <span className='text-slate-500'>Estate</span>
                    <span className='text-slate-700'>Elite</span>
                </h1>
                <form className='bg-slate-100 p-3 rounded-lg flex justify-around items-center'>
                    <input type="text" placeholder='Search..' className='bg-transparent focus:outline-none w-24 sm:w-64' />
                    <FaSearch className='text-slate-500 text-xl'></FaSearch>
                </form>
                <ul className='flex gap-4 text-xl font-semibold text-slate-600'>
                    <NavLink to="/"> <li className='hidden md:inline-block hover:underline mb-2'>Home</li></NavLink>
                    <NavLink to="/about"> <li className='hidden md:inline-block hover:underline mb-2'>About</li></NavLink>
                    <NavLink to="/signin">
                        <li className='hover:underline mb-2 underline-offset'>Sign in</li></NavLink>


                </ul>

            </div>
        </header>
    )
}
