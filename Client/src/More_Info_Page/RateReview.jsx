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

const More_Info_basic = (props) => {
    const propid = props.id;
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
    const [rate , setrate] = useState(0);
    const [addreview , setaddreview] = useState("");
    const [getreview , setgetreview] = useState([]);


    useEffect(() => {
        // console.log(props.check)
        axios.get(`https://pgbackend.adityachoudhury.com/api/property/review/get/${propid}`, config)
            .then((res) => {
                if (res.status === 200) {
                    
                    console.log(res.data);
                    setgetreview(res.data)
                   
                    // toast("DONE")

                    // console.log(dataeach[0].name);
                }
                else
                    console.log("error")
            }).catch((err) => {
                toast("No Result found")
            })
    }, []);


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
                            setrate(1)
                        }} />) : (<FontAwesomeIcon icon={faStar} style={{color:"red",height:"2rem" , width:"2rem"}} onClick={() => {
                            setrate1(true)
                            setrate(1)
                        }} />)}

{(rate2) ? (<FontAwesomeIcon icon={faStar} style={{color:"blue",height:"2rem" , width:"2rem"}} onClick={() => {
                            setrate5(false)
                            setrate4(false)
                            setrate3(false)
                            setrate(2)
                            
                        }} />) : (<FontAwesomeIcon icon={faStar} style={{color:"red",height:"2rem" , width:"2rem"}} onClick={() => {
                            setrate2(true)
                            setrate1(true)
                            setrate(2)
                        }} />)}

{(rate3) ? (<FontAwesomeIcon icon={faStar} style={{color:"blue",height:"2rem" , width:"2rem"}} onClick={() => {
                            setrate5(false)
                            setrate4(false)
                            setrate(3)
                            
                        }} />) : (<FontAwesomeIcon icon={faStar} style={{color:"red",height:"2rem" , width:"2rem"}} onClick={() => {
                            setrate3(true)
                            setrate(3)
                            
                            setrate2(true)
                            setrate1(true)
                        }} />)}

{(rate4) ? (<FontAwesomeIcon icon={faStar} style={{color:"blue",height:"2rem" , width:"2rem"}} onClick={() => {
                            setrate5(false)
                            setrate(4)
                           
                        }} />) : (<FontAwesomeIcon icon={faStar} style={{color:"red",height:"2rem" , width:"2rem"}} onClick={() => {
                            setrate4(true)
                            setrate3(true)
                            setrate2(true)
                            setrate1(true)
                            setrate(4)
                        }} />)}

{(rate5) ? (<FontAwesomeIcon icon={faStar} style={{color:"blue",height:"2rem" , width:"2rem"}} />) : (<FontAwesomeIcon icon={faStar} style={{color:"red",height:"2rem" , width:"2rem"}} onClick={() => {
                            setrate5(true)
                            setrate4(true)
                            setrate3(true)
                            setrate2(true)
                            setrate1(true)
                            setrate(5)
                        }} />)}
                        </div>
                        <p style={{fontWeight:"600",marginTop:"0.5rem"}}>Please share your opinion about this PG</p>
                        <textarea className='inp-reveiw' placeholder='Your Review' cols="30" rows="10" onChange={(e) => {
                            setaddreview(e.target.value)

                        }}></textarea>

                        <button className='btn-sendFeedback' onClick={() => {
                            alert(rate)
                            alert(addreview)
                            const body = {
                                propertyId:propid,
                                rating : rate
                            }
                            axios.post("https://pgbackend.adityachoudhury.com/api/property/rating/add", body, config)
                            .then((res) => {
                                if (res.status === 200) {
                                    
                                    alert("done")
                                    if(addreview !== ""){
                                    const body1 = {
                                
                                        review : addreview
                                    }
                                    axios.post(`https://pgbackend.adityachoudhury.com/api/property/review/add/${propid}`, body1, config)
                                    .then((res) => {
                                        if (res.status === 200) {
                                            
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
                                }
                                else{
                                    alert("not added review")
                                }
                                    // toast("DONE")
                                    // navigate("/")
                                }
                                else
                                    alert("error")
                            }).catch((err) => {
                                //   toast("already exist")
                                alert("exist")
                            })
                            

                            
                        }}>Send Feedback</button>
                   
                    </div>
                    <div className="wrap-get-rate">
                    {getreview?.map((item, index) => {
                    
                    return (
                        <div className="username-rate">
                            <div>
                    <FontAwesomeIcon icon={faUser} className='user-icon-rate-get' />
                    </div>
                    <div>
                    <div style={{display:"flex" , flexDirection:"column", gap:"0.1rem" , marginTop:"-0.2rem"}}>
                        <p style={{fontWeight:"700"}}>{item.userid.name}</p>
                        <div style={{marginTop:"-0.5rem"}}>
                            {item.rating.rating}
                            
                        <FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        <FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        <FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        <FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        <FontAwesomeIcon icon={faStar} style={{color:"blue",height:"1rem" , width:"1rem"}} />
                        
                        </div>
                    </div>
                    <p style={{width:"40rem"}}>{item.review}</p>

                    </div>
                    </div> 
                    );
                })}

                    
                    </div>

                    
                </div>
            </div>

        </>
    )
}

export default More_Info_basic

