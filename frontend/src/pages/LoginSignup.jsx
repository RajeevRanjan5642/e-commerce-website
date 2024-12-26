import React,{useState} from "react";
import {toast} from "react-toastify";
import './CSS/LoginSignup.css'

const LoginSignup = () => {

    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
    });
    
    const backend_url = process.env.REACT_APP_API_URL;
    const login = async () =>{
        const response = await fetch(`${backend_url}/api/users/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData),
        });
        const json = await response.json();
        if(response.ok){
            localStorage.setItem("token", json.token);
            toast.success("You're logged in.");
            window.location.replace("/");
        }
        else{
            toast.error(json.error);
        }
    }

    const signup = async () =>{
        const response = await fetch(`${backend_url}/api/users/signup`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData),
        });
        const json = await response.json();
        if(response.ok){
            localStorage.setItem('token',json.token);
            toast.success("Account created.")
            window.location.replace("/");
        }
        else{
            toast.error(json.error);
        }
    }

    const changeHandler = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    return (
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state==='Sign Up'?<input name="name" value={formData.name} onChange={changeHandler} type="text" placeholder="Your Name"/>:<></>}
                    <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
                    <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password"/>
                </div>
                <button onClick={()=>{state==='Login'?login():signup()}}>{state}</button>
                {state==='Sign Up'?
                <p className="loginsignup-login">
                    Already have an account? <span onClick={()=>{setState("Login")}}>Login</span>
                </p>:
                <p className="loginsignup-login">
                    Create an account? <span onClick={()=>{setState("Sign Up")}}>Click Here</span><br></br>
                </p>}
            </div>
     );
}
 
export default LoginSignup;