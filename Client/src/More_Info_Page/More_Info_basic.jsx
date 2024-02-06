import React, { useState, useEffect } from 'react';
import image from '../Image/1669125652900.jpg';
import line from '../Image/line.png';
import '../App.css';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';
import { toast } from 'react-toastify';
import axios from 'axios';
import Navbar from "../Navbar/Navbar";
import "./More_info.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { faCouch } from "@fortawesome/free-solid-svg-icons";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { faToiletPaper } from "@fortawesome/free-solid-svg-icons";

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
            <div className="rect-box">
                <div className="wrap">
                    <img src={image} className="property-image" alt="property" />
                    <h1 className="mx-[9rem] text-xl" style={{ marginTop: "-10px" }}>𝑅𝑒𝓃𝓉: ₹{data?.rent}</h1>
                    <h1 className="mx-[9rem] text-xl" style={{ marginTop: "-3px" }}>𝑅𝑜𝑜𝓂𝓈: {data?.rooms}</h1>
                    <div className="info_div  text-lg">
                        <h1 style={{ marginTop: "-36rem" }}><FontAwesomeIcon icon={faHouse}/> PG's Name: <span className="text-lg" style={{ marginLeft: "3.8rem", fontWeight: "600" }}>{data.name}</span></h1>
                        <h1 style={{ marginTop: "1.7rem" }}><FontAwesomeIcon icon={faAddressBook} /> Contact: <span className="text-lg" style={{ marginLeft: "5.3rem", fontWeight: "600" }}>{data.ownerContact}</span></h1>
                        <h1 style={{ marginTop: "1.7rem" }}><FontAwesomeIcon icon={faLocationDot} /> Address:<span className="text-lg" style={{ marginLeft: "5.9rem", fontWeight: "600" }}>{data.address}</span></h1>
                        <h1 style={{ marginTop: "1.7rem" }}><FontAwesomeIcon icon={faBuildingColumns} /> Nearest College: <span className="text-lg Amnety2" style={{ marginLeft: "21px", fontWeight: "600" }}>{data?.nerbyColleges?.[0]?.collegeName}</span></h1>
                        <h1 style={{ marginTop: "1.7rem" }}><FontAwesomeIcon icon={faWifi} /> Amenities:
                            <div style={{ display: "flex", flexDirection: "row", flexWrap:"wrap", marginLeft: "11.1rem", marginTop: "-2rem", gap: "14px", fontWeight: "600" }}>

                                {data.facilities && data.facilities.food && <h1 className="Amnety">Mess</h1>}
                                {data.facilities && data.facilities.hotWater && <h1 className="Amnety">Geyser</h1>}
                                {data.facilities && data.facilities.laundry && <h1 className="Amnety">Laundry</h1>}
                                {data.facilities && data.facilities.ac && <h1 className="Amnety">AC</h1>}
                                {data.facilities && data.facilities.parking && <h1 className="Amnety">Parking</h1>}
                                {data.facilities && data.facilities.wifi && <h1 className="Amnety">Wi-Fi</h1>}
                                {data.facilities && data.facilities.lift && <h1 className="Amnety">Lift</h1>}
                                {data.facilities && data.facilities.powerBackup && <h1 className="Amnety">Inverter</h1>}
                               
                                

                                {/* {<h1 className="Amnety">Mess</h1>}
                                {<h1 className="Amnety">Geyser</h1>}
                                {<h1 className="Amnety">Laundry</h1>}
                                {<h1 className="Amnety">AC</h1>}
                                {<h1 className="Amnety">Parking</h1>}
                                {<h1 className="Amnety">Lift</h1>}
                                {<h1 className="Amnety">Power Backup</h1>}
                                {<h1 className="Amnety">Wi-Fi</h1>} */}
                            </div>
                        </h1>
                        <h1 style={{ marginTop: "2rem" }}><FontAwesomeIcon icon={faCouch} /> Furnished:<span className="text-lg Amne" style={{ marginLeft: "4.5rem", fontWeight: "600" }}>{data.furnished}</span></h1>
                        <h1 style={{ marginTop: "1rem"}}><FontAwesomeIcon icon={faToiletPaper} /> Bathroom:<span className="text-lg" style={{ marginLeft: "5.2rem", fontWeight: "600" }}>{data.bathroom}</span></h1>
                    </div>
                </div>



            </div>

        </>
    )
}

export default More_Info_basic

