import { Link } from 'react-router-dom';
import  {  useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useConfig } from './configContext/ConfigProvider';
import { Loader2 } from 'lucide-react';
import API from '../utils/api';

function Navbar() {
    const { loggedIn,setLoggedIn, server } = useConfig();
    const [loading,setLoading] = useState(false);    useEffect(()=>{
        const validateLogin = async()=>{

      try{
        setLoading(true);
        const token = localStorage.getItem('authToken');
        if (token) {
          const res = await API.get(`${server}/users/token`);
          if(res.status==200){
            setLoggedIn(true);
          }
        } else {
          setLoggedIn(false);
        }
      }
      catch(err){
        console.error(err);
        // Token is invalid
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        setLoggedIn(false);
      }
      finally{
        setLoading(false);
      }
    }
    validateLogin();
    },[server, setLoggedIn])

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  if(loading) return (<>
    <div className="w-full h-screen flex justify-center items-center">  <Loader2 className='animate-spin w-[4rem] h-[4rem] md:w-[10rem] md:h-[10rem] text-green-600'/></div>

  </>)
  return (
    <nav className='bg-white shadow-sm border-b'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <h1 className='text-2xl font-bold text-gray-900 cursor-pointer' onClick={()=>navigate("/")}>ClearHire</h1>
          </div>
          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-8'>
              <Link to="/top-candidates" className='text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors'>Top 1%</Link>
              <Link to ="/blog" className='text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors'>Blog</Link>
              <a href="#" className='text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors'>Clients</a>
              <a href="#" className='text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors'>Other Services</a>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className='hidden md:flex items-center space-x-4'>
            <Link to ="/apply" className='text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors'>Apply as Talent</Link>
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors" onClick={() => navigate("/top-candidates")}>
              Hire Top Talent
            </button>
            {!loggedIn?(
                <button 
              onClick={() => navigate("/login")}
              className='text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors cursor-pointer'
            >
              Log in
            </button>
            ):(<Link to="/account">
               <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-4 lg:mb-0 lg:mr-6 mx-auto lg:mx-0">
                    <svg className="w-12 h-12 p-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
            </Link>)}
          
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none'
            >
              <svg className='h-6 w-6' stroke='currentColor' fill='none' viewBox='0 0 24 24'>
                {isMenuOpen ? (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                ) : (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className='md:hidden bg-white border-t border-gray-200'>
          <div className='px-2 pt-2 pb-3 space-y-1'>
            <a href="#" className='text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors'>Top 1%</a>
            <a href="#" className='text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors'>Other Services</a>
            <a href="#" className='text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors' >Clients</a>
            <a href="#" className='text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors'>Blog</a>
            <a href="#" className='text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors'>Apply as a Talent</a>
            <div className='px-3 py-2 space-y-2'>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors">
                Hire Top Talent
              </button>
              {!loggedIn ?(
              <button 
                onClick={() => navigate("/login")}
                className='w-full text-gray-700 hover:text-blue-600 text-sm font-medium py-2 px-4 border border-gray-300 rounded-md transition-colors'
              >
                Log in
              </button>
              ) :(
                <>dsd</>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar