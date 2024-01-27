import React, { useState, useEffect } from 'react';
import image from '../Image/1669125652900.jpg';
import line from '../Image/line.png';
import '../App.css';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';
import { toast } from 'react-toastify';
import axios from 'axios';
import Navbar from "../Navbar/Navbar";

const accessToken = localStorage.getItem('token');

const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};


const More_Info = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [data, setData] = useState({});
    const [name , setname] = useState("");
    const [phone , setphone] = useState("");
    const [email , setemail] = useState("");
    const [gender , setgender] = useState("");
    const [year , setyear] = useState("");
    const [coll , setcoll] = useState("");
    const location = useLocation();
    const s = location.state?.name;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `https://pgbackend.adityachoudhury.com/api/property/${s}`;
                const response = await axios.get(url);
                if (response.status === 200) {
                    console.log(response.data);
                    setData(response.data);
                    // toast("DONE");
                }
            } catch (error) {
                toast("Error fetching data");
            }
        };

        fetchData();
    }, [s]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
        <Navbar/>
            <div className={`hero-div w-[100%] h-[100vh] ${isModalOpen ? 'blur' : ''}`}>
                <img src={line} className="line-img" alt="line"></img>
                <div className="info_div  text-lg">
                    <h1 style={{ marginTop: "-5rem" }}>PG's Name: <span className="text-lg" style={{ marginLeft: "3.6rem", fontWeight: "600" }}>{data.name} <button className="Apply2" style={{ marginLeft: "29rem" , height:"2rem" }} onClick={openModal}>Book Now</button></span></h1>
                    <h1 style={{ marginTop: "3rem" }}>Contact: <span className="text-lg" style={{ marginLeft: "5.3rem", fontWeight: "600" }}>{data.ownerContact}</span></h1>
                    <h1 style={{ marginTop: "3rem" }}>Address:<span className="text-lg" style={{ marginLeft: "5.5rem", fontWeight: "600" }}>{data.address}</span></h1>
                    <h1 style={{ marginTop: "3rem" }}>Nearest College: <span className="text-lg Amnety2" style={{ marginLeft: "21px", fontWeight: "600" }}>{data?.nerbyColleges?.[0]?.collegeName}</span></h1>
                    <h1 style={{ marginTop: "3rem" }}>Amenities:
                        <div style={{ display: "flex", flexDirection: "row", marginLeft: "9.9rem", marginTop: "-2rem", gap: "20px", fontWeight: "600" }}>
                            <h1 className="Amnety">Furnished</h1>
                            {data.facilities && data.facilities.food && <h1 className="Amnety">Mess</h1>}
                            {data.facilities && data.facilities.hotWater && <h1 className="Amnety">Geyser</h1>}
                            {data.facilities && data.facilities.laundry && <h1 className="Amnety">Laundry</h1>}
                            {data.facilities && data.facilities.ac && <h1 className="Amnety">AC</h1>}
                            <h1 className="Amnety">Inverter</h1>
                            {data.facilities && data.facilities.wifi && <h1 className="Amnety">Wi-Fi</h1>}
                        </div>
                    </h1>
                </div>

                <div style={{ height: "370px", width: "78rem", border: "2px solid black", margin: "1rem", borderRadius: "19px", backgroundColor: "white", marginTop: "8rem" }}>
                    <div style={{ borderRadius: "20px", padding: "10px" }}>
                        <img src={image} style={{ width: "27%", height: "300px", borderRadius: "19px", padding: "4px" }} alt="property" />
                    </div>

                    <h1 className="mx-[7rem] text-xl" style={{ marginTop: "-10px" }}>𝑅𝑒𝓃𝓉: ₹{data?.rent}</h1>
                    <h1 className="mx-[7rem] text-xl" style={{ marginTop: "-3px" }}>𝑅𝑜𝑜𝓂𝓈: {data?.rooms}</h1>
                </div>
            </div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h1 style={{marginBottom:"10px"}}><u>Share you details:</u></h1>
                        <div style={{display:"flex",flexDirection:"column",gap:"7px"}}>
                            <input
                                type="text"
                                id="exampleInput"
                                name="exampleInput"
                                placeholder="Enter your name"
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
                                placeholder="Enter your gender"
                                className="input2"
                                value={gender}
                                onChange={(e) => {
                                    setgender(e.target.value)
                                }}
                            />
                            <input
                                type="text"
                                id="exampleInput"
                                name="exampleInput"
                                placeholder="Enter your current year"
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
                                placeholder="Enter your college name"
                                className="input2"
                                value={coll}
                                onChange={(e) => {
                                    setcoll(e.target.value)
                                }}
                            />
                        </div>
                        {/* Add more content or form fields as needed */}
                        <button onClick={() => {
                            const body = {
                                propertyId: data._id,
                                name: name,
                                contact: phone,
                                email: email,
                                gender: gender,
                                currentYear: year,
                                collegeName: coll
                            }
                              axios.post("https://pgbackend.adityachoudhury.com/api/property/interested", body , config)
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
                           
                          
                        }} className="Apply2" style={{marginRight:"2rem" , height:"2rem" , background:"#3bf594"}}>Submit</button>
                        <button 
                        onClick={closeModal} 
                        className="Apply2" style={{marginTop:"20px",marginBottom:"-25px" , background:"red" , height:"2rem"}}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default More_Info;
