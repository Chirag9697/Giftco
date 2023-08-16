import React from 'react'
import { Link } from 'react-router-dom'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from '../pages/Register';
import Login from '../pages/Login';
export default function Reactrouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login/>}> */}
          {/* <Route index element={<Home />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<Register />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  )
}
