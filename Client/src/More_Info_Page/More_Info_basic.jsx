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

const More_Info_basic = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [data, setData] = useState({});
    const [name, setname] = useState("");
    const [phone, setphone] = useState("");
    const [email, setemail] = useState("");
    const [gender, setgender] = useState("");
    const [year, setyear] = useState("");
    const [coll, setcoll] = useState("");
    const location = useLocation();
    const s = location.state?.name;
    const book = location.state?.fromUser;

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
            <div style={{ height: "416px", width: "78rem", border: "2px solid black", margin: "1rem", borderRadius: "19px", backgroundColor: "white", marginTop: "10rem" }}>
            <div className="wrap">
                <img src={image} style={{ width: "37%", height: "350px", borderRadius: "19px", padding: "4px",marginBottom:"1rem" }} alt="property" />
                <h1 className="mx-[9rem] text-xl" style={{ marginTop: "-10px" }}>𝑅𝑒𝓃𝓉: ₹{data?.rent}</h1>
                <h1 className="mx-[9rem] text-xl" style={{ marginTop: "-3px" }}>𝑅𝑜𝑜𝓂𝓈: {data?.rooms}</h1>
                <div className="info_div  text-lg">
                    <h1 style={{ marginTop: "-36rem" }}>PG's Name: <span className="text-lg" style={{ marginLeft: "3.8rem", fontWeight: "600" }}>{data.name} {(book === "false") ? (<button className="Apply2" style={{ marginLeft: "28rem" , height:"2rem",position:"fixed" }} onClick={openModal}>Book Now</button>) : (<></>)}</span></h1>
                    <h1 style={{ marginTop: "1.7rem" }}>Contact: <span className="text-lg" style={{ marginLeft: "5.3rem", fontWeight: "600" }}>{data.ownerContact}</span></h1>
                    <h1 style={{ marginTop: "1.7rem" }}>Address:<span className="text-lg" style={{ marginLeft: "5.5rem", fontWeight: "600" }}>{data.address}</span></h1>
                    <h1 style={{ marginTop: "1.7rem" }}>Nearest College: <span className="text-lg Amnety2" style={{ marginLeft: "21px", fontWeight: "600" }}>{data?.nerbyColleges?.[0]?.collegeName}</span></h1>
                    <h1 style={{ marginTop: "1.7rem" }}>Amenities:
                        <div style={{ display: "flex", flexDirection: "row", marginLeft: "9.9rem", marginTop: "-2rem", gap: "20px", fontWeight: "600" }}>
                           
                            {data.facilities && data.facilities.food && <h1 className="Amnety">Mess</h1>}
                            {data.facilities && data.facilities.hotWater && <h1 className="Amnety">Geyser</h1>}
                            {data.facilities && data.facilities.laundry && <h1 className="Amnety">Laundry</h1>}
                            {data.facilities && data.facilities.ac && <h1 className="Amnety">AC</h1>}
                            {data.facilities && data.facilities.parking && <h1 className="Amnety">Parking</h1>}
                            {data.facilities && data.facilities.wifi && <h1 className="Amnety">Wi-Fi</h1>}
                        </div>
                    </h1>
                    <h1 style={{ marginTop: "2rem" }}>Furnished:<span className="text-lg Amnety" style={{ marginLeft: "4.8rem", fontWeight: "600" }}>Semi-Furnished</span></h1>
                    <h1 style={{ marginTop: "2rem" }}>Bathroom:<span className="text-lg" style={{ marginLeft: "5.5rem", fontWeight: "600" }}>Attached</span></h1>
                </div>
                </div>

                
                
            </div>

        </>
    )
}

export default More_Info_basic


// import React, { useState, useEffect } from 'react';
// import image from '../Image/1669125652900.jpg';
// import line from '../Image/line.png';
// import '../App.css';
// import { useLocation } from 'react-router-dom';
// import AOS from 'aos';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import Navbar from "../Navbar/Navbar";
// import "./More_info.css";

// const accessToken = localStorage.getItem('token');

// const config = {
//     headers: {
//         Authorization: `Bearer ${accessToken}`,
//     },
// };

// const More_Info_basic = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const [data, setData] = useState({});
//     const [name, setname] = useState("");
//     const [phone, setphone] = useState("");
//     const [email, setemail] = useState("");
//     const [gender, setgender] = useState("");
//     const [year, setyear] = useState("");
//     const [coll, setcoll] = useState("");
//     const location = useLocation();
//     const s = location.state?.name;
//     const book = location.state?.fromUser;

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const url = `https://pgbackend.adityachoudhury.com/api/property/${s}`;
//                 const response = await axios.get(url);
//                 if (response.status === 200) {
//                     console.log(response.data);
//                     setData(response.data);
//                     // toast("DONE");
//                 }
//             } catch (error) {
//                 toast("Error fetching data");
//             }
//         };

//         fetchData();
//     }, [s]);

//     const openModal = () => {
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//     };

//     return (
//         <>
//             <div className="container">
//                 <div className="image-container">
//                     <img src={image} alt="property" />
//                 </div>
//                 <div className="info-container">
//                     <h1 className="rent">Rent: ₹{data?.rent}</h1>
//                     <h1 className="rooms">Rooms: {data?.rooms}</h1>
//                     <div className="info_div">
//                         <h1 className="pg-name">PG's Name: <span className="pg-name-value">{data.name} {(book === "false") ? (<button className="apply-button" onClick={openModal}>Book Now</button>) : (<></>)}</span></h1>
//                         <h1 className="contact">Contact: <span className="contact-value">{data.ownerContact}</span></h1>
//                         <h1 className="address">Address: <span className="address-value">{data.address}</span></h1>
//                         <h1 className="nearest-college">Nearest College: <span className="college-name">{data?.nerbyColleges?.[0]?.collegeName}</span></h1>
//                         <h1 className="amenities">Amenities:
//                             <div className="amenities-list">
//                                 {data.facilities && data.facilities.food && <span className="amenity">Mess</span>}
//                                 {data.facilities && data.facilities.hotWater && <span className="amenity">Geyser</span>}
//                                 {data.facilities && data.facilities.laundry && <span className="amenity">Laundry</span>}
//                                 {data.facilities && data.facilities.ac && <span className="amenity">AC</span>}
//                                 {data.facilities && data.facilities.parking && <span className="amenity">Parking</span>}
//                                 {data.facilities && data.facilities.wifi && <span className="amenity">Wi-Fi</span>}
//                             </div>
//                         </h1>
//                         <h1 className="furnished">Furnished: <span className="furnished-value">Semi-Furnished</span></h1>
//                         <h1 className="bathroom">Bathroom: <span className="bathroom-value">Attached</span></h1>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default More_Info_basic;
