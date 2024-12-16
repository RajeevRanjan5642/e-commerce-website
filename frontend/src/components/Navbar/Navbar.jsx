import React,{useContext, useRef, useState} from 'react';
import './Navbar.css'
import logo from '../../assets/logo.png'
import cart_icon from '../../assets/cart_icon.png'
import {Link, useNavigate} from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import hamburger from './../../assets/hamburger.png'
import profile_icon from './../../assets/profile_icon.png'

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(StoreContext);
    const menuRef = useRef();

    const hamburger_toggle = (e) =>{
        menuRef.current.classList.toggle('nav-menu-visible');
    }

    const logout=()=>{
        localStorage.removeItem('token');
        window.location.replace('/');
    }

    const navigate = useNavigate();

    return ( 
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>FashionFrenzy</p>
            </div>
            <img className="nav-hamburger" onClick={hamburger_toggle} src={hamburger} alt="" />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={()=>setMenu("home")}><Link style={{textDecoration: 'none'}} to="/" className={menu==="home"?"active":""}>Home</Link></li>
                <li onClick={()=>setMenu("men")}><Link style={{textDecoration: 'none'}} to="/men" className={menu==="men"?"active":""}>Men</Link></li>
                <li onClick={()=>setMenu("women")}><Link style={{textDecoration: 'none'}} to="/women" className={menu==="women"?"active":""}>Women</Link></li>
                <li onClick={()=>setMenu("kids")}><Link style={{textDecoration: 'none'}} to="/kids"className={menu==="kids"?"active":""}>Kids</Link></li>
            </ul>
            <div className="nav-login-cart">
                {!localStorage.getItem('token')?<Link to="/login"><button>Login</button></Link>:
                <div className='navbar-profile'>
                    <img src={profile_icon} alt="" />
                    <ul className="nav-profile-dropdown">
                       <li onClick={()=>navigate("/myorders")}>Orders</li>
                       <hr />
                       <li onClick={logout}>Logout</li>
                    </ul>
                </div>}
                <Link to="/cart"><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
     );
}

export default Navbar;