import React, { useState } from 'react';
import {Box,Button,TextField,Typography} from "@mui/material";
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Register = () => {
             const [adminname,setAdminname]=useState("");
             const [email,setEmail]= useState("");
             const [password,setPassword]= useState("");
             const [success,setSuccess] = useState(false);

             const navigate = useNavigate();



             const handlesubmit = async()=>{
                await axios.post("http://localhost:3000/register",{
                  adminname,
                  email,
                  password

                }).then((res)=>{
                   if(res.data.message){
                    setSuccess(true)
                    setTimeout(()=>{
                      navigate("/")
                    },3000)
                    
                   }

                })


              
              
             }


  return (
    <div>
       <Box sx={{backgroundColor:"white",width:"500px",height:"500px",borderRadius:"30px"}}>
            <Typography sx={{color:"black",fontSize:"2em"}}>ADMIN REGISTRATION</Typography>
            <div style={{display:"flex",flexDirection:"column",gap:"50px", justifyContent:"center", width:"350px", marginLeft:"75px",marginTop:"50px" }}>
            <TextField
              name="adminname"
              value={adminname}
              required
              id="outlined-required"
              label="Adminname"
              placeholder='enter adminname'
              onChange={(e)=>setAdminname(e.target.value)}
        />
        <TextField
              name="email"
              value= {email}
              required
              id="outlined-required"
              label="Email"
              placeholder='enter your email'
              onChange={(e)=>setEmail(e.target.value)}
        />

          <TextField
              name="password"
              value={password}
              required
              id="outlined-required"
              label="Password"
              placeholder='enter your password'
              onChange={(e)=>setPassword(e.target.value)}
        />

            </div>
           <button onClick={handlesubmit} style={{marginTop:"10px"}}>Signup</button>
           <div style={{display:"flex",flexDirection:"row",justifyContent:"center", marginTop:"10px",gap:"10px"}}>
           <Typography sx={{color:"black"}}>Once you have registered please--</Typography>
           <a style={{marginLeft:"5px",}} href='/'>Login</a>

           </div>

           {success?(
            <Typography sx={{color:"green"}}>Successfully registered, you will be redirect to login page</Typography>

           ):(null)}
          
        
            


        </Box>
      
    </div>
  )
}

export default Register
