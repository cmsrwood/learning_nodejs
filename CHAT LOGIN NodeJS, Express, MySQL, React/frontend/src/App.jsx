// eslint-disable-next-line no-unused-vars
import React from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import HomeDefault from './pages/HomeDefault'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Sala from './pages/Sala'


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeDefault/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path= "/chat" element={<Chat/>}> </Route>
      <Route path="/sala" element={<Sala/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
