import React, { useState, useEffect } from 'react';
import image from '../Image/1669125652900.jpg';
import line from '../Image/line.png';
import '../App.css';
import { useLocation } from 'react-router-dom';
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
        <Navbar/>
        <More_Info_basic />
        
                    </>
    );
};

export default More_Info;
