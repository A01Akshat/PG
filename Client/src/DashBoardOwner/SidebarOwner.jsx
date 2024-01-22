import React from "react";
import "../App.css";
import { useNavigate } from "react-router";

const SidebarOwner = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="SidebarOwner">
        <div className="sidebar-dashboard-list">
          <div className="each-sidebar-list">
            <p onClick={() => {
                alert("Show profile")
            }}>PROFILE</p>
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
