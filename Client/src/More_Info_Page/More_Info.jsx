import React, { useState, useEffect } from 'react';
import image from '../Image/1669125652900.jpg';
import line from '../Image/line.png';
import '../App.css';
import { useLocation, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import { toast } from 'react-toastify';
import axios from 'axios';
import Navbar from "../Navbar/Navbar";
import More_Info_basic from './More_Info_basic';
import RateReview from "./RateReview";

const accessToken = localStorage.getItem('token');

const config = {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
};


const More_Info = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [data, setData] = useState({});
    const [name, setname] = useState("");
    const [phone, setphone] = useState("");
    const [email, setemail] = useState("");
    const [gender, setgender] = useState("");
    const [year, setyear] = useState("");
    const [coll, setcoll] = useState("");
    const [basic, setbasic] = useState(true);
    const [ratings, setratings] = useState(false);
    const [bookNow, setbookNow] = useState(false);
    const location = useLocation();
    const s = location.state?.name;
    const book = location.state?.fromUser;
    const [isbasic, setcompisBasic] = useState(true);
    const [male, setmale] = useState(false);
    const [female, setfemale] = useState(false);
    const [rate,setrate]=useState(false);


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
    const navigate = useNavigate()

    const handlebooknow = () => {
        setcompisBasic(false);
        openModal();
        setrate(false)
    }
    const handlebasic = () => {
        setcompisBasic(true);
        closeModal();
        setrate(false)
    }
    const handlerate = () => {
        setcompisBasic(false);
        closeModal();
        setrate(true);
    }





    return (
        <>
            {/* <Navbar/> */}
            <div className='hero-div'>
                <Navbar />
                <div className="wrap-post" style={{ marginTop: "5rem" }} >
                    {(basic) ? (<div className="prop-box-more">
                        <p style={{ background: "#FF7C00" }}>Basic Information</p>
                    </div>) : (<div className="prop-box-more" onClick={() => {
                        setbasic(true)
                        setbookNow(false)
                        setratings(false)
                        handlebasic();
                    }}>
                        <p>Basic Information</p>
                    </div>)}

                    {(bookNow) ? (<div className="prop-box3-more">
                        <p style={{ background: "#FF7C00" }}>Book Now</p>
                    </div>) : (<div className="prop-box3-more" onClick={() => {
                        setbookNow(true)
                        setbasic(false)
                        setratings(false)
                        handlebooknow()
                    }}>
                        <p>Book Now</p>
                    </div>)}


                    {(ratings) ? (<div className="prop-box2-more">
                        <p style={{ background: "#FF7C00" }}>Ratings & Reviews</p>
                    </div>) : (<div className="prop-box2-more" onClick={() => {
                        setratings(true)
                        setbookNow(false)
                        setbasic(false)
                        handlerate()
                    }}>
                        <p>Ratings & Reviews</p>
                    </div>)}



                </div>
                {isbasic && <More_Info_basic />}
                {rate && <RateReview/>}





                {isModalOpen && (
                    <div className="modal" style={{marginTop:"4rem"}}>
                        <div className="modal-content">
                            <h1 style={{ marginBottom: "10px" }}><u>Share you details:</u></h1>
                            <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
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
                                <h2 className="input2" style={{ color: "grey", fontSize: "14px", width: "79%" }}>Select your Gender</h2>
                                <div style={{ display: "flex", flexDirection: "row", gap: "1rem", flexWrap: "wrap", marginLeft:"1.3rem" }}>
                                    {(male) ? (<button className="each-amenities" style={{ background: "rgba(32, 178, 171, 0.411)", width: "8rem" }} onClick={() => {
                                        setmale(false)
                                    }} >Male</button>) : (<button className="each-amenities" style={{ width: "8rem" }} onClick={() => {
                                        setmale(true)

                                        setfemale(false)

                                    }} >Male</button>)}


                                    {(female) ? (<button className="each-amenities" style={{ background: "rgba(32, 178, 171, 0.411)", width: "8rem" }} onClick={() => {
                                        setfemale(false)
                                    }} >Female</button>) : (<button className="each-amenities" style={{ width: "8rem" }} onClick={() => {

                                        setfemale(true)
                                        setmale(false)

                                    }} >Female</button>)}
                                    </div>
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
                                    axios.post("https://pgbackend.adityachoudhury.com/api/property/interested", body, config)
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



                    </div>



        </>
            );
};

            export default More_Info;


