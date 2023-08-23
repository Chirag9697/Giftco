import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <>
       <AppBar component="nav" sx={{marginBottom:"20px"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: 'none' }}}
          >
         
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            GIFTCO
          </Typography>
          <Link to='/register'>
            <Button variant="contained" sx={{marginRight:'10px'}} >REGISTER</Button>
          </Link>
          <Link to='/login'>
            <Button variant="contained">LOGIN</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  )
}
