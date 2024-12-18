import React, { useContext,useState,useEffect } from 'react';
import './Login.css';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {StoreContext} from "./../../context/StoreContext";


const Login = ()=>{
    const navigate = useNavigate();
    const {admin,setAdmin,token,setToken}=useContext(StoreContext);
    const backend_url = process.env.REACT_APP_API_URL;
    const [formData,setFormData]=useState({
        email:"",
        password:"",
    });
    const onChangeHandler = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };
    const onLogin = async (e)=>{
        e.preventDefault();
        const response = await fetch(`${backend_url}/api/users/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData),
        });
        const json = await response.json();
        if(response.ok){
            if(json.role==='admin'){
                setToken(response.formData.token);
                setAdmin(true);
                localStorage.setItem("token", json.token);
                localStorage.setItem("admin", true);
                toast.success("You're logged in.");
                window.location.replace("/addproduct");
            }
            else{
                toast.error("Invalid Credentials");
            }
        }
        else{
            toast.error(json.error);
        }
    };
    useEffect(()=>{
        if(admin && token){
           navigate("/addproduct");
        }
    },[]);
    return(
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <h2 className="login-popup-title">Login</h2>
                <div className="login-popup-inputs">
                <input
                    name="email"
                    onChange={onChangeHandler}
                    value={formData.email}
                    type="email"
                    placeholder="Your email"
                    required
                />
                <input
                    name="password"
                    onChange={onChangeHandler}
                    value={formData.password}
                    type="password"
                    placeholder="Your password"
                    required
                />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;