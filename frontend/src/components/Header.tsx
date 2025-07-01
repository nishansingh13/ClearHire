import SubHeading from './SubHeading';

function Header() {
//   const [data,setData] = React.useState();
  return (
    <div className='w-full'>
     <div className="bg-gray-200 min-h-[30rem] py-1">
        <div className='mx-auto w-[90%] lg:w-[70%] h-full px-4 lg:px-0'>
            <SubHeading/>
        </div>

     </div>

    </div>
   
  )
}

export default Header