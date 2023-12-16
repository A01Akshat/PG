import React from 'react'
import './filter.css'
const Login_Student = () => {
  return (
    <div style={{padding:"10px"}}>

    <h1><b>FILTERS</b></h1>
    <div style={{border:"2px solid black",padding:"4px 4px 4px ",borderRadius:"5px",boxShadow:"2px 2px 2px 3px lightgrey"}}>    
    <h2><b>Distance:</b></h2>
    <h3 className="mx-5">Within 1KM</h3>
   <div style={{marginTop:"-1.39rem",marginLeft:"-13rem"}}> <input type="checkbox"></input> </div>
   <h3 className="mx-5">Within 3KM</h3>
   <div style={{marginTop:"-1.39rem",marginLeft:"-13rem"}}> <input type="checkbox"></input> </div>
   <h3 className="mx-5">Within 5KM</h3>
   <div style={{marginTop:"-1.39rem",marginLeft:"-13rem"}}> <input type="checkbox"></input> </div>
   <h3 className="mx-5">Within 7KM</h3>
   <div style={{marginTop:"-1.39rem",marginLeft:"-13rem"}}> <input type="checkbox"></input> </div>
    </div>
    
    <div style={{border:"2px solid black",padding:"4px 4px 4px ",marginTop:"1rem",borderRadius:"5px",boxShadow:"2px 2px 2px 3px lightgrey"}}>    
    <h2><b>Price:</b></h2>
    <h3 className="mx-5">₹1000-₹2000</h3>
   <div style={{marginTop:"-1.39rem",marginLeft:"-13rem"}}> <input type="checkbox" style={{}}></input> </div>
   <h3 className="mx-5">₹2000-₹4000</h3>
   <div style={{marginTop:"-1.39rem",marginLeft:"-13rem"}}> <input type="checkbox" style={{}}></input> </div>
   <h3 className="mx-5">₹4000-₹6000</h3>
   <div style={{marginTop:"-1.39rem",marginLeft:"-13rem"}}> <input type="checkbox" style={{}}></input> </div>
   <h3 className="mx-5">₹6000-₹10000</h3>
   <div style={{marginTop:"-1.39rem",marginLeft:"-13rem"}}> <input type="checkbox" style={{}}></input> </div>



    </div>
    </div>
  )
}

export default Login_Student;