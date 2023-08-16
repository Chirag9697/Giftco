import React from "react";
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
  const handleformsubmit=(e)=>{
    e.preventDefault();
    console.log("I am log");
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
