import React, { useState, useEffect, useRef, useCallback } from 'react';
import Test from './Test'
import Filters from './Filters'
import { FaSearch } from 'react-icons/fa';
import './App.css'
import AOS from 'aos';
const names = [
  'PG', 'Home', 'Rooms'
]
const Main_Page = () => {


  const [newName, setnewName] = useState("");
  const [search, setsearch] = useState("");
  useEffect(() => {
    AOS.init({
      duration: 2000
    });
  }, []);
  const handleChange = (e) => {
    setsearch(e.target.value);
    console.log(e.target.value);
  };
  const shuffle = useCallback(() => {
    const index = Math.floor(Math.random() * names.length);
    setnewName(names[index]);
  }, []);

  useEffect(() => {
    const intervalID = setInterval(shuffle, 1000);
    return () => clearInterval(intervalID);
  }, [shuffle])


  return (
    <>
      {/* , backgroundColor: "#EEF5FF" */}
      <div style={{ width: "100%", height: "250px" }} className="hero-div">
        <div style={{ display: "flex", marginTop: "80px", alignItems: "center", flexDirection: "column", gap: "20px" }}>
          <h1 style={{ textAlign: "center" }} className=" text-3xl text-white">Search {newName}</h1>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Nearest College..." name="search" id="search" value={search} onChange={handleChange} />
          </div>

        </div>

        <div style={{ display: "flex", flexDirection: "row", marginTop: "6rem" }}>
          <div className="w-1/5">
            <Filters />
          </div>

          <div className="w-4/5" data-aos={"fade-left"} >
            <Test />
          </div>
        </div>
      </div>
    </>
  )
}

export default Main_Page;