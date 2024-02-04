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

const accessToken = localStorage.getItem('token');

const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};


const More_Info = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const [data, setData] = useState({});
    const [name , setname] = useState("");
    const [phone , setphone] = useState("");
    const [email , setemail] = useState("");
    const [gender , setgender] = useState("");
    const [year , setyear] = useState("");
    const [coll , setcoll] = useState("");
    const [basic , setbasic] = useState(true);
    const [ratings , setratings] = useState(false);
    const [bookNow , setbookNow] = useState(false);
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
    const navigate = useNavigate()
    return (
        <>
        {/* <Navbar/> */}
        <div className='hero-div'>
        <Navbar/>
        <div className="wrap-post"style={{marginTop:"5rem"}} >
            {(basic) ? (<div className="prop-box-more">
            <p style={{background:"#FF7C00"}}>Basic Information</p>
            </div>) : (<div className="prop-box-more" onClick={() => {
                setbasic(true)
                setbookNow(false)
                setratings(false)
            }}>
            <p>Basic Information</p>
            </div>) }

            {(bookNow) ? (<div className="prop-box3-more">
            <p style={{background:"#FF7C00"}}>Book Now</p>
            </div>) : (<div className="prop-box3-more" onClick={() => {
                setbookNow(true)
                setbasic(false)
                setratings(false)
            }}>
            <p>Book Now</p>
            </div>) }


            {(ratings) ? (<div className="prop-box2-more">
            <p style={{background:"#FF7C00"}}>Ratings & Reviews</p>
            </div>) : (<div className="prop-box2-more" onClick={() => {
                setratings(true)
                setbookNow(false)
                setbasic(false)
            }}>
            <p>Ratings & Reviews</p>
            </div>) }


            
          </div>
        

        </div>
        
        
        
                    </>
    );
};

export default More_Info;
