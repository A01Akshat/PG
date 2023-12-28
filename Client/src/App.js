import React from 'react'
import Login from './Login/Login'
import Login_Student from './Login/Login_Student'
import Test from './Test';
import Main_Page from './Main_Page'
import Navbar from './Navbar';
import More_Info from './More_Info';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Favourite from './Favourites/Favourite';
const App = () => {
  return (
    <div className="flex">
     
    
      {/* <Test/> */}
      {/* <Login/>
      <Login_Student/> */}
      {/* <More_Info/> */}
    <Router>
    <Navbar/>
    <Routes>
    <Route path='/fav' element={<Favourite/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/' element={<Main_Page/>} />
    <Route path='/more_info' element={<More_Info/>} />
    </Routes>
    </Router>
      
    </div>
  )
}

export default App