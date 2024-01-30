import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import image from "../Image/1669125652900.jpg"
import AOS from 'aos';
import "aos/dist/aos.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../App.css"

const accessToken = localStorage.getItem("token");
let config = {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
};

const Wrapcard_prev = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataeach, setDataeach] = useState([]);
  const navigate = useNavigate();
  const [interesteddataeach, setinterestedDataeach] = useState([]);

  useEffect(() => {
    axios.get("https://pgbackend.adityachoudhury.com/api/property/get/userProperties", config)
      .then((res) => {
        if (res.status === 200) {
            console.log(res)
          setDataeach(res.data); // Update the state with fetched data
        //   toast("Data Fetched Successfully");
        } else {
          toast.error("Error Fetching Data");
        }
      })
      .catch((err) => {
        toast.error("Error Fetching Data");
      });
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
};
const [userid , setuserid] = useState("");
const [lenOfInterested , setlenOfInterested] = useState(0);
const [stName , setstName] = useState("");
const [stGender , setstGender] = useState("");
const [stCollegeName , setstCollegeName] = useState("");
const [stCurrYear , setstCurrYear] = useState("");
const [stEmail , setstEmail] = useState("");
const [stContact , setstContact] = useState("");

  useEffect(() => {
    if(userid === ""){
      
    }
    else{
    axios.get(`https://pgbackend.adityachoudhury.com/api/property/get/interested/${userid}`, config)
      .then((res) => {
        if (res.status === 200) {
            
            console.log(res.data)
            console.log(res.data.length)
            setlenOfInterested(res.data.length)
            setinterestedDataeach(res.data)
            if(res.data.length != 0){
            openModal()
            }
            else{
              toast("No Interested Candidates Found")
            }
          
        } else {
          toast.error("Error Fetching Data");
        }
      })
      .catch((err) => {
        toast.error("Error Fetching Data");
      });
    }
  }, [userid]);

  
  const openModal = () => {
        setIsModalOpen(true);
        
};

  return (
    <>
    {isModalOpen && (
                <div className="modal-interested ">
                    <div className="modal-content">
                        <h1 style={{marginBottom:"10px"}}><u>Interested Candidates ({lenOfInterested})</u></h1>
                        <div style={{display:"flex" , flexDirection:"row"}}>
                        {(lenOfInterested == 0) ? (<div className="int-left">
                          <p className='each-int-cand'> OOPS ! No Data Found</p>
                          
                        </div>) : (<div className="int-left">
                          {interesteddataeach.map((item, index) => (
                          <p className='each-int-cand' key={item._id} onClick={() => {
                            setstName(item?.name)
                            setstGender(item?.gender)
                            setstCollegeName(item?.collegeName)
                            setstCurrYear(item?.currentYear)
                            setstEmail(item?.email)
                            setstContact(item?.contact)

                          }}>{item?.name}</p>
                          ))}
                        </div>)}
                        <div className="int-right">
                        <div className="stname" style={{width:"90%"}}>
                            <p style={{color:"#8A8A8A"}}>Students Name</p>
                            <p>{stName}</p>
                          </div>

                          <div className="stname"  style={{width:"90%"}}>
                            <p style={{color:"#8A8A8A"}}>Student's Contact Details</p>
                            <p>{stContact}</p>
                          </div>

                          <div className="stname"  style={{width:"90%"}}>
                            <p style={{color:"#8A8A8A"}}>Student's E-mail</p>
                            <p>{stEmail}</p>
                          </div>

                          <div className="stname"  style={{width:"90%"}}>
                            <p style={{color:"#8A8A8A"}}>Student's College Name</p>
                            <p>{stCollegeName}</p>
                          </div>
                          
                          <div style={{display:"flex",flexDirection:"row" ,gap:"2rem", justifyContent:"space-around"}}>
                          <div className="stname">
                            <p style={{color:"#8A8A8A"}}>Student Gender</p>
                            <p>{stGender}</p>
                          </div>
                          <div className="styear">
                            <p style={{color:"#8A8A8A"}}>Student Current Year</p>
                            <p>{stCurrYear}</p>
                          </div>
                          </div>
                        </div>
                        </div>
                        <button 
                        onClick={closeModal} 
                        className="Apply2" style={{marginTop:"20px",marginBottom:"-25px" , background:"red" , height:"2rem"}}>Close</button>
                    </div>
                </div>
            )}
    <div data-aos="fade-in">
      <div className='wrap-all'>
        {dataeach.map((item, index) => (
          <div style={{ height: "286px", width: "300px", border: "2px solid black", margin: "1rem", borderRadius: "19px" }} key={item._id}>
            {/* IMAGE DIV */}
            <div style={{ borderRadius: "20px" }}>
              <img src={image} style={{ width: "100%", height: "150px", borderRadius: "19px", padding: "5px" }} alt="property" />
            </div>
            {/* INFO DIV */}
            <div style={{ margin: "1px", padding: "7px", fontSize: "14.5px" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h3>Rent: ₹{item?.rent}</h3>
              </div>
              <h3>Nearest College: {item?.nerbyColleges[0]?.collegeName}</h3>
              <h3>Rooms Available: {item?.rooms}</h3>
              <h3>Within: {item?.nearbyCollegesDistances[0]} KM</h3>
              <h1 className="more" style={{ marginLeft: "11.9rem", marginTop: "-1.5rem", cursor: "pointer" }} onClick={() => navigate("/More_Info", { state: { name: item._id , fromUser: "true" }, })}>
                More Info ➡️
              </h1>
              
            </div>
            <button style={{marginTop:"6.9px",backgroundColor:"#e7eaf6",width: "292px",borderRadius: "12px",marginLeft:"2.5px",height:"24px" }} onClick={() => {
              alert("fghjk")
              setstName("")
              setstGender("")
            setstCollegeName("")
setstCurrYear("")
setstEmail("")
setstContact("")
              setuserid(item._id)

              // openModal()
            }}>Interested Students</button>
          </div>
        ))}
        
      </div>
    </div>
    </>
    
  );
}

export default Wrapcard_prev;
