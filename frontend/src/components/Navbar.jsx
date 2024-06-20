import React from 'react'

const Navbar = () => {
  return (
    <div className='max-w-screen-2xl  mx-auto container bg-zinc-800 p-3 shadow-lg h-18'>
      <div className='flex justify-around'>
       <h1 className='text-white text-2xl font-bold'>Word <span className='text-sky-500'>To</span> PDF</h1>
       <h1 className='text-white font-semibold text-2xl hover:scale-110 duration-300'>Home</h1>
      </div>
    </div>
  )
}

export default Navbar
