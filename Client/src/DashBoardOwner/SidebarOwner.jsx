import React from "react";
import "../App.css";
import { useNavigate } from "react-router";
import Post_page from "../Post_page"

const SidebarOwner = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="SidebarOwner" style={{marginTop:"-1.3rem"}}>
        <div className="sidebar-dashboard-list">
          <div className="each-sidebar-list">
            <p onClick={() => {
                navigate('/Post_page')
            }}>POST</p>
          </div>
          <div className="each-sidebar-list">
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
          </div>
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
