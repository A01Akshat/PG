// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { useNavigate } from 'react-router';
// import image from "../Image/1669125652900.jpg"
// import AOS from 'aos';
// import "aos/dist/aos.css";
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import "../App.css"

// const accessToken = localStorage.getItem("token");
// let config = {

//     headers: {
//         'Authorization': `Bearer ${accessToken}`
//     }
// };


// const Wrapcard_prev = () => {
    
// //   console.log(props.check)
    
    
//     const [fill, setfill] = useState(true);
//     const [dataeach, setDataeach] = useState([]);
//     const [favorites, setFavorites] = useState({});
    
//     // useEffect(() => {
//     //     setsearch(props.check)
//     //     console.log(search)
//     // },[search])
    
//     const navigate = useNavigate();
  
   
   
   
     

//     //const url = `https://pgbackend.adityachoudhury.com/api/property/get/dashboard`;
    
//     useEffect(() => {
//         // console.log(props.check)
       
//         axios.get("https://pgbackend.adityachoudhury.com/api/property/get/userProperties", config)
//         .then((res) => {
//           if (res.status === 200) {
//             alert("done")
//             console.log(res)
//             // toast("DONE")
//             // navigate("/")
//           }
//           else
//             alert("error")
//         }).catch((err) => {
//           //   toast("already exist")
//           alert("exist")
//         })
//     },[]);


  

//     return (
//         <div data-aos={"fade-in"} >
//             <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", alignItems: "center", justifyContent: "center" }}>



//                 {dataeach?.map((item, index) => {
                    
//                     return (
//                         <div style={{ height: "260px", width: "300px", border: "2px solid black", margin: "1rem", borderRadius: "19px" }} key={item._id}>
//                             {/* IMAGE DIV */}
//                             <div style={{ borderRadius: "20px" }}>
//                                 <img src={image} style={{ width: "100%", height: "150px", borderRadius: "19px", padding: "5px" }} />
//                             </div>

//                             {/* INFO DIV */}
//                             <div style={{ margin: "1px", padding: "7px", fontSize: "14.5px" }}>
//                                 <div style={{ display: "flex", flexDirection: "row" }}>
//                                     <h3>Rent:₹{item?.rent}</h3>
                                  
//                                 </div>
//                                 <h3 >Nearest College: {item?.nerbyColleges[0]?.collegeName}</h3>
//                                 <h3 >Rooms Available: {item?.rooms}</h3>
//                                 <h3>Within: {item?.nearbyCollegesDistances[0]} KM</h3>
//                                 <h1 className="more" style={{ marginLeft: "11.9rem", marginTop: "-1.5rem", cursor: "pointer" }} onClick={() => {
//                                     navigate("/More_Info", { state: { name: item._id } });
//                                 }}>More Info ➡️</h1>
//                             </div>
//                         </div>
//                     );
//                 })}







//             </div>

//         </div>
//     )
// }

// export default Wrapcard_prev;

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
  const [dataeach, setDataeach] = useState([]);
  const navigate = useNavigate();

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

  return (
    <div data-aos="fade-in">
      <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", alignItems: "center", justifyContent: "center" }}>
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
              <h1 className="more" style={{ marginLeft: "11.9rem", marginTop: "-1.5rem", cursor: "pointer" }} onClick={() => navigate("/More_Info", { state: { name: item._id } })}>
                More Info ➡️
              </h1>
              
            </div>
            <button style={{marginTop:"6.5px",backgroundColor:"cyan",width: "295px",borderRadius: "15px" }}>Interested Students</button>
          </div>
        ))}
        
      </div>
    </div>
  );
}

export default Wrapcard_prev;
