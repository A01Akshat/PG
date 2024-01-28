import React from 'react'
import Login from './Login/Login'
import Login_Student from './Login/Login_Student'
import Test from './DashBoardStudent/WrapCards';
import Main_Page from './DashBoardStudent/Main_Page';
import Navbar from './Navbar/Navbar';
import More_Info from './More_Info_Page/More_Info';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Favourite from './Favourites/Favourite';
import FavouritePage from './Favourites/FavouritePage';
import Main_PageOwner from './DashBoardOwner/Main_PageOwner';
import Post_page from "../src/Post_page";
import Prevpost from "./PrevPost/Prev";

const App = () => {
  return (
    <div className="flex">
     
    
      {/* <Test/> */}
      {/* <Login/>
      <Login_Student/> */}
      {/* <More_Info/> */}
    <Router>
    {/* <Navbar/> */}
    <Routes>
  
    <Route path='/login' element={<Login/>} />
    <Route path='/' element={<Main_Page/>} />
    <Route path='/fav' element={<FavouritePage/>} />
    <Route path='/more_info' element={<More_Info/>} />
    <Route path='/dasboardOwner' element={<Main_PageOwner/>} />
    <Route path='/Post_page' element={<Post_page/>} />
    <Route path='/prev' element={<Prevpost/>} />

    </Routes>
    </Router>
      
    </div>
  )
}

export default App