import React,{useState} from "react";
import './CSS/LoginSignup.css'

const LoginSignup = () => {

    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
    })

    const login = async () =>{
        const response = await fetch('http://localhost:4000/api/users/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData),
        });
        const json = await response.json();
        if(response.ok){
            localStorage.setItem('auth-token',json.token);
            window.location.replace("/");
        }
        else{
            alert(json.error);
        }  
    }

    const signup = async () =>{
        const response = await fetch('http://localhost:4000/api/users/signup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData),
        });
        const json = await response.json();
        if(response.ok){
            localStorage.setItem('auth-token',json.token);
            window.location.replace("/");
        }
        else{
            alert(json.error);
        }
    }

    const changeHandler = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    return ( 
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state==='Sign Up'?<input name="name" value={formData.name} onChange={changeHandler} type="text" placeholder="Your Name"/>:<></>}
                    <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
                    <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password"/>
                </div>
                <button onClick={()=>{state==='Login'?login():signup()}}>Continue</button>
                {state==='Sign Up'?
                <p className="loginsignup-login">
                    Already have an account? <span onClick={()=>{setState("Login")}}>Login</span>
                </p>:
                <p className="loginsignup-login">
                    Create an account? <span onClick={()=>{setState("Sign Up")}}>Sign Up</span>
                </p>}
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id=''/>
                    <p>By continuing, I agree to the terms of use & privacy.</p>
                </div>
            </div>
        </div>
     );
}
 
export default LoginSignup;