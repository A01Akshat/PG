import React, { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./Login.css";
const accessToken = localStorage.getItem("access token");
console.log(accessToken)
const config = {
    header:{
        Authorization: `Bearer ${accessToken}`
    }
}

const Login = () => {

  const [owner_email, setowner_email] = useState('');
  const [owner_pass, setpass_email] = useState('');

  const handleChange = (e) => {
    setowner_email(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', owner_email);
    console.log('Pass:', owner_pass);
    const signup = {
      username: owner_email,
      password: owner_pass,
    }
    axios.post("https://pgbackend.adityachoudhury.com/api/auth/login", signup,config)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.token)
          toast("DONE")
        }
        else
          console.log("error")
      }).catch((err) => {
        toast("already exist")
      })
  };

  const handleChangePass = (e) => {
    setpass_email(e.target.value);
  };



  return (
    <>
      <div className="main_div w-1/2">

        <form onSubmit={handleSubmit}>
          <div className="owner">
            <h1 className=" text-black text-2xl flex items-center justify-center">Are you a Owner?</h1>

            <h3>Join us today for the best deal to rent your PG!</h3>
            <input className="email_owner w-[13rem]" placeholder="E-Mail" name="owner_email" id='owner_email'
              value={owner_email} onChange={handleChange} ></input>
            {/* <h1 className="hh">dhsjdsjd</h1> */}
            <input className="email_owner w-[13rem]" placeholder="Password" name="owner_pass" id='owner_pass'
              value={owner_pass} onChange={handleChangePass} ></input>

            <button type="submit">Submit</button>

          </div>
        </form>




      </div>
    </>

  )

}
export default Login;