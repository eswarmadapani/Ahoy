import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import {Routes,Route, Navigate} from "react-router-dom"
import HomePage from './pages/HomePage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import { useAuthStore } from './store/useAuthStore'
import {Loader} from "lucide-react"
import { Toaster } from 'react-hot-toast'

const App = () => {
   const { authUser,checkAuth,isCheckingAuth }= useAuthStore()

   useEffect(() => {
     checkAuth();
   }, [checkAuth]);
   
   if(isCheckingAuth && !authUser) return (

    <div className="flex justify-center items-center h-screen">
      <Loader className = "size-10 animate-spin"/>
    </div>

   )
   
   
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path = "/" element = {authUser ? <HomePage/> : <Navigate to = "/signin"/>} />
        <Route path = "/SignIn" element = {!authUser ? <SignIn/>: <Navigate to = "/"/>} />
        <Route path = "/SignUp" element = {!authUser ? <SignUp/> : <Navigate to = "/"/>} />
        <Route path = "/Settings" element = {<Settings/>} />
        <Route path = "/Profile" element = {authUser ? <Profile/> : <Navigate to = "/signin"/>} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
