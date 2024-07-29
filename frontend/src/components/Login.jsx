import React,{useState} from 'react'
import {Box,TextField,Typography} from "@mui/material"
import axios from "axios"
import { Navigate, useNavigate } from 'react-router-dom'

const Login = () => {
 
  
                
       const [email,setEmail]= useState("");
       const [password,setPassword]= useState("");
       const [error,setError] = useState(false)

       const navigate = useNavigate();

       const handlesubmit= async()=>{
        console.log("hello");
        await axios.post("http://localhost:3000/login",{
          email,
          password

        }).then((res)=>{
          if(res.data.token){
            localStorage.setItem('token', res.data.token);
            navigate("/home")
          }else if(res.data.message==="Invalid email or password"){
            setError(true)

          }
        })


       }

  return (
    <div>
        <Box sx={{backgroundColor:"white",width:"500px",height:"500px",borderRadius:"30px"}}>
            <Typography sx={{color:"black",fontSize:"2em"}}>ADMIN LOGIN</Typography>
            <div style={{display:"flex",flexDirection:"column",gap:"50px", justifyContent:"center", width:"350px", marginLeft:"75px",marginTop:"50px" }}>
            <TextField
              required
              name= "email"
              value={email}
              id="outlined-required"
              label="Email"
              onChange={(e)=>setEmail(e.target.value)}
              placeholder='enter your email'
        />

          <TextField
              required
              name="password"
              value={password}
              id="outlined-required"
              label="Password"
              onChange={(e)=>setPassword(e.target.value)}
              placeholder='enter your password'
        />

            </div>
           <button onClick={handlesubmit} style={{marginTop:"50px"}}>Login</button>
           <div style={{display:"flex",flexDirection:"row",justifyContent:"center", marginTop:"10px",gap:"10px"}}>
           <Typography sx={{color:"black"}}>Please setup an account here--</Typography>
           <a style={{marginLeft:"5px",}} href='/register'>Signup</a>

           </div>

           {error?(
            <Typography sx={{color:"red"}}>Invalid email or password, please login again</Typography>

           ):(null)}
          
        
            


        </Box>

      
    </div>
  )
}

export default Login
