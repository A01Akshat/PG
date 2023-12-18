import React, { useState, useEffect, useRef, useCallback } from 'react';
import image from "./Image/1669125652900.jpg"
import AOS from 'aos';
import "aos/dist/aos.css";


const Test = () => {

    useEffect(() => {
        AOS.init({
            offset: 300,
            duration: 1000,
            // easing: 'ease-in-sine',
            // delay: 100,
        });
      }, []);

  return (
   <div data-aos={"fade-in"} >
   <div style={{display:"grid",gridTemplateColumns:"auto auto auto",alignItems:"center",justifyContent:"center"}}>
   {/* MAIN DIV */}
    <div style={{height:"260px",width:"300px",border:"2px solid black",margin:"1rem",borderRadius:"19px"}}>



        {/* IMAGE DIV */}
        <div style={{borderRadius:"20px"}}>
        <img src={image} style={{width:"100%",height:"150px",borderRadius:"19px",padding:"5px"}}/>
        </div>



        {/* INFO DIV */}
        <div style={{margin:"1px",padding:"7px",fontSize:"14.5px"}}>
            <div style={{display:"flex",flexDirection:"row"}}><h3>Price:₹1000</h3><button style={{marginLeft:"11.5rem"}}>❤️</button></div>
            <h3>Nearest College: KIIT</h3>
            <h3>Rooms Availaible:1</h3>
            <h3>Within: 1KM</h3>

            
            <h1 style={{marginLeft:"11.9rem",marginTop:"-1.5rem"}}>More Info ➡️</h1>
        </div>
    </div>
      {/* MAIN DIV */}
      <div style={{height:"260px",width:"300px",border:"2px solid black",margin:"1rem",borderRadius:"19px"}}>



{/* IMAGE DIV */}
<div style={{borderRadius:"20px"}}>
<img src={image} style={{width:"100%",height:"150px",borderRadius:"19px",padding:"5px"}}/>
</div>



{/* INFO DIV */}
<div style={{margin:"1px",padding:"7px",fontSize:"14.5px"}}>
    <div style={{display:"flex",flexDirection:"row"}}><h3>Price:₹1000</h3><button style={{marginLeft:"11.5rem"}}>❤️</button></div>
    <h3>Nearest College: KIIT</h3>
    <h3>Rooms Availaible:1</h3>
    <h3>Within: 1KM</h3>

    
    <h1 style={{marginLeft:"11.9rem",marginTop:"-1.5rem"}}>More Info ➡️</h1>
</div>
</div>
  {/* MAIN DIV */}
  <div style={{height:"260px",width:"300px",border:"2px solid black",margin:"1rem",borderRadius:"19px"}}>



{/* IMAGE DIV */}
<div style={{borderRadius:"20px"}}>
<img src={image} style={{width:"100%",height:"150px",borderRadius:"19px",padding:"5px"}}/>
</div>



{/* INFO DIV */}
<div style={{margin:"1px",padding:"7px",fontSize:"14.5px"}}>
    <div style={{display:"flex",flexDirection:"row"}}><h3>Price:₹1000</h3><button style={{marginLeft:"11.5rem"}}>❤️</button></div>
    <h3>Nearest College: KIIT</h3>
    <h3>Rooms Availaible:1</h3>
    <h3>Within: 1KM</h3>

    
    <h1 style={{marginLeft:"11.9rem",marginTop:"-1.5rem"}}>More Info ➡️</h1>
</div>
</div>
  {/* MAIN DIV */}
    <div style={{height:"260px",width:"300px",border:"2px solid black",margin:"1rem",borderRadius:"19px"}}>



        {/* IMAGE DIV */}
        <div style={{borderRadius:"20px"}}>
        <img src={image} style={{width:"100%",height:"150px",borderRadius:"19px",padding:"5px"}}/>
        </div>



        {/* INFO DIV */}
        <div style={{margin:"1px",padding:"7px",fontSize:"14.5px"}}>
            <div style={{display:"flex",flexDirection:"row"}}><h3>Price:₹1000</h3><button style={{marginLeft:"11.5rem"}}>❤️</button></div>
            <h3>Nearest College: KIIT</h3>
            <h3>Rooms Availaible:1</h3>
            <h3>Within: 1KM</h3>

            
            <h1 style={{marginLeft:"11.9rem",marginTop:"-1.5rem"}}>More Info ➡️</h1>
        </div>
    </div>

</div>

</div>
    )
}

export default Test;