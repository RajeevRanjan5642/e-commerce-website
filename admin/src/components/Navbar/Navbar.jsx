import React from "react";
import './Navbar.css'
import navlogo from './../../assets/nav-logo.svg'
import profile_icon from './../../assets/profile_icon.png'

const Navbar = () => {
    return ( 
        <div className="navbar">
            <img src={navlogo} alt="" className="nav-logo" />
            <img src={profile_icon} alt="" className="nav-profile"/>
        </div> 
    );
}
 
export default Navbar;