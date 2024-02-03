import React, { useState } from "react";
import gif from "./Day and Night.gif"
import "./Signup.css"
import axios from "axios";
const Signup = () => {
    const[name,setname]=useState("");
    const[username,setusername]=useState("");
    const[pass,setpass]=useState("");
    const[email,setemail]=useState("");
    const[num,setnum]=useState("");
    
    const handlename=(e)=>{
        setname(e.target.value);
    }
    const handlenum=(e)=>{
        setnum(e.target.value);
    }

    const handlepass=(e)=>{
        setpass(e.target.value);
    }

    const handlemail=(e)=>{
        setemail(e.target.value);
    }

    const handleuser=(e)=>{
        setusername(e.target.value);
    }

    const handlesub = (e) => {
        e.preventDefault();
        const signup = {
          name:name,
          email:email,
          username:username,
          password:pass,
          mobile:num,
        }
        axios.post("https://pgbackend.adityachoudhury.com/api/auth/signup", signup)
          .then((res) => {
            if (res.status === 201) {
              localStorage.setItem("token", res.data.token)
            //   toast("DONE")
            alert("DONE")
            //   navigate("/")
            }
            else
              console.log("error")
          }).catch((err) => {
            // toast("already exist")

            alert("ERROR")
          })
      };





    return (<>

        {/* <h1 className="head">SIGNUP</h1> */}
      


        <div className="overall">
            <img src={gif}></img>


            <form style={{marginTop:"6rem"}} onSubmit={handlesub}>
                <h2 style={{ fontSize: "larger",marginLeft:"11rem" }}><b><u>SignUP Today!</u></b></h2>

                <input type="text" className="inp_txt" placeholder="Name" value={name} onChange={handlename}></input>
                <input type="text" className="inp_txt" placeholder="Username" value={username} onChange={handleuser}></input>
                <input type="text" className="inp_txt" placeholder="Password" value={pass} onChange={handlepass}></input>
                <input type="text" className="inp_txt" placeholder="Email" value={email} onChange={handlemail}></input>
                <input type="text" className="inp_txt" placeholder="Phone Number" value={num} onChange={handlenum}></input>
            
                <div style={{display:"flex",marginLeft:"12rem"}}><button type="submit" className="sub">Submit</button></div>

            </form>
        </div>




    </>)
}
export default Signup;