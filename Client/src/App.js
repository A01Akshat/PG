import React from 'react'
import Login from './Login/Login'
import Login_Student from './Login/Login_Student'
import Test from './Test';
import Main_Page from './Main_Page'
import Navbar from './Navbar';
const App = () => {
  return (
    <div>
      <Navbar />
    <div className="flex">
      {/* <Test/> */}
      {/* <Login/>
      <Login_Student/> */}
      <Main_Page/>
      </div>
    </div>
  )
}

export default App