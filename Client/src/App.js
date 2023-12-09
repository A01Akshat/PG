import React from 'react'
import Login from './Login/Login'
import Login_Student from './Login/Login_Student'
const App = () => {
  return (
    <div>
    <div className="flex">
      <Login/>
      <Login_Student/>
      </div>
    </div>
  )
}

export default App