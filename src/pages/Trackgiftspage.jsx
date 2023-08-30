import React from "react";
import { useEffect } from "react";
import { useState } from "react";
// import Link from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
// import * as React from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import {Button} from "@mui/material";
import { TextField } from "@mui/material";
// useNavigategate
import { Chart } from "react-google-charts";
import { useNavigate } from "react-router-dom";

const pages = ["Home", "TrackGIFTS"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
// import { Navigate } from 'react-router-dom';

function Trackgiftspage() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const[trackgifts,setTrackgifts]=useState([]);
  const [nameofperson, setNameofperson] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [trackingidv, setTrackingidv] = useState("");
  const [giftname2, setGiftname2] = useState("");
  const [towhom2, setTowhom2] = useState("");
  const [price2, setPrice2] = useState("");

  const navigate = useNavigate();
  //table
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [createData("mobile", "bikrant", "01230140219402")];
  //table
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handlenameofperson = (e) => {
    setNameofperson(e.target.value);
  };
  const handlephoneno = (e) => {
    setPhoneno(e.target.value);
  };
  const handletrackingid = (e) => {
    setTrackingidv(e.target.value);
  };
  const handlegiftname2 = (e) => {
    setGiftname2(e.target.value);
  };
  const handletowhom2 = (e) => {
    setTowhom2(e.target.value);
  };
  const handleprice2 = (e) => {
    setPrice2(e.target.value);
  };
  const handleClose2=()=>{
    setOpen2(false);
  }
  const handleopen=()=>{
    setOpen2(true);
  }
  const handleaddtrackgift=async(e)=>{
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
      body: JSON.stringify({
        nameofgift: giftname2,
        // description: description,
        price: price2,
        towhom: towhom2,
        // link: link,
      }),
    };
    const response = await fetch(
      "http://localhost:3001/addtrackgift",
      requestOptions
    );
    const res = await response.json();
    if(res){
        getalltrackgifts();
        setOpen2(false);
    }
  }

  const handlesendsms= async(e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
      body: JSON.stringify({
        nameofperson: nameofperson,
        trackingid: trackingidv,
        phoneno: phoneno,
      }),
    };
    const response = await fetch(
      "http://localhost:3001/sendsms",
      requestOptions
    );
    const res = await response.json();
    if(res){
        // getalltrackgifts();
        setOpen(false);
    }
    // setOpen(false);
  };
  const handlelogout = () => {
    localStorage.removeItem("token");
    console.log(localStorage["token"]);
    navigate("/");
    console.log("logout");
  };
  const getalltrackgifts=async()=>{
    if(!localStorage['token']){
      navigate('/');
      return;
    }
    const requestOptions = {
      // method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };
    console.log("helo");
    const response = await axios.get(
      "http://localhost:3001/getalltrackgift",
      requestOptions
    );
    const obtgifts = await response.data;
    console.log("obtgifts", obtgifts);
    if (obtgifts.error) {
      navigate("/");
      return;
    }
    setTrackgifts(obtgifts);
  }
  const handledelete = async (key) => {
    // e.preventDefault();
    console.log("hello");
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
      // body: JSON.stringify({nameofgift:name,description:description,price: price }),
    };
    const response = await fetch(
      `http://localhost:3001/deletetrackgift/${key}`,
      requestOptions
    );
    getalltrackgifts();
  };
  useEffect(() => {
    if (!localStorage["token"]) {
      navigate("/");
    }
    getalltrackgifts();
  }, []);

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 400,
                // letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              GIFTCO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {/* {pages.map((page) => ( */}
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">TrackGIFTS</Typography>
                </MenuItem>
                {/* ))} */}
              </Menu>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              GIFTCO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {/* {pages.map((page) => ( */}
              <Link to="/Home" style={{ textDecoration: "none" }}>
                <Button
                  // key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  Home
                </Button>
              </Link>
              <Link to="/trackgifts" style={{ textDecoration: "none" }}>
                <Button
                  // key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  TrackGifts
                </Button>
              </Link>
              {/* ))} */}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Button variant="contained">
                    Logout
                  </Button>

                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}   
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={handlelogout}>
                    Logout
                  </Typography>
                </MenuItem>
                {/* ))} */}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="right"
                sx={{
                  width: "250px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                GiftName
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  width: "250px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Towhom
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  width: "250px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}  
              >
                Price
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  width: "250px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Action
              </TableCell>
              {/* <TableCell align="right"></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {trackgifts.map((trackgift,index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ textAlign: "center" }}
                >
                  {trackgift.nameofgift}
                </TableCell>
                <TableCell align="right" sx={{ textAlign: "center" }}>
                  {trackgift.towhom}
                </TableCell>
                <TableCell align="right" sx={{ textAlign: "center" }}>
                  RS{trackgift.price}
                </TableCell>
                <TableCell align="right" sx={{ textAlign: "center" }}>
                  <Button variant="contained" onClick={handleClickOpen}>
                    Send SMS
                  </Button>
                  <Button variant="contained" onClick={()=>handledelete(trackgift._id)} sx={{backgroundColor:"red"}}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
       <Button variant="contained" onClick={handleopen}>Add More</Button>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send Message</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name of person"
            type="text"
            fullWidth
            variant="standard"
            onChange={handlenameofperson}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Phone Number with code"
            type="number"
            fullWidth
            variant="standard"
            onChange={handlephoneno}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tracking Id"
            type="number"
            fullWidth
            variant="standard"
            onChange={handletrackingid}
            required
          />
        </DialogContent>
        <DialogActions>
          <form onSubmit={handlesendsms}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Send</Button>
          </form>
        </DialogActions>
      </Dialog>
      <Dialog open={open2} onClose={handleClose2}>
        <DialogTitle>Add track gift</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name of gift"
            type="text"
            fullWidth
            variant="standard"
            onChange={handlegiftname2}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="towhom"
            type="text"
            fullWidth
            variant="standard"
            onChange={handletowhom2}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="price"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleprice2}
            required
          />
        </DialogContent>
        <DialogActions>
          <form onSubmit={handleaddtrackgift}>
            <Button onClick={handleClose2}>Cancel</Button>
            <Button type="submit">Send</Button>
          </form>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Trackgiftspage;
