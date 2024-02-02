import React from "react";
import "../App.css";
import { useNavigate } from "react-router";
import Post_page from "../Post_page"

const SidebarOwner = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="SidebarOwner" style={{marginTop:"-1.5rem"}}>
        <div className="sidebar-dashboard-list">
        <div className="each-sidebar-list">
            <p onClick={() => {
                navigate('/')
            }}>FEED</p>
          </div>
          <div className="each-sidebar-list">
            <p onClick={() => {
                navigate('/fav')
            }}>FAVOURITES</p>
          </div>
          <div className="each-sidebar-list">
            <p onClick={() => {
                navigate('/Post_page')
            }}>POST</p>
          </div>
          {/* <div className="each-sidebar-list">
            <p onClick={() => {
                navigate('/dasboardOwner');
            }}></p>
          </div>
          <div className="each-sidebar-list">
            <p onClick={() => {
                navigate('/dasboardOwner');
            }}>STATUS</p>
          </div>
          <div className="each-sidebar-list">
            <p onClick={() => {
                navigate('/dasboardOwner');
            }}>STATUS</p>
          </div> */}
          <div className="each-sidebar-list">
            <p
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              Log Out
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarOwner;

// import React from 'react';
// import { FaHome, FaUser, FaCog, FaEnvelope } from 'react-icons/fa';
// import "./Side.css";

// const SidebarOwner = () => {
//   return (
//     <div className="sidebar">
//       <div className="sidebar-item">
//         <FaHome />
//         <span>Home</span>
//       </div>
//       <div className="sidebar-item">
//         <FaUser />
//         <span>Profile</span>
//       </div>
//       <div className="sidebar-item">
//         <FaCog />
//         <span>Settings</span>
//       </div>
//       <div className="sidebar-item">
//         <FaEnvelope />
//         <span>Messages</span>
//       </div>
//     </div>
//   );
// };

// export default SidebarOwner;
