import React from 'react'

function Navbar() {
  return (
    <div className='mt-2.5 h-[4rem]' >
        <div className='flex flex-col lg:flex-row justify-between items-center lg:items-start px-4 py-2 gap-4 lg:gap-0'>
        <ul className='flex flex-wrap gap-3 lg:gap-6 text-sm justify-center lg:justify-start'>
            <li className='text-xl lg:text-2xl cursor-pointer font-bold'>ClearHire</li>
            <li className='py-2 transition-all hover:underline underline-offset-[15px] decoration-blue-500 decoration-2 cursor-pointer hidden lg:block'>Top 1%</li>
            <li className='py-2 transition-all hover:underline underline-offset-[15px] decoration-blue-500 decoration-2 cursor-pointer hidden lg:block'>Other Services </li>
            <li className='py-2 transition-all hover:underline underline-offset-[15px] cursor-pointer decoration-blue-500 decoration-2 hidden lg:block' >Clients</li>
            <li className='py-2 transition-all hover:underline underline-offset-[15px] cursor-pointer decoration-blue-500 decoration-2 hidden lg:block'>Blog</li>
        </ul>
        <ul className='flex flex-wrap gap-3 lg:gap-6 text-sm py-2 decoration-blue-500 decoration-2 justify-center lg:justify-end items-center'>
            <li className='transition-all hover:underline underline-offset-[15px] cursor-pointer decoration-blue-500 decoration-2 hidden lg:block'> Apply as a Talent</li>
                <button type="button" className="text-sm lg:text-base text-white font-bold bg-green-600 cursor-pointer py-2 px-3 lg:px-4 rounded-md hover:bg-green-700">
        Hire Top Talent
        </button>

            <li className='transition-all hover:underline underline-offset-[15px] cursor-pointer decoration-blue-500 decoration-2 hidden lg:block'>Log in</li>
        </ul>
        </div>
    </div>
  )
}

export default Navbar