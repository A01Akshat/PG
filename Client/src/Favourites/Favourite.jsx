import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image from '../Image/1669125652900.jpg';

const accessToken = localStorage.getItem('token');

const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};

const Favourite = () => {
  const [data, setData] = useState([]); // Update the initial state to an array
  const [favorites, setFavorites] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const url = `https://pgbackend.adityachoudhury.com/api/property/get/favourite`;
    axios
      .get(url, config)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setData(res.data); 
        } else {
          console.log('error');
        }
      })
      .catch((err) => {
        alert('ERROR');
      });
  }, []);

  const togglefav = (itemId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [itemId]: !prevFavorites[itemId],
    }));

    const f = `https://pgbackend.adityachoudhury.com/api/property/favourite/add/${itemId}`;
    axios
      .post(f, {}, config)
      .then((res) => {
        if (res.status === 201) {
          console.log('DONE');
          toast('DONE');
        } else {
          console.log('error');
        }
      })
      .catch((err) => {
        toast('already exist');
      });
  };

  return (
    <div data-aos={'fade-in'}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto auto',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {data.map((item, index) => {
        return(
          <div
            style={{
              height: '260px',
              width: '300px',
              border: '2px solid black',
              margin: '1rem',
              borderRadius: '19px',
            }}
            key={item.propertyId._id}
          >
            {/* IMAGE DIV */}
            <div style={{ borderRadius: '20px' }}>
              <img
                src={image}
                style={{
                  width: '100%',
                  height: '150px',
                  borderRadius: '19px',
                  padding: '5px',
                }}
              />
            </div>

            {/* INFO DIV */}
            <div style={{ margin: '1px', padding: '7px', fontSize: '14.5px' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <h3>Rent:₹{item.propertyId.rent}</h3>
                <button
                  style={{ marginLeft: '11.5rem' }}
                  onClick={() => {
                    togglefav(item.propertyId._id);
                  }}
                >
                  {favorites[item.propertyId._id] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      width="20"
                      viewBox="0 0 512 512"
                    >
                      {/* ... */}
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      width="20"
                      viewBox="0 0 512 512"
                    >
                      {/* ... */}
                    </svg>
                  )}
                </button>
              </div>
              <h3 style={{color:"black"}}>Nearest College: {item.propertyId.nerbyColleges[0]?.collegeName}</h3>
              <h3>Rooms Available: {item.propertyId.rooms}</h3>
              <h3>Within: {item.propertyId.nearbyCollegesDistances[0]} KM</h3>
              <h1
                style={{
                  marginLeft: '11.9rem',
                  marginTop: '-1.5rem',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  navigate('/More_Info', { state: { name: item.propertyId._id } });
                }}
              >
                More Info ➡️
              </h1>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
};

export default Favourite;
