import React from 'react'

const Login_Student = () => {
  return (
    <div className="student w-1/2">
    <h1 className=" text-black text-2xl">Are you a Student?</h1>
    <h3>Grab the best deal to rent a PG!</h3>
    <div className="stud_inputfields">
    <input className="email_stud w-[13rem]" placeholder="E-Mail"></input>
    <input className="email_stud  w-[13rem]" placeholder="Password"></input>
    <button type="submit">Submit</button>
    </div>
</div>
  )
}

export default Login_Student;