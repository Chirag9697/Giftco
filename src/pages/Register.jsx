import React from "react";
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
            <FormControl sx={{ width: "200px", marginBottom: "13px" }}>
              <TextField
                id="filled-password-input"
                label="Name"
                type="text"
                autoComplete="current-password"
                variant="standard"
              />
              {/* <Input id="my-input" aria-describedby="my-helper-text" /> */}
            </FormControl>
            <FormControl
              sx={{ width: "200px", marginBottom: "13px", marginTop: "0px" }}
            >
              <TextField
                id="filled-email-input"
                label="Email"
                type="email"
                variant="standard"
              />
            </FormControl>
            <FormControl sx={{ width: "200px", marginBottom: "13px" }}>
              <TextField
                id="filled-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
              />
              {/* <Input id="my-input" aria-describedby="my-helper-text" /> */}
            </FormControl>
            
            <Button
              variant="contained"
              sx={{ width: "200px", marginBottom: "1px", marginTop: "10px" }}
            >
              Register
            </Button>
          </Container>
          {/* // </div> */}
        </CardContent>
      </Card>
    </>
  );
}
