import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Link from "@mui/material";

import { FormControl, collapseClasses } from "@mui/material";

import { InputLabel } from "@mui/material";
import { Container } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { Card } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
// import Navbar from "../components/Navbar";
import Navbar from "../components/Navbar";
function Login() {
  const navigate=useNavigate();
  const[email,setEmail]=useState('');
  const[alert,setAlert]=useState(false); 
  const[password,setPassword]=useState('');
  const handleformsubmit=async(e)=>{
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password: password }),
    };
    const response = await fetch(
      "http://localhost:3001/login",
      requestOptions
    );
    const res = await response.json();
    if (!res.token) {
      console.log("failed to login");
      return;
    }
    navigate('/Home');
    console.log("I am login");
  }
  const handleemail=(e)=>{  
    setEmail(e.target.value);
  }
  const handlepassword=(e)=>{
    setPassword(e.target.value);
  }
  return (
    // <>
    // <Card >
    // <div >
    <>
      <Navbar />
      <Card
        sx={{
          width: "25vw",
          marginTop: "20vh",
          marginLeft: "35vw",
          boxShadow: "10",
        }}
        variant="outlined"
      >
        <CardContent>
            <form onSubmit={handleformsubmit} >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              // display:"flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
              <Typography
                align={"center"}
                sx={{ fontWeight: "bold" }}
              >
                LOGIN
              </Typography>
              {/* <FormControl */}
                {/* sx={{ width: "200px", marginBottom: "13px", marginTop: "11px" }} */}
              {/* > */}
                <TextField
                  id="filled-email-input"
                  label="Email"
                  type="email"
                  variant="standard"
                  onChange={handleemail}
                />
              {/* </FormControl> */}
              {/* <FormControl sx={{ width: "200px", marginBottom: "13px" }}> */}
                <TextField
                  id="filled-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                  sx={{marginTop:"20px"}}
                  onChange={handlepassword}
                />
                {/* <Input id="my-input" aria-describedby="my-helper-text" /> */}
              {/* </FormControl> */}
              <Button type="submit"
                variant="contained"
                sx={{ width: "200px", marginBottom: "13px", marginTop:"25px"}}
              >
                Login
              </Button>
          </Container>
            </form>
          {/* // </div> */}
        </CardContent>
      </Card>
    </>
  );
} 

export default Login;
