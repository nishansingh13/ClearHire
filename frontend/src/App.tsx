
import './App.css'
import Login from './components/auth/Login'
import ClientAccount from './components/clients/ClientAccount'
import ClientMainPage from './components/clients/ClientMainPage'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import TopCandidates from './components/clients/TopCandidates'
import Blog from './components/extras/Blog'
import ProtectedRoutes from './components/protect/ProtectedRoutes'
function App() {
 

  return (
    <>
    <BrowserRouter>
    <Toaster position='top-center' richColors />
    <Routes>
      
      <Route path='/' element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/apply' element={<ProtectedRoutes><ClientMainPage/></ProtectedRoutes>}/>
      <Route path='/account' element={<ProtectedRoutes><ClientAccount/></ProtectedRoutes>}/>
      <Route path = "/top-candidates" element={<ProtectedRoutes><TopCandidates/></ProtectedRoutes>}/>
      <Route path="/blog" element={<Blog/>}/>

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
