
import './App.css'
import Login from './components/auth/Login'
import ClientAccount from './components/clients/ClientAccount'
import ClientMainPage from './components/clients/ClientMainPage'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import HireCandidates from './components/recruiters/HireCandidates'
import ProfileView from './components/recruiters/ProfileView'
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
      <Route path = "/top-candidates" element={<ProtectedRoutes><HireCandidates/></ProtectedRoutes>}/>
      <Route path="/profile/:email" element={<ProtectedRoutes><ProfileView/></ProtectedRoutes>}/>
      <Route path="/blog" element={<Blog/>}/>

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
