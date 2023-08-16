import React from "react";
import { useState } from "react";
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
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log("I am register");
  };
  const handleemail=(e)=>{
    setEmail(e); 
    console.log(email);
  }
  return (
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
