import React, { useState, useEffect, useRef, useCallback } from 'react';
import WrapCards from '../DashBoardStudent/WrapCards';
import Filters from '../Filters/Filters'
import { FaSearch } from 'react-icons/fa';
import '../App.css'
import AOS from 'aos';
import axios from 'axios';
// import { Toast } from 'react-toastify/dist/components';
import SidebarOwner from "./SidebarOwner";
import StatusOwner from "./StatusOwner";
import NavOwner from "./NavOwner"
const names = [
  'PG', 'Home', 'Rooms'
]
const Main_Page = () => {


  const [newName, setnewName] = useState("");
  const [search, setsearch] = useState("");
  const [check,setCheck] = useState("Hi");
  useEffect(() => {
    AOS.init({
      duration: 2000
    });
  }, []);
  const handleChange = (e) => {
    if (e.key === 'Enter') {
      
       setCheck(search);
    // const f=` https://pgbackend.adityachoudhury.com/api/property/get/search?nearbyCollege=${e.target.value}`
    // axios.get(f) 
    // .then((res) => {
    //     if (res.status === 200) {
    //         console.log("DONE");
    //         console.log(res);
    //         // console.log(dataeach[0].name);
    //     }
    //     else
    //         console.log("error")
    // }).catch((err) => {
        
    // })
  }
    // {{locahost}}/api/property/get/search?city=street&minPrice=500&maxPrice=1500&minRooms=1&furnished=true&nearbyCollege=KIIT&distance=1&page=1&pageSize=10
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
    <NavOwner/>
      {/* , backgroundColor: "#EEF5FF" */}
      <div style={{ width: "100%", height: "200px" }} className="hero-div2">
        <div style={{ display: "flex", marginTop: "80px", alignItems: "center", flexDirection: "column", gap: "20px" }}>
          <h1 style={{ textAlign: "center" }} className=" text-3xl text-white">Search {newName}</h1>
         

        </div>

        <div style={{ display: "flex", flexDirection: "row", marginTop: "5.1rem" }}>
          <div className="w-1/5">
            <SidebarOwner />
          </div>

          <div className="w-4/5" data-aos={"fade-left"} >
            <StatusOwner />
          </div>
        </div>
      </div>
    </>
  )
}

export default Main_Page;