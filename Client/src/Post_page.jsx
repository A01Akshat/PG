import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import './App.css';
import AOS from 'aos';
import axios from 'axios';
// import { Toast } from 'react-toastify/dist/components';
import Navbar from "./Navbar/Navbar";
import SidebarOwner from './DashBoardOwner/SidebarOwner';
import { useNavigate } from "react-router";
import { MultiSelect } from 'primereact/multiselect';



const names = [
  'PG', 'Home', 'Rooms'
]
const Main_Page = () => {
  let yellow = '#ffc800';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setnewName] = useState("");
  const [search, setsearch] = useState("");
  const [check, setCheck] = useState("Hi");
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("");
  const [year, setyear] = useState("");
  const [coll, setcoll] = useState("");
  const [bgColor, setBgColor] = useState(yellow);
  const navigate = useNavigate();
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
  }, [shuffle]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      {/* , backgroundColor: "#EEF5FF" */}

      <div style={{ width: "100%", height: "250px" }} className="hero-div ${isModalOpen ? 'blur' : ''}">
        <div style={{ display: "flex", marginTop: "80px", alignItems: "center", flexDirection: "column", gap: "20px" }}>
          <h1 style={{ textAlign: "center" }} className=" text-3xl text-white">Search {newName}</h1>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Nearest College..." name="search" id="search" value={search} onChange={(e) => setsearch(e.target.value)} onKeyDown={handleChange} />
          </div>

        </div>

        <div style={{ display: "flex", flexDirection: "row", marginTop: "6rem" }}>
          <div className="w-1/5">
            <SidebarOwner />
          </div>

          <div className="StatusOwner">
            <div className="ListOfStudents" style={{ marginTop: "-140px", gap: "4rem" }}>
              <div className="eachStudentApplied" style={{ marginLeft: "3.5rem" }}>
                <div className='eachStudentApplied-name' style={{ cursor: "pointer" }} onClick={openModal}>
                  <p>Add Property</p>
                </div>
                <div>
                  <button className='btn-ProfleStatusOwner'></button>
                </div>
              </div>
              <div className="eachStudentApplied" style={{ marginLeft: "3.5rem" }}>
                <div className='eachStudentApplied-name'>
                  <p>Show Your Listed Property</p>
                </div>
                <div>
                  <button className='btn-ProfleStatusOwner'></button>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h1 style={{ marginBottom: "10px" }}><u>Share you details:</u></h1>
            <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              <input
                type="text"
                id="exampleInput"
                name="exampleInput"
                placeholder="Enter your PG's name"
                className="input2"
                value={name}
                onChange={(e) => {
                  setname(e.target.value)
                }}
              />

              <input
                type="text"
                id="exampleInput"
                name="exampleInput"
                placeholder="Enter your phone number"
                className="input2"
                value={phone}
                onChange={(e) => {
                  setphone(e.target.value)
                }}
              />
              <input
                type="text"
                id="exampleInput"
                name="exampleInput"
                placeholder="Enter your email"
                className="input2"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value)
                }}
              />

              <input
                type="text"
                id="exampleInput"
                name="exampleInput"
                placeholder="Enter your PG's Address"
                className="input2"
                value={name}
                onChange={(e) => {
                  setname(e.target.value)
                }}
              />

              <input
                type="text"
                id="exampleInput"
                name="exampleInput"
                placeholder="Enter your PG's Rent"
                className="input2"
                value={year}
                onChange={(e) => {
                  setyear(e.target.value)
                }}
              />
              <input
                type="text"
                id="exampleInput"
                name="exampleInput"
                placeholder="Enter number of rooms available"
                className="input2"
                value={coll}
                onChange={(e) => {
                  setcoll(e.target.value)
                }}
              />
              <input
                type="text"
                id="exampleInput"
                name="exampleInput"
                placeholder="Enter the Nearby College"
                className="input2"
                value={coll}
                onChange={(e) => {
                  setcoll(e.target.value)
                }}
              />
              <div style={{border:"2px solid grey"}}>
              <select>
                <option value="someOption">Furnished</option>
                <option value="otherOption">Not Furnished</option>
                <option value="otherOption">Semi-Furnished</option>
              </select>
              </div>
             <div style={{display:"flex",flexDirection:"row",gap:"2rem",flexWrap:"nowrap"}}>
             <button style={{border:"2px solid  rgba(32, 178, 171, 0.411)"}} >Wifi</button>
             <button style={{border:"2px solid  rgba(32, 178, 171, 0.411)"}}>Parking</button>
             <button style={{border:"2px solid  rgba(32, 178, 171, 0.411)"}}>Laundry</button>
             <button style={{border:"2px solid  rgba(32, 178, 171, 0.411)"}}>AC</button>
             <button style={{border:"2px solid  rgba(32, 178, 171, 0.411)"}}>Geyser</button>
             <button style={{border:"2px solid  rgba(32, 178, 171, 0.411)"}}>Mess</button>
             </div>             
         
              
             
            </div>
            {/* Add more content or form fields as needed */}
            <button onClick={() => {
              const body = {
                // propertyId: data._id,
                name: name,
                contact: phone,
                email: email,
                gender: gender,
                currentYear: year,
                collegeName: coll
              }
                // axios.post("https://pgbackend.adityachoudhury.com/api/property/interested", body , config)
                .then((res) => {
                  if (res.status === 201) {
                    alert("done")
                    // toast("DONE")
                    // navigate("/")
                  }
                  else
                    alert("error")
                }).catch((err) => {
                  //   toast("already exist")
                  alert("exist")
                })


            }} className="Apply2" style={{ marginRight: "2rem", height: "2rem", background: "#3bf594" }}>Submit</button>
            <button
              onClick={closeModal}
              className="Apply2" style={{ marginTop: "20px", marginBottom: "-25px", background: "red", height: "2rem" }}>Close</button>
          </div>
        </div>
      )}


    </>
  )
}

export default Main_Page;







