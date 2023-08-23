import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Alert} from '@mui/material';
import Stack from '@mui/material/Stack';
//material ui
//material ui
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
//
import Navbar from "../components/Navbar";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[alert,setAlert]=useState("false");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const handlesubmit = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, username: email, password: password }),
    };
    const response = await fetch(
      "http://localhost:3001/register",
      requestOptions
    );
    const res = await response.json();
    if (!res.success) {
      console.log("failed to register");
      return;
    }
    // setTimeout(() => {
      // }, 2000);
    setAlert("true");
    // setInterval(() => {  
    // }, 1000);
    setTimeout(() => {
      setAlert("false");  
      navigate("/login");
      
    }, 1000);
    console.log("I am register");
  };
  const handleemail = (e) => {
    // );
    setEmail(e.target.value);
  };
  const handlepassword = (e) => {
    setPassword(e.target.value);
  };
  const handlename = (e) => {
    setName(e.target.value);
  };
  return (
    <>
      <Navbar />
      <Container>
          {alert=="true"?<Alert severity="success" sx={{marginTop:"65px"}}>successfully registered</Alert>:<></>}
      </Container>
      <Card
        sx={{
          width: "25vw",
          marginTop: "100px",
          marginLeft: "35vw",
          boxShadow: "10",
        }}
        variant="outlined"
      >
        <CardContent>
          <form onSubmit={handlesubmit}>
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
                sx={{ marginTop: "10px", fontWeight: "bold" }}
              >
                Register
              </Typography>
              <TextField
                id="filled-password-input"
                label="Name"
                type="text"
                autoComplete="current-password"
                variant="standard"
                onChange={handlename}
              />
              <TextField
                id="filled-email-input"
                label="Email"
                type="email"
                variant="standard"
                sx={{ marginTop: "20px" }}
                onChange={handleemail}
              />

              <TextField
                id="filled-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                onChange={handlepassword}
                sx={{ marginTop: "20px" }}
              />

              <Button
                variant="contained"
                sx={{ width: "200px", marginBottom: "1px", marginTop: "30px" }}
                type="submit"
              >
                Register
              </Button>
            </Container>
          </form>
          {/* // </div> */}
        </CardContent>
      </Card>
    </>
  );
}
