import React, { useState } from "react";
import gif from "./Day and Night.gif"
import "./Signup.css"
import axios from "axios";
import { useNavigate } from "react-router";
import NavLogin from "../Login/NavLogin"


const accessToken = localStorage.getItem("token");
console.log(accessToken)
const config = {
    headers:{
        Authorization: `Bearer ${accessToken}`
    }
}

const Signup = () => {
    const[name,setname]=useState("");
    const[username,setusername]=useState("");
    const[pass,setpass]=useState("");
    const[email,setemail]=useState("");
    const[num,setnum]=useState("");
    const navigate = useNavigate();
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
        var pwd_expression = /^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-])/;
    var letters = /^[a-zA-Z][a-zA-Z ]*$/;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var mobnum = /(0|91)?[6-9][0-9]{9}/;
        if(name==="" || email==="" || username === "" || pass === "" || num === ""){
            alert("Please fill all the fields")
        }
        else if(name==="")
        {
            alert('Please enter your Name');
        }
        else if(!letters.test(name))
        {
            alert('Name field required only alphabet characters');
        }


        else if(email==="")
        {
            alert('Please enter your email id');
        }
        else if (!filter.test(email))
        {
            alert('Invalid email');
        }
        else if(pass==="")
    {
        alert('Please enter Password');
    }
    else if(pass.length < 8){
    alert("length should be minimum of 8 charaters")
}

else if(num==="")
{
    alert('Please enter your Number');
}
else if(!mobnum.test(num))
{
    alert('Mobile number must be of 10 characters');
}

else if(username==="")
{
    alert('Please enter your Username');
}
else if(username.length < 4 || username.length > 20 )
{
    alert('Username must be of minimum of 4 character and max of 20 characters');
}
else{
        const signup = {
          name:name,
          email:email,
          username:username,
          password:pass,
          mobile:num,
        }
        axios.post("https://pgbackend.adityachoudhury.com/api/auth/signup", signup , config)
          .then((res) => {
            if (res.status === 201) {
            //   localStorage.setItem("token", res.data.token)
            //   toast("DONE")
            alert("DONE")
               navigate("/login")
            }
            else
              console.log("error")
          }).catch((err) => {
            // toast("already exist")

            alert("ERROR")
          })
        }
      };





    return (<>

        {/* <h1 className="head">SIGNUP</h1> */}
      

        <NavLogin/>
        <div className="overall">
            <div style={{width:"90%"}}>
            <img src={gif} style={{width:"100%" , height:"100%"}}></img>
            </div>

            <form style={{marginTop:"6rem"}} onSubmit={handlesub}>
                {/* <h2 style={{ fontSize: "larger",marginLeft:"11rem" }}><b><u>SignUP Today!</u></b></h2> */}
                <div className="form-signup">
                <input type="text" className="inp_txt" placeholder="Enter First Name and Last Name" value={name} onChange={handlename}></input>
                <input type="text" className="inp_txt" placeholder="Enter Username" value={username} onChange={handleuser}></input>
                <input type="text" className="inp_txt" placeholder="Enter Password" value={pass} onChange={handlepass}></input>
                <input type="text" className="inp_txt" placeholder="Enter Email" value={email} onChange={handlemail}></input>
                <input type="text" className="inp_txt" placeholder="Enter Phone Number" value={num} onChange={handlenum}></input>
            
                <div><button type="submit" className="sub">Create</button></div>
                <p style={{marginTop:"1rem"}}>Already have an account? Please <span style={{color:"blue",cursor:"pointer"}} onClick={() => {
                    navigate('/login')
                }}>LogIn </span></p>
                </div>

            </form>
        </div>




    </>)
}
export default Signup;