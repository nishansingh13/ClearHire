
import './App.css'
import Login from './components/auth/Login'
import ClientAccount from './components/clients/ClientAccount'
import ClientMainPage from './components/clients/ClientMainPage'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'

function App() {
 

  return (
    <>
    <BrowserRouter>
    <Toaster position='top-center' richColors />
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/top-candidates' element={<ClientMainPage/>}/>
      <Route path='/account' element={<ClientAccount/>}/>

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
