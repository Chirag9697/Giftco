import React, { useEffect } from "react";
import { useState } from "react";

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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import {Button} from "@mui/material";
import { TextField } from "@mui/material";

import { Chart } from "react-google-charts";

const pages = ["Home", "TrackGIFTS"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Homepage() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [finalbudget, setFinalBudget] = useState(1000);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const[name,setName]=useState("");
  const[description,setDescription]=useState("");
  const[price,setPrice]=useState(0);
  const[towhom,setTowhom]=useState("");
  const[link,setLink]=useState("");
  const [gifts, setGifts] = useState([]);
  const[expenses,setExpenses]=useState([["expenses","costs"],["mobile","1000"]]);
  const[giftdesc,setGiftdesc]=useState({id:"",name:"",description:"",price:0});
  var budget = 1000;
  var newexpenses;
  // const expenses=["expenses","costs"]
  
  const data1=expenses;

  console.log("data1",data1);
  const data2 = [
    ["Budget", "Total"],
    ["Budget", finalbudget],
  ];
  const getallgifts = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ name: name, username: email, password: password }),
    };
    console.log("helo");
    const response = await fetch(
      "http://localhost:3001/getallgift",
      requestOptions
    );
    const obtgifts = await response.json();
    // console.log(obtgifts);
    newexpenses=[["expenses","cost"]];
    obtgifts.map((gift)=>{
      newexpenses.push([`${gift.nameofgift}`,gift.price]);
    })
    console.log("expenses",expenses);
    // updateexpenses();
    setGifts(obtgifts);
    setExpenses(newexpenses);
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
  const handleCloseAndAddGift=async(e)=>{
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({nameofgift:name,description:description,price: price }),
    };
    const response = await fetch(
      "http://localhost:3001/addgift",
      requestOptions
    );
    const res=await response.json();
    // console.log(response);
    if(res.success){
        setOpen(false);
        getallgifts();
    }
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleaddnewgifts=(e)=>{
    e.preventDefault();
    setOpen(true);
  }
  const handleName=(e)=>{
    setName(e.target.value);
  }
  const handledescription=(e)=>{
    setDescription(e.target.value);
  }
  const handlePrice=(e)=>{
    setPrice(e.target.value);
  }
  const handletowhom=(e)=>{
    setTowhom(e.target.value);
  }
  const handlelink=(e)=>{
    setLink(e.target.value);
  }
  const handledelete=async(key)=>
  {
    // e.preventDefault();
    console.log("hello");
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({nameofgift:name,description:description,price: price }),
    };
    const response = await fetch(
      `http://localhost:3001/deletegift/${key}`,
      requestOptions
    );
    getallgifts();
  }
  const handleupdate=async(key)=>{
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({nameofgift:name,description:description,price: price }),
    };
    const response=await fetch(`http://localhost:3001/getonegift/${key}`,requestOptions);
    const gift=await response.json();
    console.log(gift);
    const newgiftdesc={id:key,name:gift.nameofgift,price:gift.price,description:gift.description};
    setGiftdesc(newgiftdesc);
    setOpen2(true);
  }
  const handleCloseAndAddGift2=async(e)=>{
    e.preventDefault();
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({nameofgift:name,description:description,price: price }),
    };
    const response = await fetch( 
      `http://localhost:3001/updategift/${giftdesc.id}`,
      requestOptions
    );
    const res=await response.json();
    // console.log(response);
    if(res.success){
        setOpen2(false);
        getallgifts();
    }
  }

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
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
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
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          my: "20px",
        }}
      >
        {gifts.map((gift) => {
          return (
            <Card key={gift._id}
              sx={{
                minWidth: 500,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom:"10px"
              }}
            >
              <CardContent>
                <Typography sx={{ fontSize: 25 }} color="black" gutterBottom>
                  {gift.nameofgift}
                </Typography>
                <Typography variant="h5" component="div">
                  {gift.towhom}
                </Typography>
                <Typography variant="body2">{gift.description}</Typography>
              </CardContent>
              <CardActions>
                {/* <form onSubmit={handledelete(gift._id)}> */}
                  <Button  onClick={()=>handledelete(gift._id)} variant="contained" color="error" type="submit" >
                    DELETE
                  </Button>
                {/* </form> */}
                {/* <form> */}
                  <Button variant="contained" color="success" onClick={()=>handleupdate(gift._id)}>
                    Update
                  </Button>
                {/* </form> */}
              </CardActions>
            </Card>
          );
        })}
      </Container>
      
      <Container>
        <form style={{ display: "flex", justifyContent: "center" }} onSubmit={handleaddnewgifts}>
          <Button variant="contained" type="submit" sx={{ fontWeight: "500px" }}>
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
            type="number"
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
            type="number"
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
            <Button onClick={handleClose2}>Cancel</Button>
            <Button type="submit">Update Gift</Button>
        </DialogActions>
          </form>
      </Dialog>
    </>
  );
}
