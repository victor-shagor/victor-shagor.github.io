import React,{useState} from "react";
import Navbar from "./Navbar";
import { SignDiv, Nav } from "./styled-components";
import { useHistory} from 'react-router-dom'

const Signup = () => {
    let history = useHistory()
    const [first_name, setFirstname] = useState('')
    const [last_name, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState()
    const [error, setError] = useState()
    
    const handleSubmit = (e:any) =>{
        e.preventDefault()
        localStorage.clear();
        const data = {
            first_name,
            last_name,
            email,
            password
        }
        try{
            fetch('https://bus-connect.herokuapp.com/api/v1/auth/signup',
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(response => response.json())
                .then(res => {
                    console.log(res)
                    if(res.message){
                        setError('')
                    setMessage(res.message)
                    setFirstname('')
                    setLastname('')
                    setEmail('')
                    setPassword('')
                    }
                    if(res.error){
                        setMessage('')
                        setError(res.error)
                    }
                })
            }
            catch(err){
                console.log(err)
            }

    }
  return (
    <>
      <Nav>
        <Navbar />
      </Nav>
      <SignDiv>
        <div className="card">
            <p style={message ? {display: "block", color: '#00bfa6', paddingLeft: "20px", paddingRight:"20px"} : {display:'none'}}>{message}</p>
            <p style={error ? {display: "block", color: 'red', paddingLeft: "20px", paddingRight:"20px"} : {display:'none'}}>{error}</p>
            <h3>Signup</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="firstname">First Name</label>
            <br></br>
            <input required value={first_name} onChange={(e)=> setFirstname(e.target.value)} className="fir" type="text" id="firstname" /> <br></br>
            <label htmlFor="lastname">Last Name</label>
            <br></br>
            <input required value={last_name} onChange={(e)=> setLastname(e.target.value)} className="fir" type="text" id="lastname" />
            <br></br>
            <label htmlFor="email">Email</label>
            <br></br>
            <input required value={email} onChange={(e)=> setEmail(e.target.value)} className="fir" type="email" id="email" /> <br></br>
            <label htmlFor="password">Password</label>
            <br></br>
            <input pattern=".{5,20}" required title="password as to be atleast five characters" value={password} onChange={(e)=> setPassword(e.target.value)} className="fir" type="password" id="password" /> 
            <br></br>
            <input className="button" type="submit" value="Signup" />
          </form>
        </div>
      </SignDiv>
    </>
  );
};

export default Signup;
