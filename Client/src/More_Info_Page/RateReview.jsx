import React, { useState, useEffect } from 'react';
import image from '../Image/1669125652900.jpg';
import line from '../Image/line.png';
import '../App.css';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';
import { toast } from 'react-toastify';
import axios from 'axios';
import Navbar from "../Navbar/Navbar";
import "./More_info.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { faCouch } from "@fortawesome/free-solid-svg-icons";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { faToiletPaper } from "@fortawesome/free-solid-svg-icons";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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
                const url = `https://pgbackend.adityachoudhury.com/api/property/rating/658cee91815b6541149be9bf`;
                const response = await axios.get(url);
                if (response.status === 200) {
                    console.log(response);
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
    const [rate1 , setrate1] = useState(false);
    const [rate2 , setrate2] = useState(false);
    const [rate3 , setrate3] = useState(false);
    const [rate4 , setrate4] = useState(false);
    const [rate5 , setrate5] = useState(false);
    return (
        <>
            <div className="rect-box">
            <div className="wrap-review">
                    <div className="property-rate">
                        <p style={{fontSize:"1.2rem",fontFamily:"cursive"}}>Your Feedback matters a lot for Us !</p>
                        <p style={{fontWeight:"600",marginTop:"2rem"}}>How you rate about this PG</p>
                        <div className="rate-stars">
                        {(rate1) ? (<FontAwesomeIcon icon={faStar} style={{color:"blue",height:"2rem" , width:"2rem"}} onClick={() => {
                            setrate5(false)
                            setrate4(false)
                            setrate3(false)
                            setrate2(false)
                        }} />) : (<FontAwesomeIcon icon={faStar} style={{color:"red",height:"2rem" , width:"2rem"}} onClick={() => {
                            setrate1(true)
                        }} />)}

{(rate2) ? (<FontAwesomeIcon icon={faStar} style={{color:"blue",height:"2rem" , width:"2rem"}} onClick={() => {
                            setrate5(false)
                            setrate4(false)
                            setrate3(false)
                            
                        }} />) : (<FontAwesomeIcon icon={faStar} style={{color:"red",height:"2rem" , width:"2rem"}} onClick={() => {
                            setrate2(true)
                            setrate1(true)
                        }} />)}

{(rate3) ? (<FontAwesomeIcon icon={faStar} style={{color:"blue",height:"2rem" , width:"2rem"}} onClick={() => {
                            setrate5(false)
                            setrate4(false)
                            
                        }} />) : (<FontAwesomeIcon icon={faStar} style={{color:"red",height:"2rem" , width:"2rem"}} onClick={() => {
                            setrate3(true)
                            
                            setrate2(true)
                            setrate1(true)
                        }} />)}

{(rate4) ? (<FontAwesomeIcon icon={faStar} style={{color:"blue",height:"2rem" , width:"2rem"}} onClick={() => {
                            setrate5(false)
                           
                        }} />) : (<FontAwesomeIcon icon={faStar} style={{color:"red",height:"2rem" , width:"2rem"}} onClick={() => {
                            setrate4(true)
                            setrate3(true)
                            setrate2(true)
                            setrate1(true)
                        }} />)}

{(rate5) ? (<FontAwesomeIcon icon={faStar} style={{color:"blue",height:"2rem" , width:"2rem"}} />) : (<FontAwesomeIcon icon={faStar} style={{color:"red",height:"2rem" , width:"2rem"}} onClick={() => {
                            setrate5(true)
                            setrate4(true)
                            setrate3(true)
                            setrate2(true)
                            setrate1(true)
                        }} />)}
                        </div>
                        <p style={{fontWeight:"600",marginTop:"0.5rem"}}>Please share your opinion about this PG</p>
                        <textarea className='inp-reveiw' placeholder='Your Review' cols="30" rows="10"></textarea>

                        <button className='btn-sendFeedback'>Send Feedback</button>

                   
                    </div>
                    <div className="wrap-get-rate">
                        <div className="username-rate">
                            <div>
                    <FontAwesomeIcon icon={faUser} className='user-icon-rate-get' />
                    </div>
                    <div>
                    <div style={{display:"flex" , flexDirection:"column", gap:"0.1rem" , marginTop:"-0.2rem"}}>
                        <p style={{fontWeight:"700"}}>Nilay Rudra</p>
                        <div style={{marginTop:"-0.5rem"}}><FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        <FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        <FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        <FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        <FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        
                        </div>
                    </div>
                    <p style={{width:"40rem"}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis accusantium corrupti iure, reiciendis laboriosam veniam consectetur ducimus saepe quas, maiores minus </p>

                    </div>
                    </div> 

                    <div className="username-rate">
                            <div>
                    <FontAwesomeIcon icon={faUser} className='user-icon-rate-get' />
                    </div>
                    <div>
                    <div style={{display:"flex" , flexDirection:"column", gap:"0.1rem" , marginTop:"-0.2rem"}}>
                        <p style={{fontWeight:"700"}}>Nilay Rudra</p>
                        <div style={{marginTop:"-0.5rem"}}><FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        <FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        <FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        <FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        <FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        
                        </div>
                    </div>
                    <p style={{width:"40rem"}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis accusantium corrupti iure, reiciendis laboriosam veniam consectetur ducimus saepe quas, maiores minus </p>

                    </div>
                    </div>

                    <div className="username-rate">
                            <div>
                    <FontAwesomeIcon icon={faUser} className='user-icon-rate-get' />
                    </div>
                    <div>
                    <div style={{display:"flex" , flexDirection:"column", gap:"0.1rem" , marginTop:"-0.2rem"}}>
                        <p style={{fontWeight:"700"}}>Nilay Rudra</p>
                        <div style={{marginTop:"-0.5rem"}}><FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        <FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        <FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        <FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        <FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        
                        </div>
                    </div>
                    <p style={{width:"40rem"}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis accusantium corrupti iure, reiciendis laboriosam veniam consectetur ducimus saepe quas, maiores minus </p>

                    </div>
                    </div>

                    <div className="username-rate">
                            <div>
                    <FontAwesomeIcon icon={faUser} className='user-icon-rate-get' />
                    </div>
                    <div>
                    <div style={{display:"flex" , flexDirection:"column", gap:"0.1rem" , marginTop:"-0.2rem"}}>
                        <p style={{fontWeight:"700"}}>Nilay Rudra</p>
                        <div style={{marginTop:"-0.5rem"}}><FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        <FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        <FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        <FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        <FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        
                        </div>
                    </div>
                    <p style={{width:"40rem"}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis accusantium corrupti iure, reiciendis laboriosam veniam consectetur ducimus saepe quas, maiores minus </p>

                    </div>
                    </div>

                    <div className="username-rate">
                            <div>
                    <FontAwesomeIcon icon={faUser} className='user-icon-rate-get' />
                    </div>
                    <div>
                    <div style={{display:"flex" , flexDirection:"column", gap:"0.1rem" , marginTop:"-0.2rem"}}>
                        <p style={{fontWeight:"700"}}>Nilay Rudra</p>
                        <div style={{marginTop:"-0.5rem"}}><FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        <FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        <FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        <FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        <FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        
                        </div>
                    </div>
                    <p style={{width:"40rem"}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis accusantium corrupti iure, reiciendis laboriosam veniam consectetur ducimus saepe quas, maiores minus </p>

                    </div>
                    </div>
                    
                    </div>

                    
                </div>
            </div>

        </>
    )
}

export default More_Info_basic

