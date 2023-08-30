import React, { useEffect } from "react";
import { useState } from "react";
// import Link from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";


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
import Alert from '@mui/material/Alert';
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
import { Navigate, useNavigate } from "react-router-dom";
// useNavigategate
import { Chart } from "react-google-charts";

const pages = ["Home", "TrackGIFTS"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Homepage() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [finalbudget, setFinalBudget] = useState(1000);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [towhom, setTowhom] = useState("");
  const [link, setLink] = useState("");
  const [gifts, setGifts] = useState([]);
  const [totalexpense,setTotalexpense]=useState(0);
  const[loss,setLoss]=useState(false);
  const [expenses, setExpenses] = useState([
    ["expenses", "costs"],
    ["mobile", "1000"],
  ]);
  const [giftdesc, setGiftdesc] = useState({
    id: "",
    name: "",
    description: "",
    price: 0,
  });
  const tok =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZ…U4OX0.eLeZ_nGGGvYnOd5P-Os14i6htkyX-7RHk5i4iSNv-rE";
  const navigate = useNavigate();
  var budget = 1000;
  var newexpenses;
  // const expenses=["expenses","costs"]

  const data1 = expenses;

  console.log("data1", data1);
  const data2 = [
    ["Budget", "Total"],
    ["Budget", finalbudget],
  ];
  const getallgifts = async () => {
    if(!localStorage['token']){
      navigate('/');
      return ;
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
      "http://localhost:3001/getallgift",
      requestOptions
    );
    const obtgifts = await response.data;
    console.log("obtgifts", obtgifts);
    if (obtgifts.error) {
      navigate("/");
      return;
    }
    // console.log(obtgifts);\
    var newtotalexpense=0;
    for(var i=0;i<obtgifts.length;i++){
      newtotalexpense=newtotalexpense+obtgifts[i].price;
    }
    newexpenses = [["expenses", "cost"]];
    obtgifts.map((gift) => {
      newexpenses.push([`${gift.nameofgift}`, gift.price]);
    });
    console.log("expenses", expenses);
    // updateexpenses();
    setGifts(obtgifts);
    setExpenses(newexpenses);
    if(newtotalexpense>finalbudget){
      setLoss(true);
    }
    else{
      setLoss(false);
    }
    setTotalexpense(newtotalexpense)
  };
  // const updateexpenses=()=>{
  // }
  const options = {
    title: "My GIFTS",
  };
  const options2 = {
    title: "My Budget",
  };
  const budgetchange = (e) => {
    budget = e.target.value;
  };

  const handlebudgetsubmit = (e) => {
    e.preventDefault();
    if(budget<totalexpense){
      setLoss(true);
    }
    else{
      setLoss(false);
    }
    setFinalBudget(budget);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpen2 = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleCloseAndAddGift = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
      body: JSON.stringify({
        nameofgift: name,
        description: description,
        price: price,
        towhom: towhom,
        link: link,
      }),
    };
    const response = await fetch(
      "http://localhost:3001/addgift",
      requestOptions
    );
    const res = await response.json();
    console.log(res);
    // console.log(response);
    if (res.success) {
      setOpen(false);
      getallgifts();
    }
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleaddnewgifts = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handledescription = (e) => {
    setDescription(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const handletowhom = (e) => {
    setTowhom(e.target.value);
  };
  const handlelogout=()=>{
    localStorage.removeItem('token');
    console.log(localStorage['token']);
    navigate('/')
    console.log('logout');
  }
  const handlelink = (e) => {
    setLink(e.target.value);
  };
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
      `http://localhost:3001/deletegift/${key}`,
      requestOptions
    );
    getallgifts();
  };
  const handleupdate = async (key) => {
    console.log(key);
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
      // body: JSON.stringify({nameofgift:name,description:description,price: price }),
    };
    const response = await fetch(
      `http://localhost:3001/getonegift/${key}`,
      requestOptions
    );
    const gift = await response.json();
    console.log(gift);
    const newgiftdesc = {
      id: key,
      name: gift.nameofgift,
      price: gift.price,
      description: gift.description,
      towhom: gift.towhom,
      link: gift.link,
    };
    setGiftdesc(newgiftdesc);
    setOpen2(true);
  };
  const handleCloseAndAddGift2 = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
      body: JSON.stringify({
        nameofgift: name,
        description: description,
        price: price,
        towhom: towhom,
        link: link,
      }),
    };
    const response = await fetch(
      `http://localhost:3001/updategift/${giftdesc.id}`,
      requestOptions
    );
    const res = await response.json();
    // console.log(response);
    if (res.success) {
      setOpen2(false);
      getallgifts();
    }
  };

  useEffect(() => {
    getallgifts();
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
                <Link to='/Home' style={{textDecoration:"none"}}>
                <Button
                  // key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" ,textDecoration:"none"}}
                  >
                  Home
                </Button>
                  </Link>
                  <Link to='/trackgifts' style={{textDecoration:"none"}}>
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
                  {/* <Avatar sx={{ bgcolor: "blue",width:"100px" }}>Giftco</Avatar> */}
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
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          height: "30%",
        }}
      >
        <form
          onSubmit={handlebudgetsubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: "70%" }}
            onChange={budgetchange}
          />
          <Button
            variant="contained"
            color="success"
            sx={{ marginTop: "10px", width: "70%" }}
            type="submit"
          >
            Set Budget
          </Button>
        </form>
      </Container>
      <Container
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Chart
          chartType="PieChart"
          data={data1}
          options={options}
          loader={<div>Loading Chart</div>}
          width={"500px"}
          height={"300px"}
          //   backgroundColot={"blue"    }
          //   marginLeft={"50px"}
        />
        <Chart
          chartType="PieChart"
          data={data2}
          options={options2}
          loader={<div>Loading Chart</div>}
          width={"500px"}
          height={"300px"}
        />
      </Container>
      <Typography
        sx={{ fontSize: 50, textAlign: "center" }}
        color="Black"
        // gutterBottom
      >
        ALL your Gifts
      </Typography>
      <Container>
        
      {
        loss && <Alert severity="warning">Over expenses- you are falling short by Rs {totalexpense-finalbudget}</Alert>
      }
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          my: "20px",
        }}
      >
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
                Link
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
            {gifts.map((gift,index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ textAlign: "center" }}
                >
                  {gift.nameofgift}
                </TableCell>
                <TableCell align="right" sx={{ textAlign: "center" }}>
                  {gift.towhom}
                </TableCell>
                <TableCell align="right" sx={{ textAlign: "center" }}>
                  RS {gift.price}
                </TableCell>
                <TableCell align="right" sx={{ textAlign: "center" }}>
                <a href={gift.link}>LINK</a>
                </TableCell>
                <TableCell align="right" sx={{ textAlign: "center" }}>
                  <Button variant="contained" onClick={()=>handleupdate(gift._id)}>
                    Update
                  </Button>
                  <Button variant="contained" onClick={()=>handledelete(gift._id)} sx={{backgroundColor:"red"}}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      </Container>

      <Container>
        <form
          style={{ display: "flex", justifyContent: "center" }}
          onSubmit={handleaddnewgifts}
        >
          <Button
            variant="contained"
            type="submit"
            sx={{ fontWeight: "500px",marginBottom:"20px" }}
          >
            AddnewGifts
          </Button>
        </form>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new Gift</DialogTitle>
        <form onSubmit={handleCloseAndAddGift}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name of Gift"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleName}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="desc"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              onChange={handledescription}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="Price"
              label="price"
              type="number"
              fullWidth
              variant="standard"
              onChange={handlePrice}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="towhom"
              label="To Whom"
              type="text"
              fullWidth
              variant="standard"
              onChange={handletowhom}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="Link"
              label="Link"
              type="url"
              fullWidth
              variant="standard"
              onChange={handlelink}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add Gift</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog open={open2} onClose={handleClose2}>
        <DialogTitle>Update your gift</DialogTitle>
        <form onSubmit={handleCloseAndAddGift2}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name of Gift"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleName}
              defaultValue={giftdesc.name}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="desc"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              onChange={handledescription}
              defaultValue={giftdesc.description}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="Price"
              label="price"
              type="number"
              fullWidth
              variant="standard"
              onChange={handlePrice}
              defaultValue={giftdesc.price}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="towhom"
              label="To Whom"
              type="text"
              fullWidth
              variant="standard"
              onChange={handletowhom}
              defaultValue={giftdesc.towhom}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="Link"
              label="Link"
              type="url"
              fullWidth
              variant="standard"
              onChange={handlelink}
              defaultValue={giftdesc.link}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose2}>Cancel</Button>
            <Button type="submit">Update Gift</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
