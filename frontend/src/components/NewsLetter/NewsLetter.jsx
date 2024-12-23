import React, { useState } from 'react'
import './NewsLetter.css'
import {toast} from 'react-toastify'

const NewsLetter = () => {
    const [email, setEmail] = useState('');
    const backend_url = process.env.REACT_APP_API_URL;
    const changeHandler = (e)=>{
        setEmail(e.target.value);
    };
    const submitHandler = async()=>{
        const response = await fetch(`${backend_url}/api/subscribers`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({email}),
        })
        const json = await response.json();
        if(response.ok){
            toast.success('Subscribed successfully');
            setEmail('');
        }
        else {
            toast.error(json.error);
            setEmail('');
        }
    }
    return ( 
        <div className="newsletter">
            <h1>Get Exclusive Offers On Your Email</h1>
            <p>Subscribe to our newsletter and stay updated</p>
            <div>
                    <input value={email} onChange={changeHandler} type="email" placeholder='Your Email id'/>
                    <button onClick={submitHandler}>Subscribe</button>
            </div>
        </div>
     );
}
 
export default NewsLetter;