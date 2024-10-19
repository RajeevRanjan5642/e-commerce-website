import React, { useState } from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
    const [email, setEmail] = useState('');
    const changeHandler = (e)=>{
        setEmail(e.target.value);
    };
    const submitHandler = async()=>{
        const response = await fetch("http://localhost:4000/api/subscribers",{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({email}),
        })
        const json = await response.json();
        if(response.ok){
            alert('Subscribed successfully');
            setEmail('');
        }
        else {
            alert(json.error);
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