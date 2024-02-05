import React, { useState } from 'react';
import "../Navbar/Navbar.css";
import { useNavigate } from 'react-router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigate=useNavigate();


  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo cursor-pointer" style={{color:"black"}}>PG-ᕼᑌᗷ</span>
        
        
        {/* <span className="navbar-logo">𝚁𝚎𝚏𝚎𝚛𝙷𝚞𝚋</span> */}
        
        {/* <span className="navbar-logo">ʀᴇғᴇʀʜᴜʙ</span> */}
        <button className={`navbar-toggler ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <ul className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        {/* <div>
        <h2 style={{fontSize:"1.2rem"}}>Home</h2>
        </div> */}
        <div style={{display:"flex" , flexDirection:"row" , gap:"1rem"}}>
        <h2 style={{fontSize:"1.2rem"}} className="cursor-pointer" onClick={()=>{navigate("/fav")}}>About</h2>
        <h2 style={{fontSize:"1.2rem"}} className="cursor-pointer" onClick={()=>{navigate("/fav")}}>Contact Us</h2>
        </div>
        {/* <div>
        <h2 style={{fontSize:"1.2rem"}}>Contact Us</h2>
        </div> */}
      </ul>
    </nav>
  );
};

export default Navbar;