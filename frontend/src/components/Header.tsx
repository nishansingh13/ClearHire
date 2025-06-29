// import React from 'react'
import Navbar from './Navbar';
import SubHeading from './SubHeading';

function Header() {
//   const [data,setData] = React.useState();
  return (
    <div className='w-full'>
     <div className="bg-[#D1D6E1] mt-[3rem] min-h-[30rem] py-1">
        <div className='mx-auto w-[90%] lg:w-[70%] h-full px-4 lg:px-0'>
            <Navbar/>
            <SubHeading/>
        </div>

     </div>

    </div>
   
  )
}

export default Header